import { useState } from 'react';
import { supabase } from '../supabaseClient';
import { Link } from 'react-router-dom';
import { Input, Button, Card, Spacer, Text } from "@nextui-org/react";

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
    <div className="flex items-center justify-center min-h-screen bg-deepBlueGreen p-4">
      <Card
        bordered
        className="backdrop-blur-lg bg-opacity-30 bg-greyGreen border-0 p-8 max-w-md rounded-xl shadow-lg"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
          borderRadius: "15px",
        }}
      >
        <Text
          h3
          className="text-yellow text-center font-semibold"
          style={{ fontFamily: "Roboto, sans-serif" }}
        >
          Login
        </Text>
        <Spacer y={1} />

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="mb-4">
            <Input
              clearable
              bordered
              fullWidth
              color="success"
              size="lg"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-opacity-20 bg-darkGreen placeholder:text-greyGreen text-olive"
            />
          </div>

          <div className="mb-6">
            <Input.Password
              clearable
              bordered
              fullWidth
              color="success"
              size="lg"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-opacity-20 bg-darkGreen placeholder:text-greyGreen text-olive"
            />
          </div>

          <Spacer y={1} />

          <Button
            type="submit"
            size="lg"
            shadow
            auto
            className="w-full bg-yellow text-darkGreen hover:bg-olive"
          >
            Login
          </Button>

          <Spacer y={0.5} />

          <Text
            size={14}
            className="text-center text-greyGreen mt-4"
            style={{ fontFamily: "Roboto, sans-serif" }}
          >
            Don’t have an account?{' '}
            <Link to="/register" className="text-yellow hover:underline">
              Register here
            </Link>
          </Text>
        </form>
      </Card>
    </div>
  );
};

export default Login;
