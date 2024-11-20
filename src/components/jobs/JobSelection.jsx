import React from 'react';
import PropTypes from 'prop-types';
import { GlassButton, GlassCard } from '../common';

const JobSelection = ({ jobs, selectedJob, setSelectedJob, setShowJobModal }) => {
  return (
    <GlassCard
      title="Work Experience"
      headerAction={
        <GlassButton 
          variant="primary"
          onClick={() => setShowJobModal(true)}
        >
          Add New Job
        </GlassButton>
      }
      className="mb-6"
    >
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
    </GlassCard>
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
