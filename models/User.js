const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    first: {
      type: String,
      required: [true, 'First name is required'],
      minlength: [2, 'First name must be at least 2 characters'],
      maxlength: [256, 'First name cannot exceed 256 characters']
    },
    middle: {
      type: String,
      maxlength: [256, 'Middle name cannot exceed 256 characters'],
      default: ''
    },
    last: {
      type: String,
      required: [true, 'Last name is required'],
      minlength: [2, 'Last name must be at least 2 characters'],
      maxlength: [256, 'Last name cannot exceed 256 characters']
    }
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    match: [/^0[2-9]\d{7,8}$/, 'Please enter a valid Israeli phone number']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email address']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [7, 'Password must be at least 7 characters'],
    maxlength: [20, 'Password cannot exceed 20 characters']
  },
  image: {
    url: {
      type: String,
      default: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
    },
    alt: {
      type: String,
      default: 'User profile image'
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
  isBusiness: {
    type: Boolean,
    default: false
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  loginAttempts: {
    type: Number,
    default: 0
  },
  lockUntil: {
    type: Date
  }
}, {
  timestamps: true
});

// Virtual for full name
userSchema.virtual('name.full').get(function() {
  return `${this.name.first} ${this.name.last}`;
});

// Virtual for account lock status
userSchema.virtual('isLocked').get(function() {
  return !!(this.lockUntil && this.lockUntil > Date.now());
});

// Pre-save middleware to hash password
userSchema.pre('save', async function(next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) return next();
  
  try {
    // Hash password with cost of 12
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Instance method to check password
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Instance method to increment login attempts
userSchema.methods.incLoginAttempts = function() {
  // If we have a previous lock that has expired, restart at 1
  if (this.lockUntil && this.lockUntil < Date.now()) {
    return this.updateOne({
      $unset: { lockUntil: 1 },
      $set: { loginAttempts: 1 }
    });
  }
  
  const updates = { $inc: { loginAttempts: 1 } };
  
  // Lock account after 3 failed attempts for 24 hours
  if (this.loginAttempts + 1 >= 3 && !this.isLocked) {
    updates.$set = { lockUntil: Date.now() + 24 * 60 * 60 * 1000 }; // 24 hours
  }
  
  return this.updateOne(updates);
};

// Instance method to reset login attempts
userSchema.methods.resetLoginAttempts = function() {
  return this.updateOne({
    $unset: { loginAttempts: 1, lockUntil: 1 }
  });
};

// Transform JSON output
userSchema.set('toJSON', {
  transform: function(doc, ret) {
    delete ret.password;
    delete ret.loginAttempts;
    delete ret.lockUntil;
    delete ret.__v;
    return ret;
  }
});

module.exports = mongoose.model('User', userSchema);

