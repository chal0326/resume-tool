import { Modal as NextUIModal, Button } from '@nextui-org/react';
import PropTypes from 'prop-types';
import { GlassButton } from './GlassButton';

const Modal = ({ show, onClose, title, children, onSubmit, submitText = "Submit" }) => {
  return (
    <NextUIModal 
      isOpen={show} 
      onClose={onClose}
      classNames={{
        base: "bg-gray-900/90 dark:bg-gray-900/90 text-white",
        header: "border-b border-white/10",
        footer: "border-t border-white/10",
        closeButton: "hover:bg-white/5 active:bg-white/10",
      }}
      backdrop="blur"
    >
      <NextUIModal.Header>
        <h2 className="text-xl font-semibold text-white">{title}</h2>
      </NextUIModal.Header>
      <NextUIModal.Body>
        {children}
      </NextUIModal.Body>
      <NextUIModal.Footer>
<<<<<<< HEAD
        <Button
          variant="light" 
          onPress={onClose}
          className="text-white/70 hover:text-white"
        >
          Cancel
        </Button>
        <Button
          color="primary"
          onPress={onSubmit}
          className="bg-gradient-to-tr from-blue-500 to-purple-500"
        >
          {submitText}
        </Button>
=======
        <GlassButton auto flat onClick={onClose}>Cancel</GlassButton>
        <GlassButton auto onClick={onSubmit}>{submitText}</GlassButton>
>>>>>>> 64d2d7766f0d5d06f2d589a2f0cd163f8b740264
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