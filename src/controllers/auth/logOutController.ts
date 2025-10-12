
import { Request, Response } from "express";
import logoutUser from "../../services/auth/logOutService.js";


const logoutUserController = async (req: Request, res: Response) => {
 try{
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(204);
    await logoutUser(refreshToken)
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    res.status(200).json({ message: 'Logged out successfully' });


 }catch(err: any){
console.error("Logout error:", err);
    res.status(500).json({ 
      success: false,
      message: err.message || "Logout failed" 
    });
 }
};

export default logoutUserController;