const mongoose = require("mongoose");

const TaskSchema = mongoose.Schema({
  description: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  date: {
    type: Date,
  },
  status: {
    type: String,
    enum: ["Ongoing", "Pending", "Collaborative", "Done"],
    default: "Pending",
  },
});

module.exports = mongoose.model("Task", TaskSchema);
