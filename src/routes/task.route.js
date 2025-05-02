const express = require("express");

const {
  createTask,
  getTaskById,
  getTasksByUser,
  updateTask,
  updateTaskStatus,
  deleteTask,
} = require("../controllers/task.controller");

const router = express.Router();

router.post("/create", createTask);

router.get("/user-id/:userId", getTasksByUser);
router.get("/task-id/:taskId", getTaskById);

router.put("/update/:taskId", updateTask);
router.put("/status/:taskId", updateTaskStatus);

router.delete("/delete/:taskId", deleteTask);

module.exports = router;
