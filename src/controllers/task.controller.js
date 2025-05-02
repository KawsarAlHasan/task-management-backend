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

// Get a single task by ID
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

// update Task
exports.updateTask = async (req, res) => {
  try {
    const { description, date, user, category } = req.body;
    const taskId = req.params.taskId;

    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    if (description !== undefined) task.description = description;
    if (date !== undefined) task.date = date;
    if (user !== undefined) task.user = user;
    if (category !== undefined) task.category = category;

    const updatedTask = await task.save();

    res.status(200).send({
      success: true,
      message: "Task Updated Successfully",
      task: updatedTask,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// update Task Status
exports.updateTaskStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const taskId = req.params.taskId;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Status is required",
      });
    }

    const validStatuses = ["Ongoing", "Pending", "Collaborative", "Done"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value",
        validStatuses: validStatuses,
      });
    }

    const task = await Task.findByIdAndUpdate(taskId, { status });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Task Status Updated Successfully",
      task: task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// delete Task
exports.deleteTask = async (req, res) => {
  try {
    const taskId = req.params.taskId;

    const deletedTask = await Task.findByIdAndDelete(taskId);

    if (!deletedTask) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Task Deleted Successfully",
      deletedTask: deletedTask,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
