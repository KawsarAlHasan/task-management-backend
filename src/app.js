const express = require("express");

const app = express();
app.use(express.json());

// router
app.use("/api/v1/user", require("./routes/user.route"));
app.use("/api/v1/forgot", require("./routes/forgot.password.route"));

app.use("/api/v1/category", require("./routes/category.route"));
app.use("/api/v1/task", require("./routes/task.route"));

app.get("/", (req, res) => {
  res.status(200).send("Task Management is working");
});

module.exports = app;
