import PropTypes from 'prop-types';
import MainLayout from './MainLayout';

const DashboardLayout = ({ children }) => {
  return (
    <MainLayout>
      <div className="min-h-screen w-full p-8 relative overflow-hidden">
        {/* Background elements for depth */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-purple-500/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-blue-500/10 rounded-full blur-3xl"></div>
        </div>
        
        {/* Content */}
        <div className="container mx-auto glass-dark rounded-xl p-8 relative z-10 border border-white/10">
          {children}
        </div>
      </div>
    </MainLayout>
  );
};

DashboardLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DashboardLayout; 