const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    minlength: [2, 'Title must be at least 2 characters'],
    maxlength: [256, 'Title cannot exceed 256 characters']
  },
  subtitle: {
    type: String,
    required: [true, 'Subtitle is required'],
    minlength: [2, 'Subtitle must be at least 2 characters'],
    maxlength: [256, 'Subtitle cannot exceed 256 characters']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    minlength: [2, 'Description must be at least 2 characters'],
    maxlength: [1024, 'Description cannot exceed 1024 characters']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    match: [/^0[2-9]\d{7,8}$/, 'Please enter a valid Israeli phone number']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email address']
  },
  web: {
    type: String,
    match: [/^https?:\/\/.+\..+/, 'Please enter a valid URL']
  },
  image: {
    url: {
      type: String,
      default: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
    },
    alt: {
      type: String,
      default: 'Card image'
    }
  },
  address: {
    state: {
      type: String,
      maxlength: [256, 'State cannot exceed 256 characters']
    },
    country: {
      type: String,
      required: [true, 'Country is required'],
      minlength: [2, 'Country must be at least 2 characters'],
      maxlength: [256, 'Country cannot exceed 256 characters']
    },
    city: {
      type: String,
      required: [true, 'City is required'],
      minlength: [2, 'City must be at least 2 characters'],
      maxlength: [256, 'City cannot exceed 256 characters']
    },
    street: {
      type: String,
      required: [true, 'Street is required'],
      minlength: [2, 'Street must be at least 2 characters'],
      maxlength: [256, 'Street cannot exceed 256 characters']
    },
    houseNumber: {
      type: Number,
      required: [true, 'House number is required'],
      min: [1, 'House number must be at least 1']
    },
    zip: {
      type: Number,
      min: [10000, 'ZIP code must be at least 5 digits'],
      max: [999999999, 'ZIP code cannot exceed 9 digits'],
      default: 0
    }
  },
  bizNumber: {
    type: Number,
    required: [true, 'Business number is required'],
    unique: true,
    min: [100000000, 'Business number must be 9 digits'],
    max: [999999999, 'Business number must be 9 digits']
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required']
  }
}, {
  timestamps: true
});

// Index for better performance
cardSchema.index({ user_id: 1 });
cardSchema.index({ bizNumber: 1 });
cardSchema.index({ title: 'text', subtitle: 'text', description: 'text' });

// Virtual for likes count
cardSchema.virtual('likesCount').get(function() {
  return this.likes.length;
});

// Transform JSON output
cardSchema.set('toJSON', {
  transform: function(doc, ret) {
    ret.likesCount = doc.likesCount;
    delete ret.__v;
    return ret;
  }
});

// Static method to find available business number
cardSchema.statics.findAvailableBizNumber = async function() {
  let bizNumber;
  let isUnique = false;
  
  while (!isUnique) {
    bizNumber = Math.floor(100000000 + Math.random() * 900000000);
    const existingCard = await this.findOne({ bizNumber });
    if (!existingCard) {
      isUnique = true;
    }
  }
  
  return bizNumber;
};

module.exports = mongoose.model('Card', cardSchema);

