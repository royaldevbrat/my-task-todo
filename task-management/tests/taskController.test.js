
const Task = require("../models/taskModel");
const mongoose = require("mongoose");
require("dotenv").config();

const {
  AddTask,
  GetAllTasks,
  GetTask,
  UpdateTask,
  DeleteTask,
} = require("../controllers/taskController");

describe("Task API", () => {
  const taskNameAdd = "unit-test: task 1";
  const taskNameUpdate = "unit-test: task updated";
  let taskId;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await Task.deleteMany({ name: { $regex: /^unit-test:/, $options: "i" } });
    await mongoose.disconnect();
  });

  describe("AddTask", () => {
    test("should add a new task", async () => {
      const taskData = {
        name: taskNameAdd,
      };
      const response = await AddTask(taskData);

      expect(response).toHaveProperty("_id");
      expect(response).toHaveProperty("name");
      expect(response.name).toBe(taskNameAdd);

      taskId = response._id.toString();
    });
  });

  describe("GetAllTasks", () => {
    test("should get all tasks", async () => {
      const response = await GetAllTasks();

      expect(Array.isArray(response)).toBeTruthy();
      expect(response.length).toBe(1);
    });
  });

  describe("GetTask", () => {
    test("should get a specific task", async () => {
      const response = await GetTask(taskId);

      expect(response.name).toBe(taskNameAdd);
      expect(response._id.toString()).toBe(taskId);
    });
  });

  describe("UpdateTask", () => {
    test("should update a task", async () => {
      const updatedData = {
        name: taskNameUpdate,
      };
      const response = await UpdateTask(taskId, updatedData);

      expect(response).toHaveProperty("_id");
      expect(response._id.toString()).toBe(taskId);
      expect(response).toMatchObject(updatedData);
    });
  });

  describe("DeleteTask", () => {
    test("should delete a task", async () => {
      const response = await DeleteTask(taskId);

      expect(response).toHaveProperty("_id");
      expect(response._id.toString()).toBe(taskId);
    });
  });
});

  