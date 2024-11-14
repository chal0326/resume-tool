import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input, Button, Card } from "@nextui-org/react";
import { useAuth } from '../contexts/AuthContext';

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
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-deepBlueGreen p-4">
      <Card
        className="backdrop-blur-lg bg-opacity-30 border-0 p-8 max-w-md rounded-xl shadow-lg"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
        }}
      >
        <h3 className="text-2xl text-yellow text-center font-semibold mb-6">
          Login
        </h3>

        {error && (
          <div className="bg-red-500 text-white p-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="mb-4">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-opacity-20 bg-darkGreen placeholder:text-greyGreen text-olive"
            />
          </div>

          <div className="mb-6">
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-opacity-20 bg-darkGreen placeholder:text-greyGreen text-olive"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-yellow text-darkGreen hover:bg-olive"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </Button>

          <p className="text-center text-greyGreen mt-4">
            Don't have an account?{' '}
            <Link to="/register" className="text-yellow hover:underline">
              Register here
            </Link>
          </p>
        </form>
      </Card>
    </div>
  );
};

export default Login;