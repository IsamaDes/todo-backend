import Todo from "../../models/Todo.js";
import type { Request, Response, NextFunction } from "express";
import { getPagination } from "../../utils/paginationHelper.js";

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
export async function getTodos (req: Request, res: Response, next: NextFunction){
    try {

        if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Unauthorized: user not found" });
    }
      const todos = await Todo.find({userId: req.user._id}) || [];
      res.json(todos);
    } catch (err) {
      next(err);
    }
  };


  /**
 * POST /api/tasks/search
 * Body: { query, page?, limit? }
 * Searches tasks by title or description
 */

  export const searchTodos = async (req: Request, res: Response) => {
  try {
    const { query = "", page = 1, limit = 10 } = req.body;
    const { skip, pageSize } = getPagination(Number(page), Number(limit));

    //return search todos from this Users account
    const searchQuery = {
      user: req.user?._id,
      $or: [
        { title: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
      ],
    };

    const [tasks, total] = await Promise.all([
      Todo.find(searchQuery).skip(skip).limit(pageSize).sort({ createdAt: -1 }),
      Todo.countDocuments(searchQuery),
    ]);

    res.status(200).json({
      success: true,
      data: tasks,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (error: any) {
    console.error("Search error:", error);
    res.status(500).json({ message: "Server error during search" });
  }
};



/**
 * POST /api/tasks/filter
 * Body: { status?, priority?, startDate?, endDate?, page?, limit? }
 */
export const filterTodos = async (req: Request, res: Response) => {
  try {
    const { status, priority, startDate, endDate, page = 1, limit = 10 } = req.body;
    const { skip, pageSize } = getPagination(Number(page), Number(limit));

     if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const filter: Record<string, any> = {user: req.user._id};

    if (status) filter.status = status;
    if (priority) filter.priority = priority;

    if (startDate || endDate) {
      filter.createdAt = {};
      if (startDate) filter.createdAt.$gte = new Date(startDate);
      if (endDate) filter.createdAt.$lte = new Date(endDate);
    }

    const [tasks, total] = await Promise.all([
      Todo.find(filter).skip(skip).limit(pageSize).sort({ createdAt: -1 }),
      Todo.countDocuments(filter),
    ]);

    res.status(200).json({
      success: true,
      data: tasks,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (error: any) {
    console.error("Filter error:", error);
    res.status(500).json({ message: "Server error during filtering" });
  }
};



