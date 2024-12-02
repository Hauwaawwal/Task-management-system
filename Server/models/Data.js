const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  deadline: { type: Date, required: true },
  priority: { type: String, enum: ["low", "medium", "high"], required: true },
});

const Todo = mongoose.model("Todo", TodoSchema);

module.exports = { Todo };
