import { useState } from 'react';
import { Modal, Input, Button } from '@nextui-org/react';
import PropTypes from 'prop-types';

const AddJobModal = ({ show, onClose, onAddJob }) => {
  const [newJob, setNewJob] = useState({
    job_title: '',
    company: '',
    start_date: '',
    end_date: '',
  });

  const handleAdd = () => {
    onAddJob(newJob);
    setNewJob({
      job_title: '',
      company: '',
      start_date: '',
      end_date: '',
    });
  };

  return (
    <Modal closeButton open={show} onClose={onClose}>
      <Modal.Header>
        <h2 className="text-xl">Add New Job</h2>
      </Modal.Header>
      <Modal.Body>
        <Input
          label="Job Title"
          placeholder="Software Engineer"
          fullWidth
          value={newJob.job_title}
          onChange={(e) =>
            setNewJob({ ...newJob, job_title: e.target.value })
          }
        />
        <Input
          label="Company"
          placeholder="TechCorp"
          fullWidth
          value={newJob.company}
          onChange={(e) => setNewJob({ ...newJob, company: e.target.value })}
        />
        <Input
          label="Start Date"
          type="date"
          fullWidth
          value={newJob.start_date}
          onChange={(e) =>
            setNewJob({ ...newJob, start_date: e.target.value })
          }
        />
        <Input
          label="End Date"
          type="date"
          fullWidth
          value={newJob.end_date}
          onChange={(e) =>
            setNewJob({ ...newJob, end_date: e.target.value })
          }
        />
      </Modal.Body>
      <Modal.Footer>
        <Button auto flat onClick={onClose}>
          Cancel
        </Button>
        <Button auto onClick={handleAdd}>
          Add Job
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
AddJobModal.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onAddJob: PropTypes.func.isRequired,
  };
export default AddJobModal;
