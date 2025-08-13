const Application = require('../models/Application');

// Create
const createApplication = async (req, res) => {
  try {
    const payload = { ...req.body, user: req.user.id };
    const application = await Application.create(payload);
    res.status(201).json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Read all for user
const getApplications = async (req, res) => {
  try {
    const applications = await Application.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Read one
const getApplicationById = async (req, res) => {
  try {
    const application = await Application.findOne({ _id: req.params.id, user: req.user.id });
    if (!application) return res.status(404).json({ message: 'Application not found' });
    res.json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update
const updateApplication = async (req, res) => {
  try {
    const application = await Application.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );
    if (!application) return res.status(404).json({ message: 'Application not found' });
    res.json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete
const deleteApplication = async (req, res) => {
  try {
    const application = await Application.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!application) return res.status(404).json({ message: 'Application not found' });
    res.json({ message: 'Application deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Status transition
const updateApplicationStatus = async (req, res) => {
  try {
    const { status, notes } = req.body;
    const application = await Application.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { status, notes },
      { new: true }
    );
    if (!application) return res.status(404).json({ message: 'Application not found' });
    res.json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createApplication,
  getApplications,
  getApplicationById,
  updateApplication,
  deleteApplication,
  updateApplicationStatus,
};


