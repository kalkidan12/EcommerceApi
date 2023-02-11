import { ProductService } from "./../services/product.service";
import jwt from "jsonwebtoken";
import { ProductInterface } from "./../utils/types/userTypes";
import { Request, Response, NextFunction } from "express";

const productService = new ProductService();

export class ProductController {
	//signup user
	public async addProduct(req: Request, res: Response) {
		const newProduct: ProductInterface = req.body;
		if (
			newProduct == null ||
			newProduct.title == null ||
			newProduct.description == null ||
			newProduct.price == null ||
			newProduct.quantity == null
		) {
			return res.status(400).json({ message: "All field are required!" });
		}
		try {
			await productService.addProduct(newProduct);
			return res.status(201).json({
				message: `product ${newProduct.title} added successfully!`,
				product: newProduct,
			});
		} catch (error) {
			return res.status(500).json({
				message: error,
			});
		}
	}
	// get all products
	public async getAllProduct(req: Request, res: Response) {
		const products = await productService.getAllProduct();
		if (!products)
			return res.status(404).json({ message: "no product found!" });
		return res.status(200).json({ products });
	}
	// get single product
	public async getOneProduct(req: Request, res: Response) {
		const _id = req.params.id;
		const product = await productService.getOneProduct(_id);
		if (!product)
			return res.json({ message: "product with this id not found!" });
		return res.status(200).json({ product });
	}
	// update user
	public async updatetProduct(req: Request, res: Response, next: NextFunction) {
		const _id = req.params.id;
		const toUpdate: ProductInterface = req.body;
		const product = await productService.getOneProduct(_id);
		if (!product)
			return res
				.status(404)
				.json({ message: "uproduct with this id not found!" });

		const updated = await productService.updateProduct(_id, toUpdate);
		if (!updated)
			res
				.status(500)
				.json({ message: `user with email ${product.title} not updated` });

		return res
			.status(200)
			.json({ message: `user with email ${product.title} updated` });
	}
	// delete user
	public async deletetProduct(req: Request, res: Response, next: NextFunction) {
		const _id = req.params.id;
		const product = await productService.getOneProduct(_id);
		if (!product)
			return res
				.status(404)
				.json({ message: "products with this id not found!" });
		await productService.deleteProduct(_id);
		res.status(200).json({ message: `product with id ${_id} deleted` });
	}
	public async deletetAllProduct(
		req: Request,
		res: Response,
		next: NextFunction,
	) {
		const products = await productService.getAllProduct();
		if (products.length > 0) {
			await productService.clearAllProduct();
			return res.status(200).json({ message: `all products are deleted` });
		}
		return res.status(400).json({ message: `document is already empty!` });
	}
}
