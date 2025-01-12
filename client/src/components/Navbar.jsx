import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { GiTwoCoins } from "react-icons/gi";
import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";

export default function Navbar({
  totalFields,
  userCredits,
  onOpenCreditsModal,
  onOpenFieldModal,
}) {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleFieldModal = () => {
    if (totalFields >= 1 && userCredits < 5) {
      alert("Please recharge your credits to add more field data.");
      return;
    }

    onOpenFieldModal();
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
            Field Management
          </h1>
          <div className="flex items-center">
            <p className="flex items-center gap-1 sm:mr-3">
              <GiTwoCoins className="text-yellow-400 text-xl" /> {userCredits}
            </p>

            <div
              className={`${
                isMenuOpen ? "block" : "hidden"
              } sm:flex sm:items-center sm:space-x-3 absolute sm:static top-16 right-0 left-0 bg-white sm:bg-transparent p-4 sm:p-0 shadow-md sm:shadow-none`}
            >
              <button
                onClick={onOpenCreditsModal}
                className="px-4 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition-colors w-full sm:w-auto mb-2 sm:mb-0"
              >
                Add Credits
              </button>
              <button
                onClick={handleFieldModal}
                className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors w-full sm:w-auto mb-2 sm:mb-0"
              >
                Add New Field
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 border border-gray-300 text-sm text-gray-700 rounded-md hover:bg-gray-50 transition-colors w-full sm:w-auto"
              >
                Logout
              </button>
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="sm:hidden ml-2 p-2"
            >
              {isMenuOpen ? (
                <HiX className="h-6 w-6 text-gray-600" />
              ) : (
                <HiMenu className="h-6 w-6 text-gray-600" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
