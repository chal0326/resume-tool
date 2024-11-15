import { scan } from 'react-scan';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { Button, Textarea } from '@nextui-org/react';
import { parseResumeWithOpenAI } from '../lib/parseResume';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

scan({
  enabled: true,
  log: true,
  clearlLog: false,
});

const ResumeUpload = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [resumeText, setResumeText] = useState('');
  const [parsing, setParsing] = useState(false);
  const [parsedData, setParsedData] = useState({
    jobs: [],
    experiences: [],
    achievements: [],
    awards: [],
    certifications: [],
    transferrable_skills: []
  });
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
      const { jobs, experiences, achievements, awards, certifications, transferrable_skills } = parsedData;
  
      // Insert jobs into `res_jobs` table - field names are already correct!
      for (const job of jobs) {
        const { data: jobData, error: jobError } = await supabase
          .from('res_jobs')
          .insert([{
            user_id: user.id,
            job_title: job.title,      // Ensure OpenAI returns 'title'
            company: job.company,       // Ensure OpenAI returns 'company'
            start_date: job.startDate,  // Ensure OpenAI returns 'startDate'
            end_date: job.endDate,
            is_current: job.isCurrent    // Ensure OpenAI returns 'endDate'
          }])
          .select();
  
        if (jobError) throw jobError;
        const jobId = jobData[0].id;
  
        // Insert experiences into `res_experiences` table - field name matches!
        for (const experience of experiences) {
          const { data: expData, error: experienceError } = await supabase
            .from('res_experiences')
            .insert([{
              job_id: jobId,
              experience_text: experience.text  // Ensure OpenAI returns 'text'
            }])
            .select();
  
          if (experienceError) throw experienceError;
  
          // Insert associated transferable skill
          if (experience.skill) {  // Ensure OpenAI returns a 'skill' property for each experience
            const { error: skillError } = await supabase
              .from('res_transferable_skills')
              .insert([{
                experience_id: expData[0].id,
                skill_name: experience.skill
              }]);
  
            if (skillError) throw skillError;
          }
        }
      }
  
      // Insert achievements - field names match!
      for (const achievement of achievements) {
        const { error: achievementError } = await supabase
          .from('res_achievements')
          .insert([{
            user_id: user.id,
            achievement_name: achievement.name,
            date_received: achievement.date,     
            description: achievement.description
          }]);
  
        if (achievementError) throw achievementError;
      }
  
      // Insert awards - field names match!
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
  
      // Insert certifications - field names match!
      for (const certification of certifications) {
        const { error: certError } = await supabase
          .from('res_certifications')
          .insert([{
            user_id: user.id,
            certification_name: certification.name,
            date_received: certification.date,    // Already in YYYY-MM format from OpenAI
            description: certification.description,
            issuing_organization: certification.organization
          }]);
  
        if (certError) throw certError;
      }
  
      setParsedData({
        jobs,
        experiences,
        achievements,
        awards,
        certifications,
        transferrable_skills
      });
  
      // Show success message and redirect
      toast.success('Resume uploaded successfully! Redirecting to dashboard...');
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (err) {
      setError(err.message);
      toast.error('Error processing resume');
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
                  {parsedData.experiences.map((exp, expIndex) => (
                    <div key={expIndex} className="mt-2">
                      <p className="text-gray-300">{exp.text}</p>
                      {exp.skill && (
                        <p className="text-blue-400 text-sm mt-1">Transferable Skill: {exp.skill}</p>
                      )}
                    </div>
                  ))}
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
