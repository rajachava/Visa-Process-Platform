const express = require('express');
const {
  createPayment,
  getPaymentsByApplication,
  updatePayment,
  deletePayment,
} = require('../controllers/paymentController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router({ mergeParams: true });

router.use(protect);

router.route('/')
  .post(createPayment)
  .get(getPaymentsByApplication);

router.route('/:id')
  .put(updatePayment)
  .delete(deletePayment);

module.exports = router;


