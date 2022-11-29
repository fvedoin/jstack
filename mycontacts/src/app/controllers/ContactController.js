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

	store() {

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
