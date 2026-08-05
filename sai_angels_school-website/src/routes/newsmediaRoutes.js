import express from "express";

import {
    createNewsMedia,
    getNewsMedia,
    getSingleNewsMedia,
    updateNewsMedia,
    deleteNewsMedia
} from "../controllers/NewsMediaController.js";

const router = express.Router();

router.post("/", createNewsMedia);
router.get("/", getNewsMedia);
router.get("/:id", getSingleNewsMedia);
router.put("/:id", updateNewsMedia);
router.delete("/:id", deleteNewsMedia);

export default router;