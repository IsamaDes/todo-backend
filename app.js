const express = require("express");
const cors = require("cors");
const todoRoutes = require("./routes/todoRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

const authRoutes = require("./routes/auth");
const authMiddleware = require("./middleware/auth");

const app = express();
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(
  cors({
    origin: [
      "https://todo-frontend-rosy-five.vercel.app",
      "http://localhost:3000",
    ],
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use(express.json());
app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/api/auth", authRoutes);
app.get("/api/profile", authMiddleware, async (req, res) => {
  res.json({ profile: req.user });
});
app.use("/api/todos", todoRoutes);

app.use(errorHandler);
app.use(notFound);

module.exports = app;
