const ContactRepository = require("../repositories/ContactRepository");
const isValidUUID = require("../utils/isValidUuid");

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

		if(!isValidUUID(id)){
			return res.status(400).json({ error: "Invalid contact ID" });
		}

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

		if(category_id && !isValidUUID(category_id)){
			return res.status(400).json({ error: "Invalid category" });
		}

		if(email){
			const contactExists = await ContactRepository.findByEmail(email);
			if (contactExists) {
			// 400: Bad request
				return res.status(400).json({ error: "This email is already in use" });
			}
		}

		const contact = await ContactRepository.create({
			name,
			email,
			phone,
			category_id: category_id || null,
		});

		res.status(201).json(contact);
	}

	async update(req, res) {
		const { id } = req.params;

		if(!isValidUUID(id)){
			return res.status(400).json({ error: "Invalid contact ID" });
		}

		const { name, email, phone, category_id } = req.body;

		if (!name || !email) {
			return res.status(400).json({ error: "Name and email are required" });
		}

		if(category_id && !isValidUUID(category_id)){
			return res.status(400).json({ error: "Invalid category" });
		}

		const contactExists = await ContactRepository.findById(id);

		if (!contactExists) {
			// 400: Bad request
			return res.status(404).json({ error: "Contact not found" });
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
			category_id: category_id || null,
		});

		res.json(updatedContact);
	}

	async delete(req, res) {
		const { id } = req.params;

		if(!isValidUUID(id)){
			return res.status(400).json({ error: "Invalid contact ID" });
		}

		const contact = await ContactRepository.findById(id);

		if (!contact) {
			// 404: Not found
			return res.status(404).json({ error: "Contact not found" });
		}

		await ContactRepository.delete(id);
		//204: No content
		res.sendStatus(204);
	}
}

//singleton
module.exports = new ContactController();
