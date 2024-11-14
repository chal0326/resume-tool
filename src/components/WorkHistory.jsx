import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import JobSelection from './JobSelection';
import AddJobModal from './AddJobModal';
import Experiences from './Experiences';

const WorkHistory = () => {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showJobModal, setShowJobModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchJobs = async () => {
    try {
      const { data, error: fetchError } = await supabase
        .from('res_jobs')
        .select('*')
        .eq('user_id', user.id)
        .order('start_date', { ascending: false });

      if (fetchError) throw fetchError;
      setJobs(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddJob = async (jobData) => {
    try {
      const { data, error: insertError } = await supabase
        .from('res_jobs')
        .insert([{ ...jobData, user_id: user.id }])
        .single();

      if (insertError) throw insertError;
      setJobs([...jobs, data]);
      setShowJobModal(false);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-gray-800 to-gray-900 text-white">
      <h1 className="text-3xl mb-6">Work History</h1>
      
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

      {selectedJob && <Experiences job={selectedJob} />}
    </div>
  );
};

export default WorkHistory;