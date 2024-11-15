import { Modal as NextUIModal, Button } from '@nextui-org/react';
import PropTypes from 'prop-types';

const Modal = ({ show, onClose, title, children, onSubmit, submitText = "Submit" }) => {
  return (
    <NextUIModal open={show} onClose={onClose}>
      <NextUIModal.Header>
        <h2 className="text-xl font-semibold">{title}</h2>
      </NextUIModal.Header>
      <NextUIModal.Body>
        {children}
      </NextUIModal.Body>
      <NextUIModal.Footer>
        <Button auto flat onClick={onClose}>Cancel</Button>
        <Button auto onClick={onSubmit}>{submitText}</Button>
      </NextUIModal.Footer>
    </NextUIModal>
  );
};

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitText: PropTypes.string
};

export default Modal; 