//import React from 'react';
import { Button } from '@nextui-org/react';
import PropTypes from 'prop-types';

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
JobSelection.propTypes = {
    jobs: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        job_title: PropTypes.string.isRequired,
        company: PropTypes.string.isRequired,
      })
    ).isRequired,
    setShowJobModal: PropTypes.func.isRequired,
    setSelectedJob: PropTypes.func.isRequired,
  };
  
  JobSelection.defaultProps = {
    jobs: [],
  };
  
export default JobSelection;
