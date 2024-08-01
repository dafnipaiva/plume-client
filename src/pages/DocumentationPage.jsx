import React from 'react';

const DocumentationPage = () => {
  return (
    <div className="flex flex-col items-center bg-gray-900 min-h-screen p-6">
      <header className="w-full py-8 bg-gray-800 text-center flex flex-col justify-center items-center mb-6 shadow-lg">
        <img src="/assets/plume_logo.png" alt="Plume Logo" className="w-20 h-20 mb-2" />
        <h1 className="text-4xl font-bold text-white font-serif">Documentation</h1>
      </header>
      <div className="w-full max-w-4xl p-6 bg-white text-gray-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">How to Use This Application</h2>
        <p className="mb-4">
          Welcome to Plume, a subscription management application. Here’s how you can use it:
        </p>
        <ol className="list-decimal ml-6 mb-4">
          <li><strong>Login:</strong> Use the login page to access your account.</li>
          <li><strong>View Subscriptions:</strong> The "My Subscriptions" page displays all your subscriptions and their details.</li>
          <li><strong>Add Subscription:</strong> Navigate to the "Add Subscription" page to add new subscriptions. Fill in the subscription details, such as name, cost, next billing date and click "Save" to add the subscription.</li>
          <li><strong>Edit Subscription:</strong> Click on the "Edit" button to update your existing subscriptions.</li>
          <li><strong>Delete Subscription:</strong> Click on the "Delete" button to delete a subscription.</li>
          <li><strong>Search Subscriptions:</strong> Use the search bar on the "My Subscriptions" page to filter subscriptions by name.</li>
          <li><strong>Logout:</strong> Click on the "Logout" button in the navbar to end your session.</li>
        </ol>
        
        <h2 className="text-2xl font-bold mb-4">Features</h2>
        <ul className="list-disc ml-6 mb-4">
          <li>Real-time search and filter functionality for subscriptions</li>
          <li>Easy subscription editing and removal</li>
          <li>Detailed view of total monthly expenses</li>
          <li>Documentation page with instructions and feature list</li>
          <li>Two databases were implemented in MongoDB: one for subscriptions to save each user's subscriptions by ID, and another for users to allow access only with a login and password, with bcrypt implemented for password encryption.</li>
          <li>All logos were sourced from Flaticon or directly from the company's website.</li>
        </ul>
      </div>
    </div>
  );
};

export default DocumentationPage;