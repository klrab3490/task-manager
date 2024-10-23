// src/Home.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Login from '../components/Login';
import Register from '../components/Register';

const Home = () => {
  const [isLogin, setIsLogin] = useState(true); // Default to login form

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#242424] w-full">
      <div className="w-full max-w-md p-8 bg-gray-700 shadow-lg rounded-lg">
        <div className="flex justify-around mb-6">
          <button
            onClick={() => setIsLogin(true)}
            className={`py-2 px-4 font-semibold ${isLogin ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`py-2 px-4 font-semibold ${!isLogin ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
          >
            Register
          </button>
        </div>

        <motion.div
          key={isLogin ? "loginForm" : "registerForm"}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.5 }}
        >
          {isLogin ? <Login /> : <Register />}
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
