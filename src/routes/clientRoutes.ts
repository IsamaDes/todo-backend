import express from "express";
const router = express.Router();
import protect from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleWare.js";
import getClientProfile from "../controllers/client/clientController.js";



// Clients can access their profile
router.get(
  "/profile/me",
  protect,                
  authorizeRoles("client", "admin"), 
  getClientProfile
);

export default router;
