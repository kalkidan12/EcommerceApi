import { UserController } from "../controllers/user.contoller";
import express from "express";
const router = express.Router();
const controller = new UserController();
router.post("/signup", controller.userSignup);
router.get("/alluser", controller.getAllUser);
router.get("/oneuser/:id", controller.getOneUser);
router.put("/updateuser/:id", controller.updatetUser);
router.delete("/deleteuser/:id", controller.deletetUser);
router.delete("/deletealluser/", controller.deletetAllUser);

export default router;
