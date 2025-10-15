// src/services/client/clientService.ts
import User from "../models/User.js";

export const fetchClientProfile = async (userId: string) => {
  if (!userId) throw new Error("User ID not provided");

  const client = await User.findById(userId).select("-password");

  if (!client) throw new Error("Client not found");

  return client;
};
