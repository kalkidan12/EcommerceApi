import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { UserInterface } from "./../utils/types/userTypes";
import { UserService } from "../services/users.serveice";
import { Request, Response, NextFunction } from "express";

const userService = new UserService();

export class UserController {
	//signup user
	public async userSignup(req: Request, res: Response) {
		const newUser: UserInterface = req.body;
		if (
			newUser == null ||
			newUser.email == null ||
			newUser.fname == null ||
			newUser.lname == null ||
			newUser.password == null
		) {
			return res.status(400).json({ message: "All field are required!" });
		}
		try {
			const existUser = await userService.findByEmail(newUser.email);
			if (existUser)
				return res.status(400).json({
					message: `user with email ${existUser.email} already exist!`,
				});
			await userService.saveUser(newUser);
			const token = jwt.sign({ email: newUser.email }, "SECRETE KEY", {
				expiresIn: 36000,
			});
			if (!token)
				return res.status(500).json({
					message: "error while generaiting token",
				});
			return res.status(500).json({
				message: "signup successfully!",
				user: {
					fname: newUser.fname,
					lname: newUser.fname,
					email: newUser.email,
				},
				token,
			});
		} catch (error) {
			return res.status(500).json({
				message: error,
			});
		}
	}
	// get all users
	public async getAllUser(req: Request, res: Response) {
		const users = await userService.getAllUser();
		if (!users) return res.status(404).json({ message: "no users found!" });
		return res.status(200).json({ users });
	}
	// get single users
	public async getOneUser(req: Request, res: Response) {
		const _id = req.params.id;
		const user = await userService.getOneUser(_id);
		if (!user) return res.json({ message: "users with this id not found!" });
		return res.status(200).json({ user });
	}
	// update user
	public async updatetUser(req: Request, res: Response, next: NextFunction) {
		const _id = req.params.id;
		const toUpdate: UserInterface = req.body;
		const user = await userService.getOneUser(_id);
		if (!user)
			return res.status(404).json({ message: "users with this id not found!" });

		const updated = await userService.updateUser(_id, toUpdate);
		if (!updated)
			res
				.status(500)
				.json({ message: `user with email ${user.email} not updated` });

		return res
			.status(200)
			.json({ message: `user with email ${user.email} updated` });
	}
	// delete user
	public async deletetUser(req: Request, res: Response, next: NextFunction) {
		const _id = req.params.id;
		const user = await userService.getOneUser(_id);
		if (!user)
			return res.status(404).json({ message: "users with this id not found!" });
		await userService.deleteUser(_id);
		res.status(200).json({ message: `user with id ${_id} deleted` });
	}
	public async deletetAllUser(req: Request, res: Response, next: NextFunction) {
		const users = await userService.getAllUser();
		if (users.length > 0) {
			await userService.deleteAllUser();
			return res.status(200).json({ message: `all users are deleted` });
		}
		return res.status(400).json({ message: `document is already empty!` });
	}
}
