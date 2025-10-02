const express = require('express');
const router = express.Router();

// Import controllers
const {
  registerUser,
  loginUser,
  getAllUsers,
  getUserById,
  updateUser,
  changeBusinessStatus,
  deleteUser
} = require('../controllers/usersController');

// Import middleware
const { authenticateToken, requireAdmin, requireOwnershipOrAdmin } = require('../middleware/auth');
const { validate, userValidationSchemas } = require('../middleware/validation');
const { asyncHandler } = require('../middleware/errorHandler');

// Public routes
router.post('/register', validate(userValidationSchemas.register), asyncHandler(registerUser));
router.post('/login', validate(userValidationSchemas.login), asyncHandler(loginUser));

// Protected routes
router.get('/me', authenticateToken, (req, res, next) => {
  req.params.id = req.user.id;
  next();
}, asyncHandler(getUserById));
router.put('/me', authenticateToken, (req, res, next) => {
  req.params.id = req.user.id;
  next();
}, validate(userValidationSchemas.update), asyncHandler(updateUser));
router.patch('/me/business', authenticateToken, (req, res, next) => {
  req.params.id = req.user.id;
  next();
}, validate(userValidationSchemas.changeBusinessStatus), asyncHandler(changeBusinessStatus));

// Admin only routes
router.get('/', authenticateToken, requireAdmin, asyncHandler(getAllUsers));
router.get('/:id', authenticateToken, requireOwnershipOrAdmin, asyncHandler(getUserById));
router.put('/:id', authenticateToken, requireOwnershipOrAdmin, validate(userValidationSchemas.update), asyncHandler(updateUser));
router.patch('/:id/business', authenticateToken, requireAdmin, validate(userValidationSchemas.changeBusinessStatus), asyncHandler(changeBusinessStatus));
router.delete('/:id', authenticateToken, requireOwnershipOrAdmin, asyncHandler(deleteUser));

module.exports = router;
