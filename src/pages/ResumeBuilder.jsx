import { useState, useEffect } from 'react';
import { DashboardLayout } from '../components/layout';
import { JobSelection } from '../components/jobs';
import { Experiences } from '../components/experiences';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

const ResumeBuilder = () => {
  const { user } = useAuth();
  const [selectedJob, setSelectedJob] = useState(null);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      const { data, error } = await supabase
        .from('res_jobs')
        .select('*')
        .eq('user_id', user.id)
        .order('end_date', { ascending: false, nullsFirst: true })
        .order('start_date', { ascending: false });

      if (!error) {
        setJobs(data);
      }
    };

    fetchJobs();
  }, [user.id]);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <JobSelection 
          jobs={jobs}
          selectedJob={selectedJob}
          setSelectedJob={setSelectedJob}
          setShowJobModal={() => {}}
        />
        {selectedJob && <Experiences job={selectedJob} />}
      </div>
    </DashboardLayout>
  );
};

export default ResumeBuilder; 