import { ProductModel } from "../models/product.model";
import { ProductInterface } from "../utils/types/userTypes";

export class ProductService {
	public async findByTitle(title: String) {
		return await ProductModel.findOne({ title });
	}

	//save user
	public async addProduct(newProduct: ProductInterface) {
		return await ProductModel.create(newProduct);
	}

	//get All user
	public async getAllProduct() {
		return await ProductModel.find({});
	}

	//get one user
	public async getOneProduct(_id: String) {
		return await ProductModel.findById(_id);
	}

	//update user
	public async updateProduct(_id: String, updatedProduct: ProductInterface) {
		return await ProductModel.findByIdAndUpdate(_id, updatedProduct);
	}

	//delete user
	public async deleteProduct(_id: String) {
		return await ProductModel.findByIdAndDelete({ _id });
	}

	//delete all user
	public async clearAllProduct() {
		return await ProductModel.deleteMany({});
	}
}
