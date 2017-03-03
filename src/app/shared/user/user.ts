export class User {
	username: string;
	password: string;
	token: string;
	firstName: string;
	middleName: string;
	lastName: string;
	email: string;
	nric: string;
	gender: string;
	isStaff: boolean;
	staffPin: string;
	address: string;
	country: string;
	profilePhoto: string;
	signature: string;
	constructor(public user: string = '', public name: string = '', public roles: string[] = new Array<string>()) {}
}
export class Customer extends User {
	customerId: string;
	customer_type: string;
}