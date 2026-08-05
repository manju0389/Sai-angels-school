import mongoose from "mongoose";

// Schema for individual working hour items
const ItemSchema = new mongoose.Schema(
  {
    id: Number,
    label: String,
    time: String,
  },
  {
    _id: false,
  }
);

// Schema for working hour sections
const SectionSchema = new mongoose.Schema(
  {
    id: Number,
    title: String,
    items: [ItemSchema],
  },
  {
    _id: false,
  }
);

// Main working hours schema
const WorkingHoursSchema = new mongoose.Schema({
  sections: [SectionSchema],
});

// Export existing model or create a new model
export default mongoose.models.WorkingHours ||
  mongoose.model("WorkingHours", WorkingHoursSchema);