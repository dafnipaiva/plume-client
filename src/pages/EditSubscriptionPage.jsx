import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { parseISO, format } from "date-fns";
import { useAuth } from "../context/AuthContext";

const EditSubscriptionPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [subscription, setSubscription] = useState({
    name: "",
    amount: "",
    nextPayment: "",
    otherName: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    amount: "",
    nextPayment: "",
    otherName: "",
  });

  const subscriptionOptions = useMemo(() => [
    "Adobe Creative Cloud",
    "Amazon Kindle",
    "Amazon Prime",
    "Apple Music",
    "Canva",
    "Chatgpt",
    "Deezer",
    "Disney+",
    "Dropbox",
    "Google Storage",
    "HelloFresh",
    "Hulu",
    "iCloud",
    "LinkedIn",
    "Microsoft 365",
    "Netflix",
    "Nintendo",
    "PlayStation Plus",
    "Spotify",
    "Youtube Music",
    "Other",
  ], []); // Empty dependency array ensures this is memoized and doesn't change

  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/api/subscriptions/subscription/${id}`
        );
        const { name, amount, nextPayment } = response.data;
        const formattedNextPayment = format(
          parseISO(nextPayment),
          "yyyy-MM-dd"
        );

        const isCustomName = !subscriptionOptions.includes(name);
        setSubscription({
          name: isCustomName ? "Other" : name,
          amount,
          nextPayment: formattedNextPayment,
          otherName: isCustomName ? name : "",
        });
      } catch (error) {
        console.error("Error fetching subscription:", error);
      }
    };

    fetchSubscription();
  }, [id, subscriptionOptions]);

  const handleChange = (e) => {
    setSubscription({ ...subscription, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, amount, nextPayment, otherName } = subscription;

    // Reset errors
    setErrors({
      name: "",
      amount: "",
      nextPayment: "",
      otherName: "",
    });

    // Validation
    let hasError = false;
    const newErrors = {};

    if (!name) {
      newErrors.name = "Please select a subscription.";
      hasError = true;
    }
    if (name === "Other" && !otherName) {
      newErrors.otherName = "Please enter the name of your subscription.";
      hasError = true;
    }
    if (!amount) {
      newErrors.amount = "Please enter the monthly cost.";
      hasError = true;
    }
    if (parseFloat(amount) < 0) {
      newErrors.amount = "Monthly cost cannot be negative.";
      hasError = true;
    }
    if (!nextPayment) {
      newErrors.nextPayment = "Please select the date of the next payment.";
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    const subscriptionData = {
      name: name === "Other" ? otherName : name,
      amount: parseFloat(amount),
      nextPayment: parseISO(nextPayment).toISOString(),
      userId: user._id,
    };

    try {
      await axios.put(
        `http://localhost:5001/api/subscriptions/${id}`,
        subscriptionData
      );
      navigate("/subscriptions");
    } catch (error) {
      console.error("Error updating subscription:", error);
    }
  };

  const handleCancel = () => {
    navigate("/subscriptions");
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="flex justify-center items-center h-screen bg-black">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl mb-4 text-white">Edit Subscription</h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2 text-white">Subscription</label>
          <select
            name="name"
            value={subscription.name}
            onChange={handleChange}
            className={`w-full p-2 mb-2 border border-gray-300 rounded bg-black text-white ${
              errors.name ? "border-red-500" : ""
            }`}
          >
            <option value="">Select Subscription</option>
            {subscriptionOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.name && <p className="text-red-500 mb-4">{errors.name}</p>}

          {subscription.name === "Other" && (
            <>
              <input
                type="text"
                name="otherName"
                placeholder="Enter subscription name"
                value={subscription.otherName}
                onChange={handleChange}
                className={`w-full p-2 mb-2 border border-gray-300 rounded bg-black text-white ${
                  errors.otherName ? "border-red-500" : ""
                }`}
              />
              {errors.otherName && (
                <p className="text-red-500 mb-4">{errors.otherName}</p>
              )}
            </>
          )}

          <label className="block mb-2 text-white">Monthly Cost (CA$)</label>
          <input
            type="number"
            name="amount"
            placeholder="E.g.: 19.90"
            value={subscription.amount}
            onChange={handleChange}
            className={`w-full p-2 mb-2 border border-gray-300 rounded bg-black text-white ${
              errors.amount ? "border-red-500" : ""
            }`}
          />
          {errors.amount && (
            <p className="text-red-500 mb-4">{errors.amount}</p>
          )}

          <label className="block mb-2 text-white">Date of Next Payment</label>
          <input
            type="date"
            name="nextPayment"
            value={subscription.nextPayment}
            onChange={handleChange}
            className={`w-full p-2 mb-2 border border-gray-300 rounded bg-black text-white ${
              errors.nextPayment ? "border-red-500" : ""
            }`}
            min={today} // Prevent selecting past dates
          />
          {errors.nextPayment && (
            <p className="text-red-500 mb-4">{errors.nextPayment}</p>
          )}

          <div className="flex space-x-4">
            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-300"
            >
              Save
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditSubscriptionPage;