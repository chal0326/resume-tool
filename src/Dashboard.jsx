import  { useContext } from 'react';
import { supabase } from './supabaseClient';
import { AuthContext } from './AuthContext';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error logging out:', error.message);
    }
  };

  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-gray-700 to-gray-900 text-white">
      <h1 className="text-3xl mb-6">Welcome, {user.email}</h1>
      <div className="space-x-4">
        <Link
          to="/work-history"
          className="bg-blue-500 p-2 rounded hover:bg-blue-600 transition"
        >
          Work History
        </Link>
        <Link
  to="/upload-resume"
  className="bg-green-500 p-2 rounded hover:bg-green-600 transition"
>
  Upload Resume
</Link>

        <button
          onClick={handleLogout}
          className="bg-red-500 p-2 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
