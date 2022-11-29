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
	async findAll(orderBy = "ASC") {
		const direction = orderBy.toUpperCase === "DESC" ? "DESC" : "ASC";
		const rows = await db.query(`SELECT * FROM contacts ORDER BY name ${direction}`);
		return rows;
	}

	delete(id) {
		return new Promise((resolve) => {
			contacts = contacts.filter(item => item.id !== id);
			resolve();
		});
	}

	async findById(id) {
		const [rows] = await db.query("SELECT * FROM contacts WHERE id = $1", [id]);
		return rows;
	}

	async findByEmail(email) {
		const [rows] = await db.query("SELECT * FROM contacts WHERE email = $1", [email]);
		return rows;
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
