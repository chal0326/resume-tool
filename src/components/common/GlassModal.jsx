import React from 'react';
import PropTypes from 'prop-types';

const GlassModal = ({ showModal, onClose, title, children }) => {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center">
      <div className="w-96 bg-white/20 backdrop-blur-lg rounded-lg shadow-lg p-6">
        <h2 className="text-xl text-white font-bold">{title}</h2>
        <div className="text-white/80 mt-2">
          {children}
        </div>
        <button
          onClick={onClose}
          className="mt-4 bg-white/40 text-black px-4 py-2 rounded hover:bg-white/60"
        >
          Close
        </button>
      </div>
    </div>
  );
}

GlassModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default GlassModal;