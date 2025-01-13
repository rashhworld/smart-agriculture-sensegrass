// Import necessary hooks and modules
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../apis/auth";
import { useAuth } from "../context/AuthContext";
import { PiSpinner } from "react-icons/pi";

// RegisterForm component
export default function RegisterForm() {
  // Extract methods from the custom AuthContext
  const { isLoading, setIsLoading } = useAuth();
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
      await registerUser(data); // Call the register API with the submitted data
      navigate("/login"); // Redirect to the login page
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    // Render the registration form UI
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-3">
            {/* Full Name Input */}
            <div>
              <input
                type="text"
                {...register("fullName", {
                  required: "Name is required",
                  minLength: {
                    value: 2,
                    message: "Name must be at least 2 characters", // Validation rule: min 2 characters
                  },
                })}
                className="w-full p-3 py-2.5 border-2 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter your Name"
              />
              {/* Error message for fullName input */}
              {errors.fullName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.fullName.message}
                </p>
              )}
            </div>
            {/* Email Input */}
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
              {/* Error message for email input */}
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            {/* Password Input */}
            <div>
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters", // Validation rule: min 6 characters
                  },
                })}
                className="w-full p-3 py-2.5 border-2 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter your password"
              />
              {/* Error message for password input */}
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={isLoading} // Disable the button if the form is submitting
              className="w-full p-3 py-2.5 border-2 rounded-lg focus:border-indigo-500 text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isLoading ? ( // Show spinner when loading
                <PiSpinner className="inline-block mx-auto animate-spin h-6 w-6" />
              ) : (
                "Register" // default text
              )}
            </button>
          </div>
        </form>

        {/* Link to login page if the user already has an account */}
        <p className="text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 hover:text-indigo-700">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
