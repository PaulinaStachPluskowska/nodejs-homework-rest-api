const service = require('../service/contacts');
const { schema, updateSchema } = require('../service/schemas/contactJoi');

const listContacts = async (req, res, next) => {
    const { page, limit, favorite } = req.query;
    try {
        const contacts = await service.listContacts(page, limit, favorite);
        res.status(200).json(contacts);
    } catch (error) { 
        console.error(error.message);
        next(error);
    }
};

const getContactById = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const contact = await service.getContactById(contactId);
        if (!contact) {
            return res.status(404).json({ message: "Not found" });
        } else {
            return res.status(200).json(contact);
        }
    } catch (error) {
        console.error(error.message);
        next(error);        
    }
};


const addContact = async (req, res, next) => {
  try {
    const { error } = schema.validate(req.body);
    if (error) {
      res.status(400).json({ message: error.details[0].message });
      return;
    }

    const newContact = await service.addContact(req.body);
    res.status(201).json(newContact);
    } catch (error) {
        console.error(error.message);
        next(error); 
    }
};

const removeContact = async (req, res, next) => { 
    try {
        const { contactId } = req.params;
        const removedContact = await service.removeContact(contactId);
        if (!removedContact) {
            res.status(400).json({ message: 'Not found' });
        } else {
            res.status(200).json({ message: 'Contact deleted' });
        }
    } catch (error) {
        console.error(error.message);
        next(error); 
    }
};

const updateContact = async (req, res, next) => {
    try {
        const { name, email, phone } = req.body;
        const { contactId } = req.params;
        const { error } = updateSchema.validate(req.body);

        if (error) {
        res.status(400).json({ message: error.details[0].message });
        return;
        }
        if (!name && !email && !phone) {
        return res.status(400).json({ message: 'Missing fields' });
        }
        const updatedContact = await service.updateContact(contactId, req.body);
        if (!updatedContact) {
        res.status(400).json({ message: 'Not found' });
        return;
        } else {
        return res.status(200).json({ updatedContact });
        }
    } catch (error) {
            console.error(error.message);
            next(error);
  }
};

const updateStatusContact = async (req, res, next) => {
    try { 
        const { favorite } = req.body;
        const { contactId } = req.params;
        const { error } = updateSchema.validate(req.body);

        if (error) {
        res.status(400).json({ message: error.details[0].message });
        return;
        }
        if (favorite === undefined || favorite === null) {
            res.status(400).json({ message: 'Favorite field is missing or invalid' });
            return;
        }
        const updatedContact = await service.updateStatusContact(contactId, req.body);
        if (!updatedContact) {
            res.status(404).json({ message: 'Not found' });
            return;
        } else {
            return res.status(200).json(updatedContact);
        }
    }  catch (error) {
    console.error(error.message);
    next(error);
    } 
};

module.exports = { listContacts, getContactById, addContact, removeContact, updateContact, updateStatusContact };