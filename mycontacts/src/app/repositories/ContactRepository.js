const { v4 } = require("uuid");
const db = require("../../database");

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

	async create(contact) {
		const [row] = await db.query(`
			INSERT INTO contacts(name, email, phone, category_id)
			VALUES($1, $2, $3, $4)
			RETURNING *
		`, [contact.name, contact.email, contact.phone, contact.category_id]);

		return row;
	}

	update(id, contact) {
		return new Promise((resolve) => {
			const updatedContact = {
				id,
				...contact
			};

			contacts = contacts.map(item => (
				item.id === id ? updatedContact : item
			));

			resolve(updatedContact);
		});
	}
}

module.exports = new ContactRepository();
