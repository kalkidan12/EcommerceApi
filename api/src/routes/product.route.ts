import { ProductController } from "../controllers/product.controller";
import express from "express";
const router = express.Router();
const controller = new ProductController();
router.post("/addproduct", controller.addProduct);
router.get("/allproduct", controller.getAllProduct);
router.get("/oneproduct/:id", controller.getOneProduct);
router.put("/updateproduct/:id", controller.updatetProduct);
router.delete("/deleteproduct/:id", controller.deletetProduct);
router.delete("/deleteallproduct/", controller.deletetAllProduct);

export default router;
