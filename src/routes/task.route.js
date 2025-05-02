const express = require("express");

const {
  createTask,
  getTaskById,
  getTasksByUser,
  updateTask,
  updateTaskStatus,
  deleteTask,
} = require("../controllers/task.controller");

const varifyToken = require("../middleware/verify.user.token");

const router = express.Router();

router.post("/create", varifyToken, createTask);

router.get("/my", varifyToken, getTasksByUser);
router.get("/task-id/:taskId", getTaskById);

router.put("/update/:taskId", varifyToken, updateTask);
router.put("/status/:taskId", updateTaskStatus);

router.delete("/delete/:taskId", deleteTask);

module.exports = router;
