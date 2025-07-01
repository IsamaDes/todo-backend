const Todo = require("../models/Todo");

exports.getTodos = async (req, res, next) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    next(err);
  }
};

exports.createTodo = async (req, res, next) => {
  try {
    const { title, priority, dueDate } = req.body;
    const todo = await Todo.create({ title, priority, dueDate });
    res.status(201).json(todo);
  } catch (err) {
    next(err);
  }
};

exports.updateTodo = async (req, res, next) => {
  try {
    const { completed, priority } = req.body;
    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      { completed, priority },
      { new: true }
    );
    if (!todo) {
      res.status(404);
      throw new Error("Todo not found");
    }
    res.json(todo);
  } catch (err) {
    next(err);
  }
};

exports.deleteTodo = async (req, res, next) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) {
      res.status(404);
      throw new Error("Todo not found");
    }
    res.json({ message: "Todo deleted" });
  } catch (err) {
    next(err);
  }
};
