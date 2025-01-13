// Import required modules and routes
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const fieldRoutes = require('./routes/fieldRoutes');
const tokenValidator = require('./middleware/tokenValidator');
const aiRoutes = require('./routes/aiRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

// Initialize the app and connect to the database
const app = express();
connectDB();

// Middleware setup
app.use(cors());
app.use(express.json());

// Define routes
app.use('/api', authRoutes);
app.use('/api/fields', tokenValidator, fieldRoutes);
app.use('/api/ai', tokenValidator, aiRoutes);
app.use('/api/payments', tokenValidator, paymentRoutes);

// Default route for API status
app.get('/', (req, res) => {
    res.status(200).send({ status: "success", msg: "API is working well." });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
