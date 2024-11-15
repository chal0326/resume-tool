import { scan } from 'react-scan';
import { Routes, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import WorkHistory from './components/WorkHistory';
import ProtectedRoute from './protectedRoute';
import ResumeUpload from './pages/ResumeUpload';
import { AuthProvider } from './contexts/AuthContext';
import MainLayout from './components/layout/MainLayout';

scan({
  enabled: true,
  log: true,
  clearlLog: false,
});

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
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