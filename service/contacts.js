const Contact = require('./schemas/contactsMongoose');

const listContacts = async (pageNr = 1, limitPerPage = 20, favorite) => {
  let filter = {};
  const startIndex = (pageNr - 1) * limitPerPage;
  if (favorite !== undefined) { 
    filter = {favorite};
  }
  return Contact.find(filter)
    .skip(startIndex)
    .limit(limitPerPage);
};

const getContactById = async (contactId) => {
  return Contact.findById({_id: contactId});
};

const addContact = async (body) => { 
  return Contact.create(body);
};

const removeContact = async (contactId) => { 
    return Contact.findByIdAndRemove({ _id: contactId });
};

const updateContact = async (contactId, fields) => { 
  return Contact.findByIdAndUpdate({ _id: contactId }, fields, {new: true});
};

const updateStatusContact = async (contactId, body) => { 
    return Contact.findByIdAndUpdate({ _id: contactId }, body, { new: true });
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};