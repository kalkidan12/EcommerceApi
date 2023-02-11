export interface UserInterface {
	fname: String;
	lname: String;
	email: String;
	password: String;
	isAdmin: boolean;
}
export interface ProductInterface {
	title: String;
	description: String;
	price: Number;
	quantity: Number;
	colors: [String];
}
