const { Contact } = require("../models/contact");
const { HttpError, ctrlWrapper } = require("../helpers");

const getContacts = async (req, res) => {
  const result = await Contact.find({}, "-createdAt -updateAt");
  res.status(200).json(result);
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(result);
};

const createContact = async (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    throw HttpError(400, "missing required name field");
  }
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({
    message: "contact deleted",
  });
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    throw HttpError(400, "missing fields");
  }
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(result);
};

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;

  if (!favorite) {
    throw HttpError(400, "missing field favorite");
  }
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(400, "missing field favorite");
  }
  res.status(200).json(result);
};

module.exports = {
  getContacts: ctrlWrapper(getContacts),
  getById: ctrlWrapper(getById),
  createContact: ctrlWrapper(createContact),
  deleteContact: ctrlWrapper(deleteContact),
  updateContact: ctrlWrapper(updateContact),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
