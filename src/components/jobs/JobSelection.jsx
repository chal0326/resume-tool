import PropTypes from 'prop-types';
import { Button } from '@nextui-org/react';

const JobSelection = ({ jobs, selectedJob, setSelectedJob, setShowJobModal }) => {
  return (
    <div className="mb-6 glass-dark p-6 rounded-xl border border-white/10 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-30"></div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            Work Experience
          </h2>
          <Button 
            auto 
            onClick={() => setShowJobModal(true)}
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg"
          >
            Add New Job
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job) => (
            <button
              key={job.id}
              onClick={() => setSelectedJob(job)}
              className={`p-4 rounded-lg text-left transition-all glass relative overflow-hidden group
                ${
                  selectedJob?.id === job.id
                    ? 'ring-2 ring-blue-400/50 shadow-lg shadow-blue-500/20'
                    : 'hover:ring-1 hover:ring-purple-400/50 hover:shadow-lg hover:shadow-purple-500/20'
                }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10">
                <h3 className="font-semibold text-lg text-white">{job.job_title}</h3>
                <p className="text-blue-200">{job.company}</p>
                <p className="text-sm text-gray-400">
                  {job.start_date} - {job.end_date || 'Present'}
                </p>
              </div>
            </button>
          ))}
        </div>
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
      end_date: PropTypes.string,
      is_current: PropTypes.bool
    })
  ).isRequired,
  selectedJob: PropTypes.shape({
    id: PropTypes.string.isRequired
  }),
  setSelectedJob: PropTypes.func.isRequired,
  setShowJobModal: PropTypes.func.isRequired
};

export default JobSelection;
