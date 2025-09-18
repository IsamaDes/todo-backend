const Todo = require("../../models/Todo");


/**
 * @swagger
 * /auth/todos/{id}:
 *   delete:
 *     summary: Delete a todo by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Todo deleted
 */
async function deleteTodo (req, res, next){
  try {
    const todo = await Todo.findByIdAndDelete({_id: req.params.id, userId: red.user._id});
    if (!todo) {
      res.status(404);
      throw new Error("Todo not found");
    }
    res.json({ message: "Todo deleted" });
  } catch (err) {
    next(err);
  }
};

module.exports = deleteTodo;