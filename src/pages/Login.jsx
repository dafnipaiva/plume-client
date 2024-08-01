import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // Use AuthContext to login function
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://plume-server.onrender.com/api/users/login', credentials);
      if (response.data.success) {
        login(response.data.user); // update autentication state of user's data
        navigate('/subscriptions');
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError('Invalid username or password.');
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-black">
      <div className="flex items-center mb-8">
        <img src={`${process.env.PUBLIC_URL}/assets/plume_logo.png`} alt="Plume Logo" className="h-16 w-16 mr-2" />
        <h1 className="text-4xl text-white font-serif">Plume</h1>
      </div>
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl mb-4 text-white">Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={credentials.username}
            onChange={handleChange}
            className="w-full p-2 mb-4 border border-gray-300 rounded bg-black text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={credentials.password}
            onChange={handleChange}
            className="w-full p-2 mb-4 border border-gray-300 rounded bg-black text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <button type="submit" className="w-full bg-purple-600 text-white p-2 rounded hover:bg-purple-700 transition duration-300">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;