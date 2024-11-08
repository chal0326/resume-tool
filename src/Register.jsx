import React, { useState } from 'react';
import { supabase } from './supabaseClient';
import { Link } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      console.error('Error signing up:', error.message);
    } else {
      // Handle successful registration
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500">
      <form
        onSubmit={handleRegister}
        className="bg-white bg-opacity-20 backdrop-blur-md rounded-2xl shadow-lg p-8 w-96"
      >
        <h2 className="text-3xl font-semibold mb-6 text-center text-white">Register</h2>
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 bg-transparent border border-white rounded-md text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-pink-200"
          />
        </div>
        <div className="mb-6">
          <input
            type="password"
            placeholder="Password (min 6 characters)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 bg-transparent border border-white rounded-md text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-pink-200"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 mb-4 bg-pink-500 bg-opacity-80 text-white rounded-md hover:bg-opacity-100 transition duration-200"
        >
          Register
        </button>
        <p className="text-center text-white">
          Already have an account?{' '}
          <Link to="/" className="text-pink-200 hover:underline">
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
