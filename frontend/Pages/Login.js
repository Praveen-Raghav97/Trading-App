import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login:', { email, password });
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 p-6"
    >
      <motion.div 
        initial={{ y: 50 }} 
        animate={{ y: 0 }} 
        className="bg-white rounded-3xl p-12 shadow-2xl w-full max-w-md"
      >
        <h2 className="text-4xl font-bold mb-6 text-center text-indigo-600">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 text-lg font-medium">Email</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email" 
              className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-lg"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-lg font-medium">Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password" 
              className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-lg"
              required
            />
          </div>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-lg text-lg hover:from-indigo-500 hover:to-purple-500 transition-all"
          >
            Login
          </motion.button>
        </form>
        <p className="text-center text-gray-600 mt-4">Don't have an account? <Link href="/signup" className="text-indigo-600">Sign Up</Link></p>
      </motion.div>
    </motion.div>
  );
};

export default Login;
