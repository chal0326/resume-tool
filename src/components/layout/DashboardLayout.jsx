import PropTypes from 'prop-types';

const DashboardLayout = ({ children }) => {
  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-gray-800 to-gray-900">
      <div className="max-w-7xl mx-auto">
        {children}
      </div>
    </div>
  );
};

DashboardLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DashboardLayout; 