import VideoGallery from "../models/VideoGallery.js";

// Get all video gallery items
export const getVideoGallery = async (req, res) => {
  try {
    // Fetch videos and sort by latest created date
    const videos = await VideoGallery.find().sort({ createdAt: -1 });

    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new video gallery item
export const createVideoGallery = async (req, res) => {
  try {
    // Create video using request body data
    const video = await VideoGallery.create(req.body);

    res.status(201).json(video);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an existing video gallery item
export const updateVideoGallery = async (req, res) => {
  try {
    // Find video by ID and update with new data
    const video = await VideoGallery.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    // Check if video exists
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    res.status(200).json(video);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a video gallery item
export const deleteVideoGallery = async (req, res) => {
  try {
    // Find video by ID and delete it
    const video = await VideoGallery.findByIdAndDelete(req.params.id);

    // Check if video exists
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    res.status(200).json({ message: "Video deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};