import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-purple-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg">Plume</div>
        <div className="flex items-center space-x-4">
          {location.pathname === '/documentation' && (
            <Link to="/subscriptions" className="text-white hover:underline">
              Subscriptions
            </Link>
          )}
          {location.pathname === '/subscriptions' && (
            <Link to="/documentation" className="text-white hover:underline">
              Documentation
            </Link>
          )}
          {user && (
            <button onClick={handleLogout} className="text-white px-4">
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;