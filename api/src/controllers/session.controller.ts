import { UserService } from "./../services/users.serveice";
import { SessionService } from "./../services/session.service";
import { UserInterface } from "./../utils/types/userTypes";
import { Request, Response, NextFunction } from "express";
const jwt = require("jsonwebtoken");
const sessionService = new SessionService();
const userService = new UserService();

export class SessionController {
	//signin user
	public async userLogin(req: Request, res: Response, next: NextFunction) {
		const user: UserInterface = req.body;
		if (user == null || user.email == null || user.password == null) {
			return res.status(400).json({ message: "All field are required!" });
		}
		try {
			const existUser = await userService.findByEmail(user.email);
			if (!existUser)
				return res.status(400).json({
					message: `user with email ${user.email} does not exist!`,
				});
			const token = jwt.sign({ email: user.email }, "SECRETE KEY", {
				expiresIn: 36000,
			});
			if (!token)
				return res.status(500).json({
					message: "error while generaiting token",
				});
			return res.status(500).json({
				message: "login successfully!",
				user: {
					email: user.email,
				},
				token,
			});
		} catch (error) {
			return res.status(500).json({
				message: error,
			});
		}
	}
}
