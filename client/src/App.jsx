// Import necessary components and libraries
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";

// Main App component
export default function App() {
  return (
    // AuthProvider wrapper to manage authentication state
    <AuthProvider>
      {/* Set up the router for navigation */}
      <BrowserRouter>
        {/* Toaster to show notification messages */}
        <Toaster position="top-center" />
        <Routes>
          {/* Protected route for the dashboard */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          {/* Routes for registration and login */}
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          {/* Catch-all route to redirect to home if the route is not found */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
