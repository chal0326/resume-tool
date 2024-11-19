import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@nextui-org/react";
import { useAuth } from '../../contexts/AuthContext';
import GlassLoginBox from './GlassLoginBox';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await signIn(email, password);
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setError('Login failed. Please check your email and password and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      <GlassLoginBox>
        {error && (
          <div className="bg-red-500/20 backdrop-blur-sm text-white p-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 rounded bg-white/40 text-black placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-6">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 rounded bg-white/40 text-black placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-white/50 text-black py-2 rounded hover:bg-white/70"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </Button>

          <p className="text-center text-white/70 mt-4">
            Don't have an account?{' '}
            <Link to="/register" className="text-white hover:underline">
              Register here
            </Link>
          </p>
        </form>
      </GlassLoginBox>
    </div>
  );
};

export default Login;
