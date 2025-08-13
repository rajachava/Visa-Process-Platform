const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema(
  {
    application: { type: mongoose.Schema.Types.ObjectId, ref: 'Application', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    url: { type: String, required: true },
    verified: { type: Boolean, default: false },
    verificationNotes: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Document', documentSchema);


