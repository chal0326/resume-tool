import React from 'react';
import { Button } from '@nextui-org/react';

const JobSelection = ({ jobs, setShowJobModal, setSelectedJob }) => (
  <div className="mb-6">
    <h2 className="text-2xl mb-4">Jobs</h2>
    <div className="flex items-center space-x-4">
      <select
        className="bg-gray-700 p-2 rounded"
        onChange={(e) =>
          setSelectedJob(jobs.find((job) => job.id === e.target.value))
        }
        value={jobs.id || ''}
      >
        <option value="" disabled>
          Select a job
        </option>
        {jobs.map((job) => (
          <option key={job.id} value={job.id}>
            {job.job_title} at {job.company}
          </option>
        ))}
      </select>
      <Button auto onClick={() => setShowJobModal(true)}>
        Add New Job
      </Button>
    </div>
  </div>
);

export default JobSelection;
