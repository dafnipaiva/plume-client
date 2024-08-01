import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { parseISO, format } from 'date-fns';

// Subscriptions names and logos
const logoMap = {
  'Netflix': 'netflix.png',
  'Amazon Prime': 'amazon.png',
  'Hulu': 'hulu.png',
  'PlayStation Plus': 'playstation-plus_logo.jpg',
  'Nintendo': 'nintendo.png',
  'Spotify': 'spotify.png',
  'Youtube Music': 'youtube.png',
  'Apple Music': 'apple-music_logo.jpg',
  'Deezer': 'deezer_logo.jpg',
  'Disney+': 'disney.png',
  'Amazon Kindle': 'kindle.png',
  'Google Storage': 'google_logo.jpg',
  'Dropbox': 'dropbox.png',
  'iCloud': 'icloud.png',
  'Adobe Creative Cloud': 'adobe_logo.jpg',
  'Canva': 'canva_logo.jpg',
  'Chatgpt': 'chatgpt_logo.jpg',
  'LinkedIn': 'linkedin_logo.jpg',
  'Microsoft 365': 'microsoft365_logo.jpg',
  'HelloFresh': 'hellofresh.png',
  'Other': 'plume_logo.png'
};

const SubscriptionList = ({ subscriptions, fetchSubscriptions }) => {
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://plume-server.onrender.com/api/subscriptions/${id}`);
      fetchSubscriptions(); // update subscription after delete
    } catch (error) {
      console.error('Error deleting subscription:', error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-subscription/${id}`);
  };

  const formatDate = (dateString) => {
    const date = parseISO(dateString);
    return format(date, 'MMMM d, yyyy');
  };

  return (
    <div className="space-y-4">
      {subscriptions.map((subscription) => (
        <div key={subscription._id} className="bg-gray-800 p-4 rounded-lg shadow-lg flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <img 
              src={`/assets/${logoMap[subscription.name] || 'plume_logo.png'}`} 
              alt={subscription.name} 
              className="w-12 h-12 mr-4 rounded-full border border-white"
            />
            <div className="text-white">
              <h3 className="text-lg font-semibold">{subscription.name}</h3>
              <p className="text-sm">Next Payment: {formatDate(subscription.nextPayment)}</p>
            </div>
          </div>
          <div className="text-white text-right">
            <p className="text-lg font-semibold">CA$ {subscription.amount ? subscription.amount.toFixed(2) : 'N/A'}</p>
            <div className="flex space-x-2 mt-2">
              <button
                onClick={() => handleEdit(subscription._id)}
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(subscription._id)}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SubscriptionList;
