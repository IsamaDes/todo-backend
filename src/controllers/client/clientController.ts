// src/controllers/client/clientController.ts
import type { Request, Response } from "express";
import { fetchClientProfile } from "../../services/clientService.js";

/**
 * GET /api/client/profile
 * Returns the logged-in client's profile
 */
const getClientProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id; 
    const client = await fetchClientProfile(userId);

    res.status(200).json({
      success: true,
      data: client,
    });
  } catch (error: any) {
    console.error("Error fetching client profile:", error);
    res.status(404).json({ message: error.message });
  }
};

export default getClientProfile;
