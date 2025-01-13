// Import necessary modules and functions
const User = require('../models/User');
const Field = require('../models/Field');
const { validationResult } = require('express-validator');

exports.createField = async (req, res) => {
    try {
        // Validate request data
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ status: "error", msg: errors.array()[0].msg });

        const user = await User.findById(req.user.userId);
        const totalfields = (await Field.find({ user: req.user.userId })).length;

        // Credit system: First field is free, subsequent fields cost 5 credits
        if (user.credits < 5 && totalfields >= 1) return res.status(400).json({ status: "error", msg: "Insufficient credits." });
        if (totalfields >= 1) await User.findByIdAndUpdate(req.user.userId, { $inc: { credits: -5 } });

        // Create new field
        const field = await Field.create({ ...req.body, user: req.user.userId });
        res.status(201).json({ status: "success", msg: "Field created successfully", field });
    } catch (error) {
        res.status(500).json({ status: "error", msg: error.message });
    }
};

// fetch all fields
exports.getFields = async (req, res) => {
    try {
        // Find all fields associated with the authenticated user
        const fields = await Field.find({ user: req.user.userId });
        res.status(200).json({ status: "success", fields });
    } catch (error) {
        res.status(500).json({ status: "error", msg: error.message });
    }
};

// update fields data
exports.updateField = async (req, res) => {
    try {
        // Validate request data
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ status: "error", msg: errors.array()[0].msg });

        // Update the field with the provided ID for the authenticated user
        const field = await Field.findOneAndUpdate(
            { _id: req.params.id, user: req.user.userId }, req.body, { new: true } // Return the updated field
        );

        // If no field is found, return an error
        if (!field) return res.status(404).json({ status: "error", msg: "Field not found" });

        res.status(200).json({ status: "success", msg: "Field updated successfully", field });
    } catch (error) {
        res.status(500).json({ status: "error", msg: error.message });
    }
};

// delete particular field
exports.deleteField = async (req, res) => {
    try {
        // Delete the field with the provided ID for the authenticated user
        const field = await Field.findOneAndDelete({
            _id: req.params.id, user: req.user.userId
        });

        // If no field is found, return an error
        if (!field) return res.status(404).json({ status: "error", msg: "Field not found" });

        res.status(200).json({ status: "success", msg: "Field deleted successfully" });
    } catch (error) {
        res.status(500).json({ status: "error", msg: error.message });
    }
};