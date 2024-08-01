import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import SubscriptionList from '../components/SubscriptionList';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const SubscriptionPage = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { user } = useAuth();

  const fetchSubscriptions = useCallback(async () => {
    try {
      const response = await axios.get(`https://plume-server.onrender.com/api/subscriptions/${user._id}`);
      setSubscriptions(response.data);
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
    }
  }, [user]);

  useEffect(() => {
    fetchSubscriptions();
  }, [user, fetchSubscriptions]);

  const calculateTotalCost = () => {
    return subscriptions.reduce((total, subscription) => total + (subscription.amount || 0), 0).toFixed(2);
  };

  // Filter subscriptions based on search term
  const filteredSubscriptions = subscriptions.filter(subscription =>
    subscription.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center bg-gray-900 min-h-screen">
      <header className="w-full py-8 bg-gray-800 text-center flex flex-col justify-center items-center mb-6 shadow-lg">
        <img src="/assets/plume_logo.png" alt="Plume Logo" className="w-20 h-20 mb-2" />
        <h1 className="text-4xl font-bold text-white font-serif" style={{ fontFamily: 'Aref Ruqaa, serif' }}>Plume</h1>
      </header>
      <div className="w-full max-w-4xl p-6">
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg shadow-lg p-6 mb-6 text-center">
          <h2 className="text-lg font-semibold mb-2">TOTAL MONTHLY EXPENSES</h2>
          <p className="text-3xl font-bold tracking-tight">CA$ {calculateTotalCost()}</p>
        </div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl text-white">My Subscriptions</h2>
          <Link to="/add-subscription">
            <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-300">
              + Add Subscription
            </button>
          </Link>
        </div>
        {/* Search Bar */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search subscriptions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg w-full bg-white text-gray-800 placeholder-gray-500"
          />
        </div>
        <SubscriptionList subscriptions={filteredSubscriptions} fetchSubscriptions={fetchSubscriptions} />
      </div>
    </div>
  );
};

export default SubscriptionPage;