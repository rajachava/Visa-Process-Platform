const Payment = require('../models/Payment');

// Create payment intent (simplified manual)
const createPayment = async (req, res) => {
  try {
    const payload = { ...req.body, user: req.user.id };
    const payment = await Payment.create(payload);
    res.status(201).json(payment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// List payments for an application
const getPaymentsByApplication = async (req, res) => {
  try {
    const payments = await Payment.find({ application: req.params.applicationId, user: req.user.id })
      .sort({ createdAt: -1 });
    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update payment status
const updatePayment = async (req, res) => {
  try {
    const payment = await Payment.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );
    if (!payment) return res.status(404).json({ message: 'Payment not found' });
    res.json(payment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete payment
const deletePayment = async (req, res) => {
  try {
    const payment = await Payment.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!payment) return res.status(404).json({ message: 'Payment not found' });
    res.json({ message: 'Payment deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createPayment,
  getPaymentsByApplication,
  updatePayment,
  deletePayment,
};


