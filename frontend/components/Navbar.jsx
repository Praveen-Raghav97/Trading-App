"use client"
// components/Navbar.js
import { motion } from 'framer-motion';
import Link from 'next/link';

const Navbar = () => {
  return (
    <motion.nav 
      initial={{ y: -100 }} 
      animate={{ y: 0 }} 
      transition={{ type: 'spring', stiffness: 120 }}
      className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 text-white flex justify-between items-center shadow-lg rounded-b-2xl"
    >
      <motion.h1 
        className="text-2xl font-bold tracking-wide"
        whileHover={{ scale: 1.1 }}
      >
    HANAHANA
      </motion.h1>
      <div className="space-x-8 text-lg font-medium">
        <Link href="/" className="hover:text-gray-300 transition-all duration-300">Home</Link>
        <Link href="/admin" className="hover:text-gray-300 transition-all duration-300">Admin Panel</Link>
        <Link href="/login" className="hover:text-gray-300 transition-all duration-300">Login</Link>
        <Link href="/signup" className="hover:text-gray-300 transition-all duration-300">Sign Up</Link>
      </div>
    </motion.nav>
  );
};

export default Navbar;