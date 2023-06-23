const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const contactsPath = path.join(__dirname, 'contacts.json');

console.log(contactsPath);

const listContacts = async () => {
  try {
    const contacts = await fs.readFile(contactsPath);
    return JSON.parse(contacts);
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const searchedContact = contacts.find((contact) => contact.id === contactId);
    return searchedContact;
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const delContact = contacts.find((contact) => contact.id === contactId);
    if (!delContact) {
      return null;
    }
    const filteredContacts = contacts.filter((contact) => contact.id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(filteredContacts, null, 2));
    return filteredContacts;
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
};

const addContact = async (body) => {
  try {
    const { name, email, phone } = body;
    if (!name || !email || !phone) {
      return null;
    }
    const contacts = await listContacts();
    const newContact = {
      id: uuidv4(),
      name,
      email,
      phone
    };

    contacts.push(newContact);
    fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return contacts;
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex((contact) => contact.id === contactId);

    if (index === -1) {
      return null;
    }

    const updatedContact = { ...contacts[index], body };
    contacts[index] = updatedContact;
    fs.writeFile(contactsPath, JSON.stringify(contacts, null, 1));
    return updatedContact;
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};