const Category = require("../models/category.modal");

// Create Category
exports.createCategory = async (req, res, next) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        error: "Please provide 'name' field in the body",
      });
    }

    const categoryData = await Category.create({ name });

    res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: categoryData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// get all category
exports.getAllCategory = async (req, res, next) => {
  try {
    const result = await Category.find({});

    res.status(200).json({
      success: true,
      message: "Get All Category",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
