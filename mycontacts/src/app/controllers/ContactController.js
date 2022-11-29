const ContactRepository = require("../repositories/ContactRepository");

class ContactController {
	async index(req, res) {
		//listar tudo
		const contacts = await ContactRepository.findAll();

		res.json(contacts);
	}

	async show(req, res) {
		//obter um registro
		const { id } = req.params;
		const contact = await ContactRepository.findById(id);

		if (!contact) {
			// 404: Not found
			return res.status(404).json({ error: "User not found" });
		}

		res.json(contact);
	}

	async store(req, res) {
		const { name, email, phone, category_id } = req.body;

		if(!name || !email){
			return res.status(400).json({ error: "Name and email are required" });
		}

		const contactExists = await ContactRepository.findByEmail(email);

		if (contactExists) {
			// 400: Bad request
			return res.status(400).json({ error: "This email is already been taken" });
		}

		const contact = await ContactRepository.create(
			{ name, email, phone, category_id }
		);

		res.json(contact);
	}

	update() {

	}

	async delete(req, res) {
		const { id } = req.params;
		const contact = await ContactRepository.findById(id);

		if (!contact) {
			// 404: Not found
			return res.status(404).json({ error: "User not found" });
		}

		await ContactRepository.delete(id);
		//204: No content
		res.sendStatus(204);
	}
}

//singleton
module.exports = new ContactController();
