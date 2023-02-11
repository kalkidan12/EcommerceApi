import mongoose, { ConnectOptions } from "mongoose";
import { DevConfig } from "../env/development";
export class DbConnection {
	config = new DevConfig();

	public async mongooseConnection() {
		try {
			const connected = await mongoose.connect(this.config.MONGO_URI, {
				useNewUrlParser: true,
				useUnifiedTopology: true,
				autoIndex: true,
			} as ConnectOptions);
			if (connected) return console.log("Database connected!");
		} catch (error) {
			console.log(`not connected to db ${error}`);
		}
	}
}
