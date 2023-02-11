import { Schema, model } from "mongoose";
const UserSchema = new Schema(
	{
		fname: String,
		lname: String,
		email: { type: String, unique: true },
		password: { type: String },
		isAdmin: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: {
			createdAt: Date(),
			updatedAt: Date(),
		},
	},
);

export const UserModel = model("User", UserSchema);
