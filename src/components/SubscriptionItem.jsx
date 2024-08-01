import React from 'react';
import { useNavigate } from 'react-router-dom';

const SubscriptionItem = ({ subscription }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/subscriptions/${subscription._id}/edit`);
  };

  return (
    <div className="p-4 border rounded mb-4">
      <h3 className="text-xl">{subscription.name}</h3>
      <p>Next Payment: {new Date(subscription.nextPayment).toLocaleDateString()}</p>
      <p>Amount: ${subscription.amount.toFixed(2)}</p>
      <button onClick={handleEdit} className="mt-2 bg-blue-500 text-white p-2 rounded">
        Edit
      </button>
    </div>
  );
};

export default SubscriptionItem;
