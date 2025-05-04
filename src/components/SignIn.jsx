import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useUser } from './UserContext';

export default function IllumeAuth() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const { setUser } = useUser();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      if (form.password !== form.confirmPassword) {
        alert('Passwords do not match');
        return;
      }
      // Simulate user creation (in a real app, this would check against a database)
      const newUser = { name: form.name, email: form.email, password: form.password };
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      alert(`Sign Up successful! Welcome, ${form.name}`);
      navigate('/profile');
    } else {
      // Simulate sign-in (check against localStorage for simplicity)
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser.email === form.email && parsedUser.password === form.password) {
          setUser(parsedUser);
          alert(`Sign In successful! Welcome back, ${parsedUser.name}`);
          navigate('/profile');
        } else {
          alert('Invalid email or password');
          return;
        }
      } else {
        alert('No account found. Please sign up first.');
        return;
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="backdrop-blur-lg bg-black/50 rounded-2xl p-8 max-w-sm w-full text-white shadow-[0_0_30px_rgba(255,255,255,0.1)] mt-24"
      >
        <h2 className="text-3xl font-bold mb-2 text-center bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
          {isSignUp ? 'Create Account' : 'Welcome Back'}
        </h2>
        <p className="text-center text-white/70 mb-6 text-sm">
          {isSignUp ? 'Join Illume AI today' : 'Login to your Illume AI account'}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full px-4 py-3 bg-[#1f1f1f] text-white placeholder-white/50 rounded-xl border border-white/20 focus:outline-none focus:ring-2 focus:ring-pink-400"
              required
            />
          )}
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full px-4 py-3 bg-[#1f1f1f] text-white placeholder-white/50 rounded-xl border border-white/20 focus:outline-none focus:ring-2 focus:ring-pink-400"
            required
          />
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full px-4 py-3 bg-[#1f1f1f] text-white placeholder-white/50 rounded-xl border border-white/20 focus:outline-none focus:ring-2 focus:ring-pink-400"
            required
          />
          {isSignUp && (
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              className="w-full px-4 py-3 bg-[#1f1f1f] text-white placeholder-white/50 rounded-xl border border-white/20 focus:outline-none focus:ring-2 focus:ring-pink-400"
              required
            />
          )}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-pink-400 to-blue-400 shadow-md hover:shadow-lg transition"
          >
            {isSignUp ? 'Sign Up' : 'Login'}
          </motion.button>
        </form>

        <div className="mt-6 text-center text-sm">
          {isSignUp ? (
            <>
              Already have an account?{' '}
              <button
                className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-blue-400 underline"
                onClick={() => setIsSignUp(false)}
              >
                Sign In
              </button>
            </>
          ) : (
            <>
              Don’t have an account?{' '}
              <button
                className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-blue-400 underline"
                onClick={() => setIsSignUp(true)}
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}