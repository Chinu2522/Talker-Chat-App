import { Router } from "express";
import { verifyToken } from "../middlewares/AuthMiddleware.js";
import { createChannel } from "../controllers/ChannelController.js";

const channnelRoutes = Router();

channnelRoutes.post("/create-channel", verifyToken, createChannel);

export default channnelRoutes;