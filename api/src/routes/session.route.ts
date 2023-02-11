import { SessionController } from "../controllers/session.controller";
import express from "express";
const router = express.Router();
const controller = new SessionController();
router.post("/login", controller.userLogin);

export default router;
