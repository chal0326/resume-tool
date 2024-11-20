import { useState, useEffect, useCallback, React } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import JobSelection from '../components/jobs/JobSelection';
import AddJobModal from '../components/jobs/AddJobModal';
import ParsedResumeView from '../components/resume/ParsedResumeView';
import SkillCloud from '../components/skills/SkillCloud';

const WorkHistory = () => {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showJobModal, setShowJobModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchJobs = useCallback(async () => {
    try {
      const { data, error: fetchError } = await supabase
        .from('res_jobs')
        .select('*')
        .eq('user_id', user.id)
        .order('end_date', { ascending: false, nullsFirst: true })
        .order('start_date', { ascending: false });

      if (fetchError) throw fetchError;
      setJobs(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [user.id]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const handleAddJob = async (jobData) => {
    try {
      const dataToSave = {
        ...jobData,
        user_id: user.id,
        end_date: jobData.end_date === 'Present' ? null : jobData.end_date,
        is_current: jobData.is_current
      };

      const { data, error: insertError } = await supabase
        .from('res_jobs')
        .insert([dataToSave])
        .single();

      if (insertError) throw insertError;
      const transformedJob = {
        ...data,
        end_date: data.end_date === null ? 'Present' : data.end_date,
        is_current: data.is_current
      };
      setJobs([...jobs, transformedJob]);
      setShowJobModal(false);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-gray-800 to-gray-900">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6">Work History</h1>
        
        <SkillCloud userId={user.id} />

        <JobSelection 
          jobs={jobs}
          selectedJob={selectedJob}
          setSelectedJob={setSelectedJob}
          setShowJobModal={setShowJobModal}
        />

        <AddJobModal
          show={showJobModal}
          onClose={() => setShowJobModal(false)}
          onAddJob={handleAddJob}
        />

        <div className="mt-8">
          {jobs.map(job => (
            <ParsedResumeView key={job.id} job={job} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkHistory;