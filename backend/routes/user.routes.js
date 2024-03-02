import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getUserFromSidebar } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/getUserSidebar", protectRoute, getUserFromSidebar);

export default router;
