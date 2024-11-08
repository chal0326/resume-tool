import { useState } from 'react';
import { supabase } from './supabaseClient';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      console.error('Error logging in:', error.message);
    } else {
      // Redirect to dashboard or handle login success
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-400 via-blue-500 to-purple-600">
      <form
        onSubmit={handleLogin}
        className="bg-white bg-opacity-20 backdrop-blur-md rounded-2xl shadow-lg p-8 w-96"
      >
        <h2 className="text-3xl font-semibold mb-6 text-center text-white">Login</h2>
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 bg-transparent border border-white rounded-md text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
        </div>
        <div className="mb-6">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 bg-transparent border border-white rounded-md text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 mb-4 bg-blue-500 bg-opacity-80 text-white rounded-md hover:bg-opacity-100 transition duration-200"
        >
          Login
        </button>
        <p className="text-center text-white">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-200 hover:underline">
            Register here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
