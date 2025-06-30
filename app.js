const express = require("express");
const cors = require("cors");
const todoRoutes = require("./routes/todoRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/todos", todoRoutes);
app.use(notFound);
app.use(errorHandler);

module.exports = app;
