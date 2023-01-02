const db = require("../../database");

class ContactRepository {
	async findAll(orderBy = "ASC") {
		const direction = orderBy.toUpperCase === "DESC" ? "DESC" : "ASC";
		const rows = await db.query(`
			SELECT contacts.*, catagories.name AS category_name
			FROM contacts
			LEFT JOIN catagories ON catagories.id = contacts.category_id
			ORDER BY name ${direction}
		`);
		return rows;
	}

	async findById(id) {
		const [rows] = await db.query(`
			SELECT contacts.*, catagories.name AS category_name
			FROM contacts
			LEFT JOIN catagories ON catagories.id = contacts.category_id
			WHERE contacts.id = $1
		`, [id]);
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

	async update(id, contact) {
		const row = await db.query(`
			UPDATE contacts
			SET name = $1, email = $2, phone = $3, category_id = $4
			WHERE id = $5
		`, [contact.name, contact.email, contact.phone, contact.category_id, id]);
		return row;
	}

	async delete(id) {
		const deleteOp = await db.query("DELETE FROM contacts WHERE id = $1", [id]);
		return deleteOp;
	}
}

module.exports = new ContactRepository();
