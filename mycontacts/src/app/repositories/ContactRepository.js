const { v4 } = require("uuid");

let contacts = [
	{
		id: v4(),
		name: "Fernando",
		email: "fernando.v.garcia@aubay.pt",
		phone: "123456789",
		category_id: v4()
	},
	{
		id: v4(),
		name: "José",
		email: "jose.v.garcia@aubay.pt",
		phone: "123456789",
		category_id: v4()
	}
];

class ContactRepository {
	findAll() {
		return new Promise((resolve) => resolve(contacts));
	}

	delete(id) {
		return new Promise((resolve) => {
			contacts = contacts.filter(item => item.id !== id);
			resolve();
		});
	}

	findById(id) {
		return new Promise((resolve) => resolve(
			contacts.find(item => item.id === id)
		));
	}

	findByEmail(email) {
		return new Promise((resolve) => resolve(
			contacts.find(item => item.email === email)
		));
	}

	create(contact) {
		return new Promise((resolve) => {
			contacts.push(
				{
					id: v4(),
					...contact
				}
			);
			resolve();
		});
	}
}

module.exports = new ContactRepository();
