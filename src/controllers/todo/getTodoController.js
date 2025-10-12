const Todo = require("../../models/Todo");

/**
 * @swagger
 * /auth/todos:
 *   get:
 *     summary: Get all todos for the logged-in user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user todos
 */
async function getTodos (req, res, next){
    try {
      const todos = await Todo.find({userId: req.user._id}) || [];
      res.json(todos);
    } catch (err) {
      next(err);
    }
  };

  module.exports = getTodos;