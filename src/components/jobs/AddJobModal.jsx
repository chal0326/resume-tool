import { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Input, Button, Textarea, Checkbox } from '@nextui-org/react';

const AddJobModal = ({ show, onClose, onAddJob }) => {
  const initialState = {
    job_title: '',
    company: '',
    start_date: '',
    end_date: '',
    is_current: false,
    experience: '',
    achievements: '',
    awards: '',
    certifications: ''
  };

  const [jobData, setJobData] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onAddJob({
        ...jobData,
        start_date: jobData.start_date.substring(0, 7),
        end_date: jobData.is_current ? null : 
          jobData.end_date ? jobData.end_date.substring(0, 7) : null,
        achievements: jobData.achievements ? jobData.achievements.split(',') : [],
        awards: jobData.awards ? jobData.awards.split(',') : [],
        certifications: jobData.certifications ? jobData.certifications.split(',') : []
      });
      setJobData(initialState);
      onClose();
    } catch (error) {
      console.error('Error adding job:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setJobData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <Modal 
      show={show} 
      onClose={onClose}
      title="Add New Job"
      onSubmit={handleSubmit}
      submitText={loading ? 'Adding...' : 'Add Job'}
    >
      <form className="space-y-4">
        <Input
          label="Job Title"
          name="job_title"
          value={jobData.job_title}
          onChange={handleChange}
          required
          variant="bordered"
          classNames={{
            input: "text-white/90",
            label: "text-white/50",
            inputWrapper: "border-white/20 hover:border-white/40 bg-white/5"
          }}
        />

        <Input
          label="Company"
          name="company"
          value={jobData.company}
          onChange={handleChange}
          required
          variant="bordered"
          classNames={{
            input: "text-white/90",
            label: "text-white/50",
            inputWrapper: "border-white/20 hover:border-white/40 bg-white/5"
          }}
        />

        <Input
          label="Start Date"
          name="start_date"
          type="month"
          value={jobData.start_date}
          onChange={handleChange}
          required
          variant="bordered"
          classNames={{
            input: "text-white/90",
            label: "text-white/50",
            inputWrapper: "border-white/20 hover:border-white/40 bg-white/5"
          }}
        />

        <Checkbox
          name="is_current"
          isSelected={jobData.is_current}
          onValueChange={(checked) => handleChange({
            target: { name: 'is_current', type: 'checkbox', checked }
          })}
          className="text-white"
        >
          Current Position
        </Checkbox>

        {!jobData.current_job && (
          <Input
            label="End Date"
            name="end_date"
            type="text"
            value={jobData.end_date}
            onChange={handleChange}
            fullWidth
          />
        )}

        <Textarea
          label="experience"
          name="experience"
          value={jobData.experience}
          onChange={handleChange}
          minRows={3}
          fullWidth
        />

        <Textarea
          label="Achievements (comma-separated)"
          name="achievements"
          placeholder="e.g., Exceeded sales goals, Managed a team of 10"
          value={jobData.achievements}
          onChange={handleChange}
          minRows={2}
          fullWidth
        />

        <Textarea
          label="Awards (comma-separated)"
          name="awards"
          placeholder="e.g., Employee of the Month, Top Performer"
          value={jobData.awards}
          onChange={handleChange}
          minRows={2}
          fullWidth
        />

        <Textarea
          label="Certifications (comma-separated)"
          name="certifications"
          placeholder="e.g., PMP, Six Sigma"
          value={jobData.certifications}
          onChange={handleChange}
          minRows={2}
          fullWidth
        />
      </form>
    </Modal>
  );
};

AddJobModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onAddJob: PropTypes.func.isRequired
};

export default AddJobModal;
