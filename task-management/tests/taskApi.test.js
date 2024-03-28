
  const request = require("supertest");
  const express = require("express");
  const router = require("../routes/taskRoute");
  const tasks = require("../controllers/taskController");
  
  jest.mock("../controllers/taskController");
  
  const app = express();
  app.use(express.json());
  app.use(router);
  
  describe("API Endpoints", () => {
    beforeAll(() => {
      jest.clearAllMocks();
    });
  
    describe("Successful Cases", () => {
      test("POST /task", async () => {
        const mockTask = { name: "Task 1" };
        tasks.AddTask.mockResolvedValue(mockTask);
  
        const response = await request(app).post("/task").send(mockTask);
  
        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockTask);
      });
  
      test("GET /tasks", async () => {
        const mockTasks = [{ name: "Task 1" }, { name: "Task 2" }];
        tasks.GetAllTasks.mockResolvedValue(mockTasks);
  
        const response = await request(app).get("/tasks");
  
        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockTasks);
      });
  
      test("GET /task/:id", async () => {
        const taskId = "123";
        const mockTask = { _id: taskId, name: "Task 1" };
        tasks.GetTask.mockResolvedValue(mockTask);
  
        const response = await request(app).get(`/task/${taskId}`);
  
        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockTask);
      });
  
      test("PUT /task/:id", async () => {
        const taskId = "123";
        const updatedTask = { name: "Updated Task" };
        tasks.UpdateTask.mockResolvedValue(updatedTask);
  
        const response = await request(app)
          .put(`/task/${taskId}`)
          .send(updatedTask);
  
        expect(response.status).toBe(200);
        expect(response.body).toEqual(updatedTask);
      });
  
      test("DELETE /task/:id", async () => {
        const taskId = "123";
        const deletedTask = { _id: taskId, name: "Task 1" };
        tasks.DeleteTask.mockResolvedValue(deletedTask);
  
        const response = await request(app).delete(`/task/${taskId}`);
  
        expect(response.status).toBe(200);
        expect(response.body).toEqual(deletedTask);
      });
    });
  
    describe("Error Cases", () => {
      test("POST /task - Error case", async () => {
        const mockError = new Error("Failed to add task");
        tasks.AddTask.mockRejectedValue(mockError);
  
        const mockTask = { name: "Task 1" };
        const response = await request(app).post("/task").send(mockTask);
  
        expect(response.body).toEqual({ error: "Unable to save the task" });
      });
  
      test("GET /tasks - Error case", async () => {
        const mockError = new Error("Failed to get tasks");
        tasks.GetAllTasks.mockRejectedValue(mockError);
  
        const response = await request(app).get("/tasks");
  
        expect(response.body).toEqual({ error: "Unable to fetch tasks" });
      });
  
      test("GET /task/:id - Error case", async () => {
        const taskId = "123";
        const mockError = new Error("Failed to get task");
        tasks.GetTask.mockRejectedValue(mockError);
  
        const response = await request(app).get(`/task/${taskId}`);
  
        expect(response.body).toEqual({ error: "Unable to fetch task" });
      });
  
      test("PUT /task/:id - Error case", async () => {
        const taskId = "123";
        const updatedTask = { name: "Updated Task" };
        const mockError = new Error("Failed to update task");
        tasks.UpdateTask.mockRejectedValue(mockError);
  
        const response = await request(app)
          .put(`/task/${taskId}`)
          .send(updatedTask);
  
        expect(response.body).toEqual({ error: "Unable to update the task" });
      });
  
      test("DELETE /task/:id - Error case", async () => {
        const taskId = "123";
        const mockError = new Error("Failed to delete task");
        tasks.DeleteTask.mockRejectedValue(mockError);
  
        const response = await request(app).delete(`/task/${taskId}`);
  
        expect(response.body).toEqual({ error: "Unable to delete the task" });
      });
    });
  });
  
  