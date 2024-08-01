import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import SubscriptionPage from './pages/SubscriptionPage';
import AddSubscriptionPage from './pages/AddSubscriptionPage';
import EditSubscriptionPage from './pages/EditSubscriptionPage';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuth } from './context/AuthContext';
import DocumentationPage from './pages/DocumentationPage';


function App() {
  const { user } = useAuth();

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/subscriptions" element={<ProtectedRoute><SubscriptionPage /></ProtectedRoute>} />
        <Route path="/add-subscription" element={<ProtectedRoute><AddSubscriptionPage /></ProtectedRoute>} />
        <Route path="/edit-subscription/:id" element={<ProtectedRoute><EditSubscriptionPage /></ProtectedRoute>} />

        <Route path="*" element={<Navigate to={user ? "/subscriptions" : "/login"} />} />
        <Route path="/documentation" element={<DocumentationPage />} /> {/* Add this route */}

      </Routes>
    </Router>
  );
}

export default App;