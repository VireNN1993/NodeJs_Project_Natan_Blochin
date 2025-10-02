const express = require('express');
const router = express.Router();

// Import controllers
const {
  getAllCards,
  getMyCards,
  getCardById,
  createCard,
  updateCard,
  likeCard,
  deleteCard,
  changeBizNumber
} = require('../controllers/cardsController');

// Import middleware
const { authenticateToken, requireBusiness, requireAdmin, requireOwnershipOrAdmin } = require('../middleware/auth');
const { validate, cardValidationSchemas } = require('../middleware/validation');
const { asyncHandler } = require('../middleware/errorHandler');

// Public routes
router.get('/', asyncHandler(getAllCards));
router.get('/:id', asyncHandler(getCardById));

// Protected routes
router.get('/my-cards', authenticateToken, asyncHandler(getMyCards));
router.post('/', authenticateToken, requireBusiness, validate(cardValidationSchemas.create), asyncHandler(createCard));
router.put('/:id', authenticateToken, requireOwnershipOrAdmin, validate(cardValidationSchemas.update), asyncHandler(updateCard));
router.patch('/:id', authenticateToken, asyncHandler(likeCard));
router.delete('/:id', authenticateToken, requireOwnershipOrAdmin, asyncHandler(deleteCard));

// Admin only routes
router.patch('/:id/biz-number', authenticateToken, requireAdmin, validate(cardValidationSchemas.changeBizNumber), asyncHandler(changeBizNumber));

module.exports = router;






