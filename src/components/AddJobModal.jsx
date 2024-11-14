import { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Input, Button } from '@nextui-org/react';

const AddJobModal = ({ show, onClose, onAddJob }) => {
  const initialState = {
    job_title: '',
    company: '',
    start_date: '',
    end_date: '',
    current_job: false
  };

  const [jobData, setJobData] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onAddJob({
        ...jobData,
        end_date: jobData.current_job ? null : jobData.end_date
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
      open={show} 
      onClose={onClose}
      className="bg-gray-800 text-white"
    >
      <Modal.Header>
        <h2 className="text-xl font-semibold">Add New Job</h2>
      </Modal.Header>

      <Modal.Body>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Job Title"
            name="job_title"
            value={jobData.job_title}
            onChange={handleChange}
            required
            fullWidth
          />

          <Input
            label="Company"
            name="company"
            value={jobData.company}
            onChange={handleChange}
            required
            fullWidth
          />

          <Input
            label="Start Date"
            name="start_date"
            type="date"
            value={jobData.start_date}
            onChange={handleChange}
            required
            fullWidth
          />

          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              name="current_job"
              checked={jobData.current_job}
              onChange={handleChange}
              className="mr-2"
            />
            <label>Current Job</label>
          </div>

          {!jobData.current_job && (
            <Input
              label="End Date"
              name="end_date"
              type="date"
              value={jobData.end_date}
              onChange={handleChange}
              fullWidth
            />
          )}
        </form>
      </Modal.Body>

      <Modal.Footer>
        <Button auto flat onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button auto onClick={handleSubmit} disabled={loading}>
          {loading ? 'Adding...' : 'Add Job'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

AddJobModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onAddJob: PropTypes.func.isRequired
};

export default AddJobModal;