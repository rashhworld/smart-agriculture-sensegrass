const Field = require('../models/Field');
const { validationResult } = require('express-validator');

exports.createField = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ status: "error", msg: errors.array()[0].msg });

        const field = await Field.create({ ...req.body, user: req.user.userId });
        res.status(201).json({ status: "success", msg: "Field created successfully", field });
    } catch (error) {
        res.status(500).json({ status: "error", msg: error.message });
    }
};

exports.getFields = async (req, res) => {
    try {
        const fields = await Field.find({ user: req.user.userId });
        res.status(200).json({ status: "success", fields });
    } catch (error) {
        res.status(500).json({ status: "error", msg: error.message });
    }
};

exports.updateField = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ status: "error", msg: errors.array()[0].msg });

        const field = await Field.findOneAndUpdate(
            { _id: req.params.id, user: req.user.userId }, req.body, { new: true }
        );

        if (!field) return res.status(404).json({ status: "error", msg: "Field not found" });

        res.status(200).json({ status: "success", msg: "Field updated successfully", field });
    } catch (error) {
        res.status(500).json({ status: "error", msg: error.message });
    }
};

exports.deleteField = async (req, res) => {
    try {
        const field = await Field.findOneAndDelete({
            _id: req.params.id, user: req.user.userId
        });

        if (!field) return res.status(404).json({ status: "error", msg: "Field not found" });

        res.status(200).json({ status: "success", msg: "Field deleted successfully" });
    } catch (error) {
        res.status(500).json({ status: "error", msg: error.message });
    }
};