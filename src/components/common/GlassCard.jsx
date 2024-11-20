import PropTypes from 'prop-types';
import React from 'react';

const GlassCard = ({ 
  title, 
  children, 
  className = '', 
  headerAction,
  variant = 'dark'
}) => {
  const variants = {
    dark: 'glass-dark',
    light: 'glass-light'
  };

  return (
    <div className={`rounded-xl p-6 relative overflow-hidden ${variants[variant]} ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-30"></div>
      
      <div className="relative z-10">
        {title && (
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              {title}
            </h2>
            {headerAction && (
              <div className="flex items-center">
                {headerAction}
              </div>
            )}
          </div>
        )}
        {children}
      </div>
    </div>
  );
};

GlassCard.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  headerAction: PropTypes.node,
  variant: PropTypes.oneOf(['dark', 'light'])
};

export default GlassCard;