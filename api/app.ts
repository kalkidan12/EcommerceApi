import express, { Request, Response, Application } from "express";
// import cors from "cors";
import { DevConfig } from "./src/env/development";
import { DbConnection } from "./src/database/dbConnection";
import userRoute from "./src/routes/users.route";
import productRoute from "./src/routes/product.route";
import sessionRoute from "./src/routes/session.route";
export class App {
	public app: Application;
	public port: number;
	public config = new DevConfig();

	constructor() {
		this.app = express();
		this.port = this.config.PORT;
		this.initializeMiddleware();
		this.initializeDatabase();
		this.intializeUserRoute();
	}

	public intializeUserRoute() {
		this.app.use("/api/user", userRoute);
		this.app.use("/api/session", sessionRoute);
		this.app.use("/api/product", productRoute);
	}
	public initializeMiddleware() {
		this.app.use(express.json());
	}
	public initializeDatabase() {
		return new DbConnection().mongooseConnection();
	}
	public listen() {
		this.app.listen(this.port, () => {
			console.log(`server is running on port ${this.port}`);
		});
	}
}
