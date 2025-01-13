// Import necessary hooks and modules
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../apis/auth";
import { useAuth } from "../context/AuthContext";
import { PiSpinner } from "react-icons/pi";

// LoginForm component
export default function LoginForm() {
  // Extract methods from the custom AuthContext
  const { login: authLogin, isLoading, setIsLoading } = useAuth();
  const navigate = useNavigate(); // Hook for navigation

  // Initialize React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Function to handle form submission
  const onSubmit = async (data) => {
    setIsLoading(true); // Show the loading spinner
    try {
      const response = await loginUser(data); // Call the login API with the submitted data
      authLogin(response.token); // Save the token and update authentication state
      navigate("/"); // Redirect the dashboard on successful login
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  // Render the login form UI
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-3">
            {/* Email input field */}
            <div>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, // Email format validation
                    message: "Invalid email address",
                  },
                })}
                className="w-full p-3 py-2.5 border-2 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter your Email"
              />
              {/* Display validation error for email */}
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            {/* Password input field */}
            <div>
              <input
                type="password"
                {...register("password", { required: "Password is required" })}
                className="w-full p-3 py-2.5 border-2 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter your Password"
              />
              {/* Display validation error for password */}
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          {/* Submit button */}
          <div>
            <button
              type="submit"
              disabled={isLoading} // Disable the button if the form is submitting
              className="w-full p-3 py-2.5 border-2 rounded-lg focus:border-indigo-500 text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isLoading ? ( // Show spinner when loading
                <PiSpinner className="inline-block mx-auto animate-spin h-6 w-6" />
              ) : (
                "Sign in" // Default button text
              )}
            </button>
          </div>
        </form>

        {/* Link to registration page */}
        <p className="text-center">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-indigo-600 hover:text-indigo-700"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
