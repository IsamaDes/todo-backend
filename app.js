const express = require("express");
const cors = require("cors");
const todoRoutes = require("./routes/todoRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const app = express();
app.use(
  cors({
    origin: "https://todo-frontend-rosy-five.vercel.app",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);
app.use(express.json());
app.get("/", (req, res) => {
  res.send("API is running");
});
app.use("/api/todos", todoRoutes);
app.use(notFound);
app.use(errorHandler);

module.exports = app;
