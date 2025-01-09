const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

exports.register = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ status: "error", msg: errors.array()[0].msg });

        const { fullName, email, password } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ status: "error", msg: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({ fullName, email, password: hashedPassword });
        res.status(201).json({ status: "success", msg: "User created successfully" });
    } catch (error) {
        res.status(500).json({ status: "error", msg: "Server error" });
    }
};

exports.login = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ status: "error", msg: errors.array()[0].msg });

        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ status: "error", msg: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ status: "error", msg: "Invalid password" });

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
        res.status(200).json({ status: "success", msg: "Login successfully.", token });
    } catch (error) {
        res.status(500).json({ status: "error", msg: "Server error" });
    }
};