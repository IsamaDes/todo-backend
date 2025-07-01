const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "low",
    },
    dueDate: {
      type: Date,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Todo", TodoSchema);
