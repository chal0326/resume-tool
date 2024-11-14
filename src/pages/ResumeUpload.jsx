import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { Button, Textarea } from '@nextui-org/react';

const ResumeUpload = () => {
  const { user } = useAuth();
  const [resumeText, setResumeText] = useState('');
  const [parsing, setParsing] = useState(false);
  const [parsedData, setParsedData] = useState([]);
  const [error, setError] = useState(null);

  const parseResumeText = (text) => {
    const jobEntries = text.match(/(?:Job Title|Position):\s*([^\n]+)/gi) || [];
    const companyEntries = text.match(/(?:Company):\s*([^\n]+)/gi) || [];
    const dateEntries = text.match(/(?:Date|Period):\s*([^\n]+)/gi) || [];

    return jobEntries.map((job, index) => ({
      title: job.replace(/(?:Job Title|Position):\s*/i, '').trim(),
      company: companyEntries[index]
        ? companyEntries[index].replace(/Company:\s*/i, '').trim()
        : 'Unknown Company',
      date: dateEntries[index]
        ? dateEntries[index].replace(/(?:Date|Period):\s*/i, '').trim()
        : ''
    }));
  };

  const handleParseResume = async () => {
    if (!resumeText.trim()) {
      setError('Please enter resume text');
      return;
    }

    setParsing(true);
    setError(null);

    try {
      const parsedJobs = parseResumeText(resumeText);
      setParsedData(parsedJobs);

      // Save to database
      for (const job of parsedJobs) {
        const { error: insertError } = await supabase
          .from('res_jobs')
          .insert([{
            user_id: user.id,
            job_title: job.title,
            company: job.company,
            start_date: new Date().toISOString() // You might want to parse dates from the text
          }]);

        if (insertError) throw insertError;
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setParsing(false);
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-gray-800 to-gray-900">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6">Upload Resume</h1>

        <div className="bg-gray-700 rounded-lg p-6 mb-6">
          <Textarea
            placeholder="Paste your resume text here..."
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            minRows={10}
            fullWidth
            className="mb-4"
          />

          <Button
            color="primary"
            onClick={handleParseResume}
            disabled={parsing || !resumeText.trim()}
          >
            {parsing ? 'Parsing...' : 'Parse Resume'}
          </Button>
        </div>

        {error && (
          <div className="bg-red-500 text-white p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        {parsedData.length > 0 && (
          <div className="bg-gray-700 rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-white mb-4">Parsed Data</h2>
            <div className="space-y-4">
              {parsedData.map((job, index) => (
                <div key={index} className="bg-gray-600 p-4 rounded-lg">
                  <h3 className="font-semibold text-white">{job.title}</h3>
                  <p className="text-gray-300">{job.company}</p>
                  {job.date && <p className="text-gray-400 text-sm">{job.date}</p>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeUpload;