const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema(
  {
    name: { type: "string", required: true },
    description: { type: "string", required: false },
    status: { type: "string", required: true, default: "todo" },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
