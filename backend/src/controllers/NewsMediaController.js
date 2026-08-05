import NewsMedia from "../models/NewsMedia.js";

// CREATE
export const createNewsMedia = async (req, res) => {
    try {
        const data = await NewsMedia.create(req.body);

        res.status(201).json({
            success: true,
            data,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// GET ALL ACTIVE NEWS
export const getNewsMedia = async (req, res) => {
    try {
        const data = await NewsMedia.find({ status: true }).sort({
            order: 1,
            createdAt: -1,
        });

        res.json({
            success: true,
            data,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// GET SINGLE
export const getSingleNewsMedia = async (req, res) => {
    try {
        const data = await NewsMedia.findById(req.params.id);

        res.json({
            success: true,
            data,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// UPDATE
export const updateNewsMedia = async (req, res) => {
    try {
        const data = await NewsMedia.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json({
            success: true,
            data,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// DELETE
export const deleteNewsMedia = async (req, res) => {
    try {
        await NewsMedia.findByIdAndDelete(req.params.id);

        res.json({
            success: true,
            message: "Deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};