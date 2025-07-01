const express = require("express");
const {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/todoController");

const router = express.Router();

router.route("/").get(getTodos).post(createTodo);

router.route("/:id").put(updateTodo).delete(deleteTodo);

module.exports = router;
