import PropTypes from 'prop-types';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@nextui-org/react';

const MainLayout = ({ children }) => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  // Function to determine if a link is active
  const isActive = (path) => {
    return location.pathname === path ? 'nav-link-active' : 'text-white/80 hover:text-white transition-colors';
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="glass-dark border-b border-white/10 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-8">
              {/* Logo/Home Link */}
              <Link 
                to="/dashboard" 
                className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-500 hover:to-purple-500 transition-all"
              >
                ResumeAI
              </Link>

              {/* Navigation Links */}
              <nav className="hidden md:flex items-center space-x-6">
                <Link 
                  to="/dashboard" 
                  className={isActive('/dashboard')}
                >
                  Home
                </Link>
                <Link 
                  to="/work-history" 
                  className={isActive('/work-history')}
                >
                  Work History
                </Link>
                <Link 
                  to="/upload-resume" 
                  className={isActive('/upload-resume')}
                >
                  Upload Resume
                </Link>
              </nav>
            </div>
            
            {/* User Section */}
            <div className="flex items-center space-x-4">
              <div className="hidden sm:block">
                <span className="text-white/70">{user?.email}</span>
              </div>
              <Button
                onClick={handleLogout}
                className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white"
                size="sm"
              >
                Logout
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex overflow-x-auto space-x-4 mt-4 pb-2">
            <Link 
              to="/dashboard" 
              className={`whitespace-nowrap ${isActive('/dashboard')}`}
            >
              Home
            </Link>
            <Link 
              to="/work-history" 
              className={`whitespace-nowrap ${isActive('/work-history')}`}
            >
              Work History
            </Link>
            <Link 
              to="/upload-resume" 
              className={`whitespace-nowrap ${isActive('/upload-resume')}`}
            >
              Upload Resume
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="glass-dark border-t border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-white/60 text-sm">
              © 2024 ResumeAI. All rights reserved.
            </div>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-white/60 hover:text-white text-sm">Privacy Policy</a>
              <a href="#" className="text-white/60 hover:text-white text-sm">Terms of Service</a>
              <a href="#" className="text-white/60 hover:text-white text-sm">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainLayout; 