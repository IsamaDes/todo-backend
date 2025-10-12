const Todo = require("../../models/Todo");


/**
 * @swagger
 * /auth/todos:
 *   post:
 *     summary: Create a new todo for the logged-in user
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               priority:
 *                 type: string
 *               dueDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Todo created
 */
 async function createTodo(req, res, next){
  try {
    const { title, priority, dueDate } = req.body;
    const todo = await Todo.create({ title, priority, dueDate, userId: req.user._id });
    res.status(201).json(todo);
  } catch (err) {
    next(err);
  }
};

module.exports = createTodo;
