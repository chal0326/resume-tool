import React from 'react';
import { Modal as NextUIModal, Button } from '@nextui-org/react';
import PropTypes from 'prop-types';

const Modal = ({ show, onClose, title, children, onSubmit, submitText = "Submit" }) => {
  return (
    <NextUIModal 
      isOpen={show} 
      onClose={onClose}
      classNames={{
        base: "bg-white/20 dark:bg-white/20 backdrop-blur-xl border border-white/20",
        header: "border-b border-white/10",
        footer: "border-t border-white/10",
        closeButton: "hover:bg-white/10 active:bg-white/20",
      }}
      backdrop="blur"
    >
      <NextUIModal.Header>
        <h2 className="text-xl font-semibold text-white">{title}</h2>
      </NextUIModal.Header>
      <NextUIModal.Body>
        <div className="text-white/90">
          {children}
        </div>
      </NextUIModal.Body>
      <NextUIModal.Footer>
        <div className="flex gap-2">
          <Button
            variant="light" 
            onPress={onClose}
            className="text-white/70 hover:text-white hover:bg-white/10"
          >
            Cancel
          </Button>
          <Button
            color="primary"
            onPress={onSubmit}
            className="bg-gradient-to-tr from-blue-500 to-purple-500 text-white"
          >
            {submitText}
          </Button>
        </div>
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