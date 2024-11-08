import { useState, useEffect, useContext } from 'react';
import { supabase } from '../supabaseClient';
import { AuthContext } from './AuthContext';
import JobSelection from './JobSelection';
import AddJobModal from './AddJobModal';
import Experiences from './Experiences';
import { Button } from '@nextui-org/react';


const WorkHistory = () => {
  const { user } = useContext(AuthContext);
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showJobModal, setShowJobModal] = useState(false);

  useEffect(() => {
    if (user) {
      fetchJobs();
    }
  }, [user]);

  const fetchJobs = async () => {
    const { data, error } = await supabase
      .from('res_jobs')
      .select('*')
      .eq('user_id', user.id);

    if (error) {
      console.error('Error fetching jobs:', error.message);
    } else {
      setJobs(data);
    }
  };

  const handleAddJob = async (newJob) => {
    const { data, error } = await supabase
      .from('res_jobs')
      .insert([{ ...newJob, user_id: user.id }])
      .single();

    if (error) {
      console.error('Error adding job:', error.message);
    } else {
      setJobs([...jobs, data]);
      setSelectedJob(data);
      setShowJobModal(false);
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-gray-800 to-gray-900 text-white">
      <h1 className="text-3xl mb-6">Work History</h1>
      <JobSelection jobs={jobs} setShowJobModal={setShowJobModal} setSelectedJob={setSelectedJob} />
      <AddJobModal show={showJobModal} onClose={() => setShowJobModal(false)} onAddJob={handleAddJob} />
      {selectedJob && <Experiences job={selectedJob} />}
    </div>
  );
};

export default WorkHistory;
