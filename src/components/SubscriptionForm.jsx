import React, { useState } from 'react';

const SubscriptionForm = ({ onAddOrEdit, initialData }) => {
  const [name, setName] = useState(initialData?.name || '');
  const [nextPayment, setNextPayment] = useState(initialData?.nextPayment || '');
  const [amount, setAmount] = useState(initialData?.amount || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddOrEdit({ name, nextPayment, amount });
    setName('');
    setNextPayment('');
    setAmount('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Subscription Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />
      <input
        type="date"
        placeholder="Next Payment"
        value={nextPayment}
        onChange={(e) => setNextPayment(e.target.value)}
        required
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />
      <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">
        Save Subscription
      </button>
    </form>
  );
};

export default SubscriptionForm;
