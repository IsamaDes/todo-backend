import express from "express";
import protect from "../middleware/authMiddleware.js";
import {getTodos, searchTodos, filterTodos} from "../controllers/todo/getTodoController.js";
import createTodo from "../controllers/todo/createTodoController.js";
import updateTodo from "../controllers/todo/updateTodoController.js";
import deleteTodo from "../controllers/todo/deleteTodoController.js";
import authorizeRoles from "../middleware/roleMiddleWare.js";

const router = express.Router();

router.post("/search", protect, searchTodos);
router.post("/filter", protect, filterTodos);
router.post("/createTodo", protect, createTodo);
router.put("/updateTodo", protect, updateTodo);
router.get("/getTodos/:id", protect, getTodos);
router.delete("/delete/:id", protect, authorizeRoles("admin"), deleteTodo);

export default router;

