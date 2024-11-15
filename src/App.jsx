import { Routes, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import WorkHistory from './components/WorkHistory';
import ProtectedRoute from './protectedRoute';
import ResumeUpload from './pages/ResumeUpload';
import { AuthProvider } from './contexts/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/upload-resume"
          element={
            <ProtectedRoute>
              <ResumeUpload />
            </ProtectedRoute>
          }
        />
        <Route
          path="/work-history"
          element={
            <ProtectedRoute>
              <WorkHistory />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
};

export default App;