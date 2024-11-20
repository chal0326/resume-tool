import React from 'react';
import PropTypes from 'prop-types';

const GlassButton = ({ 
  children, 
  onClick, 
  className = '', 
  variant = 'default',
  disabled = false,
  type = 'button',
  size = 'md'
}) => {
  const baseStyles = "backdrop-blur-md rounded-lg shadow-md transition-all duration-300";
  
  const variants = {
    default: "bg-white/30 hover:bg-white/50 text-white",
    primary: "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white",
    secondary: "bg-white/20 hover:bg-white/30 text-white",
    danger: "bg-red-500/80 hover:bg-red-600/80 text-white"
  };

  const sizes = {
    sm: "px-3 py-1 text-sm",
    md: "px-6 py-2",
    lg: "px-8 py-3 text-lg"
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
    >
      {children}
    </button>
  );
}

GlassButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['default', 'primary', 'secondary', 'danger']),
  disabled: PropTypes.bool,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  size: PropTypes.oneOf(['sm', 'md', 'lg'])
};

export default GlassButton;