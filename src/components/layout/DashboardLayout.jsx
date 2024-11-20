import React from 'react';
import PropTypes from 'prop-types';

const DashboardLayout = ({ children }) => {
  return (
    <div className="min-h-screen w-full p-8 relative overflow-hidden">
     
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>
      
      
      <div className="container mx-auto glass-dark rounded-xl p-8 relative z-10 border border-white/10">
        {children}
      </div>
    </div>
  );
};

DashboardLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DashboardLayout; 