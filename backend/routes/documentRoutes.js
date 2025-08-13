const express = require('express');
const {
  createDocument,
  getDocumentsByApplication,
  updateDocument,
  deleteDocument,
  verifyDocument,
} = require('../controllers/documentController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router({ mergeParams: true });

router.use(protect);

router.route('/')
  .post(createDocument)
  .get(getDocumentsByApplication);

router.route('/:id')
  .put(updateDocument)
  .delete(deleteDocument);

router.patch('/:id/verify', verifyDocument);

module.exports = router;


