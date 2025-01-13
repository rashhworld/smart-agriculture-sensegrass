// Import necessary modules from React Router and authentication context
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// ProtectedRoute component as a wrapper to ensure user authentication
export default function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth();

  // If the authentication state is still loading show a loading spinner
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // If the user is not authenticated, redirect them to the login page
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If the user is authenticated, render the protected content (children)
  return children;
}
