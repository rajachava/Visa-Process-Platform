const Document = require('../models/Document');

// Create document metadata (assumes file already uploaded and url provided)
const createDocument = async (req, res) => {
  try {
    const payload = { ...req.body, user: req.user.id };
    const document = await Document.create(payload);
    res.status(201).json(document);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// List documents for an application
const getDocumentsByApplication = async (req, res) => {
  try {
    const documents = await Document.find({ application: req.params.applicationId, user: req.user.id })
      .sort({ createdAt: -1 });
    res.json(documents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update document (e.g., name or url)
const updateDocument = async (req, res) => {
  try {
    const document = await Document.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );
    if (!document) return res.status(404).json({ message: 'Document not found' });
    res.json(document);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete document
const deleteDocument = async (req, res) => {
  try {
    const document = await Document.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!document) return res.status(404).json({ message: 'Document not found' });
    res.json({ message: 'Document deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Verify document
const verifyDocument = async (req, res) => {
  try {
    const { verified, verificationNotes } = req.body;
    const document = await Document.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { verified, verificationNotes },
      { new: true }
    );
    if (!document) return res.status(404).json({ message: 'Document not found' });
    res.json(document);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createDocument,
  getDocumentsByApplication,
  updateDocument,
  deleteDocument,
  verifyDocument,
};


