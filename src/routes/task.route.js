const express = require("express");

const {
  createTask,
  getTaskById,
  getTasksByUser,
} = require("../controllers/task.controller");

const router = express.Router();

router.post("/create", createTask);

router.get("/user-id/:userId", getTasksByUser);
router.get("/task-id/:taskId", getTaskById);

module.exports = router;
