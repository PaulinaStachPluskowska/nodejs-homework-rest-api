const express = require('express');
const { listContacts, getContactById, removeContact, addContact, updateContact } = require('../../models/contacts.js');

const router = express.Router();
const Joi = require('joi');

const schema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(7).max(13).required(),
});

const updateSchema = Joi.object({
  name: Joi.string().min(3).max(20),
  email: Joi.string().email(),
  phone: Joi.string().min(7).max(13),
}).or('name', 'email', 'phone');


router.get('/', async (req, res, next) => {
  const contacts = await listContacts();
  res.status(200).json(contacts);
});

router.get('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  if (!contact) {
    res.status(404).json({ message: "Not found" });
  } else {
    res.status(200).json(contact);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { error } = schema.validate(req.body);
    if (error) {
      res.status(400).json({ message: error.details[0].message });
      return;
    }

    const newContact = await addContact(req.body);
    res.status(201).json(newContact);
    } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  const removedContact = await removeContact(contactId);
  if (!removedContact) {
    res.status(400).json({ message: 'Not found' }); 
  } else {
    res.status(200).json({ message: 'Contact deleted' });
  }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { error } = updateSchema.validate(req.body);

    if (error) {
      res.status(400).json({ message: error.details[0].message });
      return;
    }
    const updatedContact = await updateContact(contactId, req.body);
    if (!updatedContact) {
      res.status(400).json({ message: 'Not found' });
      return;
    } else {
      res.status(200).json({ updatedContact });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;