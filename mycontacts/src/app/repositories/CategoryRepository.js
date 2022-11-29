const db = require("../../database");

class CategoryRepository {
	async findAll(orderBy = "ASC") {
		const direction = orderBy.toUpperCase === "DESC" ? "DESC" : "ASC";
		const rows = await db.query(`SELECT * FROM catagories ORDER BY name ${direction}`);
		return rows;
	}

	async create(category) {
		const [row] = await db.query(`
			INSERT INTO catagories(name)
			VALUES($1)
			RETURNING *
		`, [category.name]);

		return row;
	}
}

module.exports = new CategoryRepository();
