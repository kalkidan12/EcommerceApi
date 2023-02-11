import { Schema, model } from "mongoose";
const ProductSchema = new Schema(
	{
		title: String,
		description: String,
		price: Number,
		image: String,
		quantity: Number,
		colors: [String],
	},
	{
		timestamps: {
			createdAt: Date(),
			updatedAt: Date(),
		},
	},
);

export const ProductModel = model("Product", ProductSchema);
