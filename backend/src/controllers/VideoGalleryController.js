
import VideoGallery from "../models/VideoGallery.js";

// Get all video gallery items, newest first
export const getVideoGallery = async (req, res) => {
  try {
    const videos = await VideoGallery.find().sort({ createdAt: -1 });
    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new video gallery item in MongoDB
export const createVideoGallery = async (req, res) => {
  try {
    const video = await VideoGallery.create(req.body);
    res.status(201).json(video);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an existing video gallery item by MongoDB ID
export const updateVideoGallery = async (req, res) => {
  try {
    const video = await VideoGallery.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    res.status(200).json(video);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a video gallery item from MongoDB
export const deleteVideoGallery = async (req, res) => {
  try {
    const video = await VideoGallery.findByIdAndDelete(req.params.id);

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    res.status(200).json({
      message: "Video deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
