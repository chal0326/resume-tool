import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const ParsedResumeView = ({ job }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-800 rounded-lg p-6 mb-6"
    >
      <div className="mb-4">
        <h3 className="text-2xl font-bold text-white">{job.job_title}</h3>
        <p className="text-gray-400">{job.company}</p>
        <p className="text-gray-500">
          {job.start_date} - {job.is_current ? 'Present' : job.end_date}
        </p>
      </div>

      {job.experiences?.map((exp, index) => (
        <motion.div 
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.1 }}
          className="mb-4 bg-gray-700 rounded p-4"
        >
          <p className="text-white mb-2">{exp.experience_text}</p>
          {exp.skills?.map((skill, skillIndex) => (
            <span 
              key={skillIndex}
              className="inline-block bg-blue-500 text-white text-sm px-3 py-1 rounded-full mr-2 mt-2"
            >
              {skill.skill_name}
            </span>
          ))}
        </motion.div>
      ))}

      {/* Achievements Section */}
      {job.achievements?.length > 0 && (
        <div className="mt-6">
          <h4 className="text-xl font-semibold text-white mb-3">Achievements</h4>
          <div className="grid gap-3">
            {job.achievements.map((achievement, index) => (
              <div key={index} className="bg-gray-700 p-3 rounded">
                <p className="text-white">{achievement.achievement_name}</p>
                <p className="text-gray-400 text-sm">{achievement.date_received}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

ParsedResumeView.propTypes = {
  job: PropTypes.shape({
    job_title: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
    start_date: PropTypes.string.isRequired,
    end_date: PropTypes.string,
    is_current: PropTypes.bool,
    experiences: PropTypes.arrayOf(
      PropTypes.shape({
        experience_text: PropTypes.string.isRequired,
        skills: PropTypes.arrayOf(
          PropTypes.shape({
            skill_name: PropTypes.string.isRequired
          })
        )
      })
    ),
    achievements: PropTypes.arrayOf(
      PropTypes.shape({
        achievement_name: PropTypes.string.isRequired,
        date_received: PropTypes.string
      })
    )
  }).isRequired
};

export default ParsedResumeView; 