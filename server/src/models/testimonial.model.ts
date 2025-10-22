import mongoose from "mongoose";

// --------------- Testimonial -------------
const testimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  avatar: { type: String },
  profession: { type: String },
  rating: { type: Number, required: true },
  review: { type: String, required: true }
}, { timestamps: true });

const Testimonial = mongoose.models.Testimonial || mongoose.model("Testimonial", testimonialSchema);
export default Testimonial;
