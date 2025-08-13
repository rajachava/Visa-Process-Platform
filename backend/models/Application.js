const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    fullName: { type: String, required: true },
    passportNumber: { type: String, required: true },
    visaType: { type: String, required: true },
    submissionDate: { type: Date, default: Date.now },
    status: {
      type: String,
      enum: ['draft', 'submitted', 'under_review', 'approved', 'rejected'],
      default: 'draft',
    },
    notes: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Application', applicationSchema);


