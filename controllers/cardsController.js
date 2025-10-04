const Card = require('../models/Card');
const User = require('../models/User');

// @desc    Get all cards
// @route   GET /cards
// @access  Public
const getAllCards = async (req, res) => {
  try {
    const cards = await Card.find({})
      .populate('user_id', 'name email phone')
      .populate('likes', 'name email')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: cards.length,
      data: cards
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch cards',
      error: error.message
    });
  }
};

// @desc    Get my cards
// @route   GET /cards/my-cards
// @access  Private
const getMyCards = async (req, res) => {
  try {
    const cards = await Card.find({ user_id: req.user._id })
      .populate('user_id', 'name email phone')
      .populate('likes', 'name email')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: cards.length,
      data: cards
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch your cards',
      error: error.message
    });
  }
};

// @desc    Get card by ID
// @route   GET /cards/:id
// @access  Public
const getCardById = async (req, res) => {
  try {
    const card = await Card.findById(req.params.id)
      .populate('user_id', 'name email phone')
      .populate('likes', 'name email');

    if (!card) {
      return res.status(404).json({
        success: false,
        message: 'Card not found'
      });
    }

    res.json({
      success: true,
      data: card
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch card',
      error: error.message
    });
  }
};

// @desc    Create new card
// @route   POST /cards
// @access  Private (Business users only)
const createCard = async (req, res) => {
  try {
    // Generate unique business number
    const bizNumber = await Card.findAvailableBizNumber();

    const cardData = {
      ...req.body,
      user_id: req.user._id,
      bizNumber
    };

    const card = await Card.create(cardData);

    // Populate the created card
    const populatedCard = await Card.findById(card._id)
      .populate('user_id', 'name email phone')
      .populate('likes', 'name email');

    res.status(201).json({
      success: true,
      message: 'Card created successfully',
      data: populatedCard
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create card',
      error: error.message
    });
  }
};

// @desc    Update card
// @route   PUT /cards/:id
// @access  Private (Card owner or Admin)
const updateCard = async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);
    
    if (!card) {
      return res.status(404).json({
        success: false,
        message: 'Card not found'
      });
    }

    // Check ownership (handled by middleware, but double-check)
    if (card.user_id.toString() !== req.user._id.toString() && !req.user.isAdmin) {
      return res.status(403).json({
        success: false,
        message: 'Access denied - you can only edit your own cards'
      });
    }

    const updatedCard = await Card.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('user_id', 'name email phone')
     .populate('likes', 'name email');

    res.json({
      success: true,
      message: 'Card updated successfully',
      data: updatedCard
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update card',
      error: error.message
    });
  }
};

// @desc    Like/Unlike card
// @route   PATCH /cards/:id
// @access  Private
const likeCard = async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);
    
    if (!card) {
      return res.status(404).json({
        success: false,
        message: 'Card not found'
      });
    }

    const userId = req.user._id;
    const isLiked = card.likes.includes(userId);

    let updatedCard;
    if (isLiked) {
      // Unlike the card
      updatedCard = await Card.findByIdAndUpdate(
        req.params.id,
        { $pull: { likes: userId } },
        { new: true }
      ).populate('user_id', 'name email phone')
       .populate('likes', 'name email');
    } else {
      // Like the card
      updatedCard = await Card.findByIdAndUpdate(
        req.params.id,
        { $addToSet: { likes: userId } },
        { new: true }
      ).populate('user_id', 'name email phone')
       .populate('likes', 'name email');
    }

    res.json({
      success: true,
      message: isLiked ? 'Card unliked successfully' : 'Card liked successfully',
      data: updatedCard
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to like/unlike card',
      error: error.message
    });
  }
};

// @desc    Delete card
// @route   DELETE /cards/:id
// @access  Private (Card owner or Admin)
const deleteCard = async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);
    
    if (!card) {
      return res.status(404).json({
        success: false,
        message: 'Card not found'
      });
    }

    // Check ownership (handled by middleware, but double-check)
    if (card.user_id.toString() !== req.user._id.toString() && !req.user.isAdmin) {
      return res.status(403).json({
        success: false,
        message: 'Access denied - you can only delete your own cards'
      });
    }

    await Card.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Card deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete card',
      error: error.message
    });
  }
};

// @desc    Change business number (Admin only)
// @route   PATCH /cards/:id/biz-number
// @access  Private (Admin only)
const changeBizNumber = async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);
    
    if (!card) {
      return res.status(404).json({
        success: false,
        message: 'Card not found'
      });
    }

    const { bizNumber } = req.body;

    // Check if business number is already taken
    const existingCard = await Card.findOne({ bizNumber });
    if (existingCard && existingCard._id.toString() !== req.params.id) {
      return res.status(400).json({
        success: false,
        message: 'Business number is already taken'
      });
    }

    const updatedCard = await Card.findByIdAndUpdate(
      req.params.id,
      { bizNumber },
      { new: true, runValidators: true }
    ).populate('user_id', 'name email phone')
     .populate('likes', 'name email');

    res.json({
      success: true,
      message: 'Business number updated successfully',
      data: updatedCard
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update business number',
      error: error.message
    });
  }
};

module.exports = {
  getAllCards,
  getMyCards,
  getCardById,
  createCard,
  updateCard,
  likeCard,
  deleteCard,
  changeBizNumber
};












