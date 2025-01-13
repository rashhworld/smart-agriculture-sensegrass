// Import necessary modules and functions
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

// Handle user registration
exports.register = async (req, res) => {
    try {
        // Validate request data
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ status: "error", msg: errors.array()[0].msg });

        const { fullName, email, password } = req.body;

        // Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ status: "error", msg: "User already exists" });

        // Hash password and create new user
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user in the database
        await User.create({ fullName, email, password: hashedPassword });
        res.status(201).json({ status: "success", msg: "User created successfully" });
    } catch (error) {
        res.status(500).json({ status: "error", msg: error.message });
    }
};

// Handle user login
exports.login = async (req, res) => {
    try {
        // Validate request data
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ status: "error", msg: errors.array()[0].msg });

        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ status: "error", msg: "User not found" });

        // Compare provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ status: "error", msg: "Invalid password" });

        // Generate JWT token if credentials are valid
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
        res.status(200).json({ status: "success", msg: "Login successfully.", token });
    } catch (error) {
        res.status(500).json({ status: "error", msg: error.message });
    }
};

// Get user credits
exports.getUserCredits = async (req, res) => {
    try {
        // Find user by ID from the token and fetch their credits
        const user = await User.findById(req.user.userId).select('credits');
        res.status(200).json({ status: 'success', credits: user.credits });
    } catch (error) {
        res.status(500).json({ status: 'error', msg: error.message });
    }
};