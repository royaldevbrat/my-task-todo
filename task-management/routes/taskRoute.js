const router = require("express").Router();

const tasks = require("../controllers/taskController");

router.post("/task", (req, res) => {
  tasks
    .AddTask(req.body)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.json({ error: "Unable to save the task" });
    });
});

router.get("/tasks", (req, res) => {
  tasks
    .GetAllTasks()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.json({ error: "Unable to fetch tasks" });
    });
});

router.get("/tasks/filter", (req, res) => {
  let query = {};
  if (req.query.status && req.query.status !== "all")
    query = { status: req.query.status };
  const limit = req.query.limit || 10;
  const skip = req.query.skip || 0;
  const sort = req.query.sort === "desc" ? 1 : -1;
  tasks
    .GetTasks(query, sort, limit, skip)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.json({ error: "Unable to fetch tasks" });
    });
});

router.get("/task/:id", (req, res) => {
  tasks
    .GetTask(req.params.id)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.json({ error: "Unable to fetch task" });
    });
});

router.put("/task/:id", (req, res) => {
  tasks
    .UpdateTask(req.params.id, req.body)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.json({ error: "Unable to update the task" });
    });
});

router.delete("/task/:id", (req, res) => {
  tasks
    .DeleteTask(req.params.id)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.json({ error: "Unable to delete the task" });
    });
});

module.exports = router;
