import React from 'react';
import PropTypes from 'prop-types';

const GlassFooter = ({ copyrightText }) => {
  return (
    <footer className="w-full bg-white/20 backdrop-blur-md py-6">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-white/80">{copyrightText || '© 2024 Your Company. All Rights Reserved.'}</p>
      </div>
    </footer>
  );
}

GlassFooter.propTypes = {
  copyrightText: PropTypes.string.isRequired,
};

export default GlassFooter;