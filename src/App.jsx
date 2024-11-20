import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Login, Register, AuthGuard } from './components/auth';
import { MainLayout } from './components/layout';
import { Dashboard, WorkHistory, ResumeUpload } from './pages';
import { AuthProvider } from './contexts/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={
          <AuthGuard>
            <MainLayout />
          </AuthGuard>
        }>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/upload-resume" element={<ResumeUpload />} />
          <Route path="/work-history" element={<WorkHistory />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
};

export default App;