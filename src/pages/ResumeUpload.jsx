import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { Button, Textarea } from '@nextui-org/react';
import { parseResumeWithOpenAI } from '../lib/openai';

const ResumeUpload = () => {
  const { user } = useAuth();
  const [resumeText, setResumeText] = useState('');
  const [parsing, setParsing] = useState(false);
  const [parsedData, setParsedData] = useState([]);
  const [error, setError] = useState(null);

  const handleParseResume = async () => {
    if (!resumeText.trim()) {
      setError('Please enter resume text');
      return;
    }
  
    setParsing(true);
    setError(null);
  
    try {
      // Parse the resume using OpenAI
      const parsedData = await parseResumeWithOpenAI(resumeText);
  
      // Extract each category of data
      const { jobs, experiences, achievements, awards, certifications } = parsedData;
  
      // Insert jobs into `res_jobs` table and get job IDs for later use
      for (const job of jobs) {
        const { data: jobData, error: jobError } = await supabase
          .from('res_jobs')
          .insert([{
            user_id: user.id,
            job_title: job.title,
            company: job.company,
            start_date: job.startDate,
            end_date: job.endDate,
          }])
          .select(); // Select returns inserted data including job ID
  
        if (jobError) throw jobError;
        const jobId = jobData[0].id; // Assuming single insertion

        // Insert experiences into `res_experiences` table, linking to job ID
        for (const experience of experiences) {
          const { error: experienceError } = await supabase
            .from('res_experiences')
            .insert([{
              job_id: jobId, // Link experience to the job ID
              experience_text: experience.text
            }]);
          if (experienceError) throw experienceError;
        }
      }

      // Insert achievements into `res_achievements` table
      for (const achievement of achievements) {
        const { error: achievementError } = await supabase
          .from('res_achievements')
          .insert([{
            user_id: user.id,
            achievement_name: achievement.name,
            date_received: achievement.date,
            description: achievement.description,
          }]);
  
        if (achievementError) throw achievementError;
      }
  
      // Insert awards into `res_awards` table
      for (const award of awards) {
        const { error: awardError } = await supabase
          .from('res_awards')
          .insert([{
            user_id: user.id,
            award_name: award.name,
            date_received: award.date,
            description: award.description
          }]);
  
        if (awardError) throw awardError;
      }
  
      // Insert certifications into `res_certifications` table
      for (const certification of certifications) {
        const { error: certError } = await supabase
          .from('res_certifications')
          .insert([{
            user_id: user.id,
            certification_name: certification.name,
            date_received: certification.date,
            description: certification.description,
            issuing_organization: certification.organization,
          }]);
  
        if (certError) throw certError;
      }
  
      setParsedData(parsedData); // Display parsed data if needed
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

        {parsedData.jobs && parsedData.jobs.length > 0 && (
          <div className="bg-gray-700 rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-white mb-4">Parsed Data</h2>
            <div className="space-y-4">
              {parsedData.jobs.map((job, index) => (
                <div key={index} className="bg-gray-600 p-4 rounded-lg">
                  <h3 className="font-semibold text-white">{job.title}</h3>
                  <p className="text-gray-300">{job.company}</p>
                  {job.startDate && job.endDate && (
                    <p className="text-gray-400 text-sm">{job.startDate} - {job.endDate}</p>
                  )}
                  <p className="text-gray-300">{job.description}</p>
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
