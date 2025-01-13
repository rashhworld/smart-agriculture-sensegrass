// Importing necessary libraries and components
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { createPaymentIntent, saveTransaction } from "../apis/payment";
import { RiCloseLargeLine } from "react-icons/ri";
import { PiSpinner } from "react-icons/pi";

// Initializing Stripe with the publishable key from environment variables
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

// Credit options available for the user to choose
const CREDIT_OPTIONS = [10, 20, 50, 100, 1000];

// Form for handling the payment process
function CheckoutForm({ amount, onSuccess, onClose }) {
  const stripe = useStripe(); // Access Stripe instance
  const elements = useElements(); // Access Stripe elements
  const [loading, setLoading] = useState(false); // Loading state during payment processing

  // Handles form submission and payment confirmation
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return; // Ensure Stripe and elements are loaded

    setLoading(true);
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: { payment_method_data: {} },
      redirect: "if_required",
    });

    if (error) {
      console.error(error);
      toast.error(error.message);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      try {
        // Save the transaction details
        await saveTransaction({
          amount: paymentIntent.amount / 100,
          paymentId: paymentIntent.id,
          status: paymentIntent.status,
        });

        toast.success("Payment successful!");
        onSuccess(); // Notify parent component of success
        onClose(); // Close the modal
      } catch (error) {
        console.error("Failed to save transaction:", error);
      }
    } else {
      toast.error("Payment could not be processed.");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement /> {/* Stripe payment UI */}
      <div className="flex justify-end space-x-3 mt-6">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 border border-gray-300 rounded-lg"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={!stripe || loading}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg disabled:opacity-50"
        >
          {loading ? "Processing..." : `Pay ₹${amount}`}
        </button>
      </div>
    </form>
  );
}

// Main modal component for adding credits
export default function CreditsModal({ isOpen, onClose, onSuccess }) {
  const [selectedAmount, setSelectedAmount] = useState(null); // Selected credit amount
  const [clientSecret, setClientSecret] = useState(null); // Client secret for Stripe payment

  // Close the modal and reset state
  const handleClose = () => {
    onClose();
    setSelectedAmount(null);
    setClientSecret(null);
  };

  // Fetch client secret when a credit amount is selected
  useEffect(() => {
    (async () => {
      if (selectedAmount) {
        try {
          const data = await createPaymentIntent(selectedAmount); // API call to create a payment intent
          setClientSecret(data.clientSecret); // Set client secret for Stripe Elements
        } catch (error) {
          console.error(error);
        }
      }
    })();
  }, [selectedAmount]);

  // Render nothing if the modal is not open
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-600 bg-opacity-50">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="relative w-full max-w-md rounded-xl bg-white p-6 shadow-2xl">
          <div className="flex items-center justify-between border-gray-200 pb-4">
            <h2 className="uppercase font-semibold text-gray-900">
              Add Credits
            </h2>
            <button
              onClick={handleClose}
              className="text-gray-600 hover:text-gray-900"
            >
              <RiCloseLargeLine />
            </button>
          </div>

          {/* Card details for test payments */}
          <p className="text-sm text-gray-500 mb-2">
            Select the amount and use the below card details.
          </p>
          <div className="flex justify-between flex-col sm:flex-row gap-0 sm:gap-2 font-medium text-sm bg-gray-100 text-gray-500 rounded-lg p-2 mb-4">
            <p>Card : 4242 4242 4242 4242</p>
            <p>Expiry : 01/25</p>
            <p>CVC : 123</p>
          </div>

          {/* Render credit options or payment form based on user selection */}
          {!selectedAmount ? (
            <div className="grid grid-cols-3 gap-3 mb-6">
              {/* Buttons for selecting credit amount */}
              {CREDIT_OPTIONS.map((amount) => (
                <button
                  key={amount}
                  type="button"
                  onClick={() => setSelectedAmount(amount)}
                  className="p-3 text-center rounded-lg border border-gray-200 hover:border-blue-500 hover:bg-blue-50"
                >
                  ₹{amount}
                </button>
              ))}
            </div>
          ) : clientSecret ? (
            // Stripe Elements for payment processing
            <Elements
              stripe={stripePromise}
              options={{
                clientSecret,
                appearance: {
                  theme: "stripe",
                  variables: {
                    colorPrimary: "#2563eb",
                  },
                },
              }}
            >
              <CheckoutForm
                amount={selectedAmount}
                onSuccess={onSuccess}
                onClose={handleClose}
              />
            </Elements>
          ) : (
            // Loading spinner while waiting for client secret
            <div className="flex items-center justify-center">
              <PiSpinner className="animate-spin h-7 w-7" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
