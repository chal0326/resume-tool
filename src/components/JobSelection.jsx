import PropTypes from 'prop-types';
import { Button } from '@nextui-org/react';

const JobSelection = ({ jobs, selectedJob, setSelectedJob, setShowJobModal }) => {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">Work Experience</h2>
        <Button auto onClick={() => setShowJobModal(true)}>
          Add New Job
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {jobs.map((job) => (
          <button
            key={job.id}
            onClick={() => setSelectedJob(job)}
            className={`p-4 rounded-lg text-left transition-all ${
              selectedJob?.id === job.id
                ? 'bg-blue-600 shadow-lg ring-2 ring-blue-300'
                : 'bg-gray-700 hover:bg-gray-600 focus:ring-2 focus:ring-gray-500'
            }`}
          >
            <h3 className="font-semibold text-lg">{job.job_title}</h3>
            <p className="text-gray-300">{job.company}</p>
            <p className="text-sm text-gray-400">
              {new Date(job.start_date).toLocaleDateString()} - 
              {job.end_date 
                ? new Date(job.end_date).toLocaleDateString()
                : 'Present'}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};

JobSelection.propTypes = {
  jobs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      job_title: PropTypes.string.isRequired,
      company: PropTypes.string.isRequired,
      start_date: PropTypes.string.isRequired,
      end_date: PropTypes.string
    })
  ).isRequired,
  selectedJob: PropTypes.shape({
    id: PropTypes.string.isRequired
  }),
  setSelectedJob: PropTypes.func.isRequired,
  setShowJobModal: PropTypes.func.isRequired
};

export default JobSelection;
