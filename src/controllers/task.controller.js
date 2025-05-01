const Task = require("../models/task.model");

// Create Task
exports.createTask = async (req, res, next) => {
  try {
    const { description, date, status, user, category } = req.body;
    if (!user) {
      return res.status(401).json({
        success: false,
        error: "Please provide user field in body",
      });
    }

    const data = await Task.create({
      description,
      date,
      status,
      user,
      category,
    });

    res.status(201).json({
      status: true,
      message: "Task Create Successully",
      data: data,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// Get a single task by ID (with user info)
exports.getTaskById = async (req, res) => {
  try {
    const taskId = req.params.taskId;

    const task = await Task.findById(taskId).populate("category", "name");

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Get Single Task by id",
      data: task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// Get all tasks for a specific user with filtering
exports.getTasksByUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { date, status, category } = req.query;

    const filter = { user: userId };

    if (date) {
      // For exact date match
      const startDate = new Date(date);
      const endDate = new Date(date);
      endDate.setDate(endDate.getDate() + 1);

      filter.date = {
        $gte: startDate,
        $lt: endDate,
      };
    }

    // Add status filter if provided
    if (status) {
      filter.status = status;
    }

    // Add category filter if provided
    if (category) {
      filter.category = category;
    }

    const tasks = await Task.find(filter)
      .populate("category", "name")
      .populate("user", "firstName lastName");

    if (!tasks || tasks.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No tasks found with the given filters",
      });
    }

    res.status(200).json({
      success: true,
      message: "Tasks retrieved successfully",
      data: tasks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
