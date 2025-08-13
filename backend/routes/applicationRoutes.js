const express = require('express');
const {
  createApplication,
  getApplications,
  getApplicationById,
  updateApplication,
  deleteApplication,
  updateApplicationStatus,
} = require('../controllers/applicationController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);

router.route('/')
  .post(createApplication)
  .get(getApplications);

router.route('/:id')
  .get(getApplicationById)
  .put(updateApplication)
  .delete(deleteApplication);

router.patch('/:id/status', updateApplicationStatus);

module.exports = router;


