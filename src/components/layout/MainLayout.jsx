import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useNavigate, useLocation, Outlet } from 'react-router-dom';
import { Button, Navbar, NavbarBrand, NavbarContent, NavbarItem, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar } from '@nextui-org/react';

const MainLayout = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar 
        className="glass-dark border-b border-white/10"
        maxWidth="full"
        position="sticky"
      >
        <NavbarBrand>
          <Link 
            to="/dashboard" 
            className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-500 hover:to-purple-500 transition-all"
          >
            ResumeAI
          </Link>
        </NavbarBrand>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem isActive={isActive('/dashboard')}>
            <Link 
              to="/dashboard"
              className={isActive('/dashboard') ? 'nav-link-active' : 'text-white/80 hover:text-white transition-colors'}
            >
              Home
            </Link>
          </NavbarItem>
          <NavbarItem isActive={isActive('/work-history')}>
            <Link 
              to="/work-history"
              className={isActive('/work-history') ? 'nav-link-active' : 'text-white/80 hover:text-white transition-colors'}
            >
              Work History
            </Link>
          </NavbarItem>
          <NavbarItem isActive={isActive('/upload-resume')}>
            <Link 
              to="/upload-resume"
              className={isActive('/upload-resume') ? 'nav-link-active' : 'text-white/80 hover:text-white transition-colors'}
            >
              Upload Resume
            </Link>
          </NavbarItem>
        </NavbarContent>

        <NavbarContent justify="end">
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                as="button"
                className="transition-transform"
                color="secondary"
                name={user?.email?.charAt(0).toUpperCase()}
                size="sm"
              />
            </DropdownTrigger>
            <DropdownMenu 
              aria-label="Profile Actions" 
              variant="flat"
              className="glass-dark"
            >
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">{user?.email}</p>
              </DropdownItem>
              <DropdownItem key="settings">My Settings</DropdownItem>
              <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
              <DropdownItem 
                key="logout" 
                color="danger"
                onClick={handleLogout}
              >
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      </Navbar>

      {/* Mobile Navigation */}
      <div className="sm:hidden flex overflow-x-auto space-x-4 p-4 glass-dark border-b border-white/10">
        <Link 
          to="/dashboard" 
          className={`whitespace-nowrap ${isActive('/dashboard') ? 'nav-link-active' : 'text-white/80'}`}
        >
          Home
        </Link>
        <Link 
          to="/work-history" 
          className={`whitespace-nowrap ${isActive('/work-history') ? 'nav-link-active' : 'text-white/80'}`}
        >
          Work History
        </Link>
        <Link 
          to="/upload-resume" 
          className={`whitespace-nowrap ${isActive('/upload-resume') ? 'nav-link-active' : 'text-white/80'}`}
        >
          Upload Resume
        </Link>
      </div>

      <main className="flex-grow">
        <Outlet />
      </main>

      <footer className="glass-dark border-t border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-white/60 text-sm">
              © 2024 ResumeAI. All rights reserved.
            </div>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Button 
                as="a" 
                href="#" 
                variant="light" 
                size="sm"
                className="text-white/60 hover:text-white"
              >
                Privacy Policy
              </Button>
              <Button 
                as="a" 
                href="#" 
                variant="light" 
                size="sm"
                className="text-white/60 hover:text-white"
              >
                Terms of Service
              </Button>
              <Button 
                as="a" 
                href="#" 
                variant="light" 
                size="sm"
                className="text-white/60 hover:text-white"
              >
                Contact
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout; 