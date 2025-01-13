# Smart Agriculture Management System

A modern web application for managing agricultural fields with real-time monitoring, AI-powered insights, and data visualization.

## Features

- 🌾 Field Management

  - Create, update, and delete field data
  - Track crop types and area sizes
  - Store geographical coordinates

- 📊 Analytics & Insights

  - Real-time soil health monitoring
  - Crop health analysis
  - Interactive data visualization using Chart.js
  - AI-powered recommendations

- 💳 Credit System

  - First field creation is free
  - Additional fields require credits
  - Secure payment integration with Stripe
  - Transaction history tracking

- 🔐 Authentication
  - Secure user registration and login
  - JWT-based authentication
  - Protected routes

## Tech Stack

### Frontend

- React.js with Vite
- React Router for navigation
- Tailwind CSS for styling
- Chart.js for data visualization
- Stripe for payment processing
- Axios for API communication
- React Hook Form for form management
- React Hot Toast for notifications

### Backend

- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- Bcrypt for password hashing
- Express Validator for input validation
- Stripe API integration

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- Stripe account for payment processing

### Step-by-Step Installation

#### 1. Clone the Repository

Clone the project repository to your local machine:

```bash
git clone https://github.com/rashhworld/smart-agriculture-sensegrass.git
```

Navigate to the project directory:

```bash
cd smart-agriculture-sensegrass
```

#### 2. Frontend Setup

Navigate to client directory:

```bash
cd client
```

Install frontend dependencies:

```bash
npm install
```

Create .env file and add:

```bash
VITE_API_BASE_URL = http://localhost:3000/api
VITE_STRIPE_PUBLISHABLE_KEY = your_stripe_public_key
```

Start the development server:

```bash
npm run dev
```

#### 3. Backend Setup

Navigate to server directory:

```bash
cd ../server
```

Install backend dependencies:

```bash
npm install
```

Create .env file and add:

```bash
MONGODB_URI = your_mongo_db_url
STRIPE_SECRET_KEY = your_stripe_secret_key
JWT_SECRET = your_JWT_secret_key
```

Start the server:

```bash
node index
```

### Verification

1. Frontend should be running at: `http://localhost:5173`
2. Backend should be running at: `http://localhost:3000`

## API Endpoints

### Authentication

- POST `/api/register` - User registration
- POST `/api/login` - User login
- GET `/api/credits` - Get user credits

### Fields

- POST `/api/fields` - Create new field
- GET `/api/fields` - Get all fields
- PUT `/api/fields/:id` - Update field
- DELETE `/api/fields/:id` - Delete field

### AI Analysis

- GET `/api/ai/analysis/:fieldId` - Get field analysis

### Payments

- POST `/api/payments/create-payment-intent` - Create payment intent
- POST `/api/payments/save-transaction` - Save transaction details

## Testing

For testing payments, use the following test card details:

- Card Number: 4242 4242 4242 4242
- Expiry: 01/25
- CVC: 123
