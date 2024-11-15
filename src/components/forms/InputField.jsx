import { Input } from '@nextui-org/react';
import PropTypes from 'prop-types';

const InputField = ({ label, name, value, onChange, type = "text", required = false }) => {
  return (
    <div className="mb-4">
      <Input
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        required={required}
        fullWidth
        className="bg-opacity-20 bg-darkGreen placeholder:text-greyGreen text-olive"
      />
    </div>
  );
};

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string,
  required: PropTypes.bool
};

export default InputField; 