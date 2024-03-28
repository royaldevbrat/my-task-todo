const Task = require("../models/taskModel");

const AddTask = (data) => {
  const newTask = new Task(data);
  return newTask.save();
};
const GetAllTasks = () => {
  return Task.find();
};

const GetTasks = async (query, sort, limit, skip) => {
  const totalRecords = await Task.countDocuments(query);
  const tasks = await Task.find(query)
    .sort({ createdAt: sort })
    .limit(limit)
    .skip(skip);
  return { tasks, totalRecords };
};

const GetTask = (id) => {
  return Task.findById(id);
};

const UpdateTask = (id, data) => {
  return Task.findByIdAndUpdate(id, data, { new: true, upsert: true });
};

const DeleteTask = (id) => {
  return Task.findByIdAndDelete(id);
};

module.exports = {
  AddTask,
  GetAllTasks,
  GetTasks,
  GetTask,
  UpdateTask,
  DeleteTask,
};
