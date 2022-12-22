const ContactRepository = require("../repositories/ContactRepository");

class ContactController {
	async index(req, res) {
		//listar tudo
		const { orderBy } = req.query;
		const contacts = await ContactRepository.findAll(orderBy);

		res.json(contacts);
	}

	async show(req, res) {
		//obter um registro
		const { id } = req.params;
		const contact = await ContactRepository.findById(id);

		if (!contact) {
			// 404: Not found
			return res.status(404).json({ error: "Contact not found" });
		}

		res.json(contact);
	}

	async store(req, res) {
		const { name, email, phone, category_id } = req.body;

		if (!name || !email) {
			return res.status(400).json({ error: "Name and email are required" });
		}

		const contactExists = await ContactRepository.findByEmail(email);

		if (contactExists) {
			// 400: Bad request
			return res.status(400).json({ error: "This email is already in use" });
		}

		const contact = await ContactRepository.create(
			{ name, email, phone, category_id }
		);

		res.status(201).json(contact);
	}

	async update(req, res) {
		const { id } = req.params;
		const { name, email, phone, category_id } = req.body;

		const contactExists = await ContactRepository.findById(id);

		if (!contactExists) {
			// 400: Bad request
			return res.status(404).json({ error: "Contact not found" });
		}

		if (!name || !email) {
			return res.status(400).json({ error: "Name and email are required" });
		}

		const contactByEmail = await ContactRepository.findByEmail(email);

		if (contactByEmail && contactByEmail.id !== id) {
			// 400: Bad request
			return res.status(400).json({ error: "This email is already in use" });
		}

		const updatedContact = await ContactRepository.update(id, {
			name,
			email,
			phone,
			category_id
		});

		res.json(updatedContact);
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
