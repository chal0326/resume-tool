import React from 'react';
import { Input } from '@nextui-org/react';
import PropTypes from 'prop-types';

const InputField = ({ 
  label, 
  name, 
  value, 
  onChange, 
  type = "text", 
  required = false,
  placeholder,
  className = "" 
}) => {
  return (
    <Input
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      type={type}
      required={required}
      placeholder={placeholder}
      variant="bordered"
      classNames={{
        base: "max-w-full",
        mainWrapper: "max-w-full",
        input: "text-white/90",
        label: "text-white/50",
        inputWrapper: "border-white/20 hover:border-white/40 bg-white/5",
      }}
      className={className}
    />
  );
};

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string,
  required: PropTypes.bool,
  placeholder: PropTypes.string,
  className: PropTypes.string
};

export default InputField; 