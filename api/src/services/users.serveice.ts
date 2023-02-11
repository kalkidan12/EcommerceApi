import mongoose from "mongoose";
import { UserModel } from "../models/users.model";
import { UserInterface } from "../utils/types/userTypes";

export class UserService {
	public async findByEmail(email: String) {
		return await UserModel.findOne({ email });
	}

	//save user
	public async saveUser(newUser: UserInterface) {
		return await UserModel.create(newUser);
	}

	//get All user
	public async getAllUser() {
		return await UserModel.find({});
	}

	//get one user
	public async getOneUser(_id: String) {
		return await UserModel.findById(_id);
	}

	//update user
	public async updateUser(_id: String, updatedUser: UserInterface) {
		return await UserModel.findByIdAndUpdate(_id, updatedUser);
	}

	//delete user
	public async deleteUser(_id: String) {
		return await UserModel.findByIdAndDelete({ _id });
	}

	//delete all user
	public async deleteAllUser() {
		return await UserModel.deleteMany({});
	}
}
