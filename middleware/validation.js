const Joi = require('joi');

// User validation schemas
const userValidationSchemas = {
  register: Joi.object({
    name: Joi.object({
      first: Joi.string().min(2).max(256).required().messages({
        'string.min': 'First name must be at least 2 characters',
        'string.max': 'First name cannot exceed 256 characters',
        'any.required': 'First name is required'
      }),
      middle: Joi.string().max(256).optional().allow('').messages({
        'string.max': 'Middle name cannot exceed 256 characters'
      }),
      last: Joi.string().min(2).max(256).required().messages({
        'string.min': 'Last name must be at least 2 characters',
        'string.max': 'Last name cannot exceed 256 characters',
        'any.required': 'Last name is required'
      })
    }).required(),
    phone: Joi.string().pattern(/^0[2-9]\d{7,8}$/).required().messages({
      'string.pattern.base': 'Please enter a valid Israeli phone number',
      'any.required': 'Phone number is required'
    }),
    email: Joi.string().email().required().messages({
      'string.email': 'Please enter a valid email address',
      'any.required': 'Email is required'
    }),
    password: Joi.string().min(7).max(20).required().messages({
      'string.min': 'Password must be at least 7 characters',
      'string.max': 'Password cannot exceed 20 characters',
      'any.required': 'Password is required'
    }),
    image: Joi.object({
      url: Joi.string().uri().optional(),
      alt: Joi.string().max(256).optional()
    }).optional(),
    address: Joi.object({
      state: Joi.string().max(256).optional(),
      country: Joi.string().min(2).max(256).required().messages({
        'string.min': 'Country must be at least 2 characters',
        'string.max': 'Country cannot exceed 256 characters',
        'any.required': 'Country is required'
      }),
      city: Joi.string().min(2).max(256).required().messages({
        'string.min': 'City must be at least 2 characters',
        'string.max': 'City cannot exceed 256 characters',
        'any.required': 'City is required'
      }),
      street: Joi.string().min(2).max(256).required().messages({
        'string.min': 'Street must be at least 2 characters',
        'string.max': 'Street cannot exceed 256 characters',
        'any.required': 'Street is required'
      }),
      houseNumber: Joi.number().min(1).required().messages({
        'number.min': 'House number must be at least 1',
        'any.required': 'House number is required'
      }),
      zip: Joi.number().min(10000).max(999999999).optional()
    }).required(),
    isBusiness: Joi.boolean().optional()
  }),

  login: Joi.object({
    email: Joi.string().email().required().messages({
      'string.email': 'Please enter a valid email address',
      'any.required': 'Email is required'
    }),
    password: Joi.string().required().messages({
      'any.required': 'Password is required'
    })
  }),

  update: Joi.object({
    name: Joi.object({
      first: Joi.string().min(2).max(256).optional(),
      middle: Joi.string().max(256).optional().allow(''),
      last: Joi.string().min(2).max(256).optional()
    }).optional(),
    phone: Joi.string().pattern(/^0[2-9]\d{7,8}$/).optional().messages({
      'string.pattern.base': 'Please enter a valid Israeli phone number'
    }),
    email: Joi.string().email().optional().messages({
      'string.email': 'Please enter a valid email address'
    }),
    image: Joi.object({
      url: Joi.string().uri().optional(),
      alt: Joi.string().max(256).optional()
    }).optional(),
    address: Joi.object({
      state: Joi.string().max(256).optional(),
      country: Joi.string().min(2).max(256).optional(),
      city: Joi.string().min(2).max(256).optional(),
      street: Joi.string().min(2).max(256).optional(),
      houseNumber: Joi.number().min(1).optional(),
      zip: Joi.number().min(10000).max(999999999).optional()
    }).optional()
  }).min(1).messages({
    'object.min': 'At least one field must be provided for update'
  }),

  changeBusinessStatus: Joi.object({
    isBusiness: Joi.boolean().required().messages({
      'any.required': 'isBusiness field is required'
    })
  })
};

// Card validation schemas
const cardValidationSchemas = {
  create: Joi.object({
    title: Joi.string().min(2).max(256).required().messages({
      'string.min': 'Title must be at least 2 characters',
      'string.max': 'Title cannot exceed 256 characters',
      'any.required': 'Title is required'
    }),
    subtitle: Joi.string().min(2).max(256).required().messages({
      'string.min': 'Subtitle must be at least 2 characters',
      'string.max': 'Subtitle cannot exceed 256 characters',
      'any.required': 'Subtitle is required'
    }),
    description: Joi.string().min(2).max(1024).required().messages({
      'string.min': 'Description must be at least 2 characters',
      'string.max': 'Description cannot exceed 1024 characters',
      'any.required': 'Description is required'
    }),
    phone: Joi.string().pattern(/^0[2-9]\d{7,8}$/).required().messages({
      'string.pattern.base': 'Please enter a valid Israeli phone number',
      'any.required': 'Phone number is required'
    }),
    email: Joi.string().email().required().messages({
      'string.email': 'Please enter a valid email address',
      'any.required': 'Email is required'
    }),
    web: Joi.string().uri().optional().messages({
      'string.uri': 'Please enter a valid URL'
    }),
    image: Joi.object({
      url: Joi.string().uri().optional(),
      alt: Joi.string().max(256).optional()
    }).optional(),
    address: Joi.object({
      state: Joi.string().max(256).optional(),
      country: Joi.string().min(2).max(256).required().messages({
        'string.min': 'Country must be at least 2 characters',
        'string.max': 'Country cannot exceed 256 characters',
        'any.required': 'Country is required'
      }),
      city: Joi.string().min(2).max(256).required().messages({
        'string.min': 'City must be at least 2 characters',
        'string.max': 'City cannot exceed 256 characters',
        'any.required': 'City is required'
      }),
      street: Joi.string().min(2).max(256).required().messages({
        'string.min': 'Street must be at least 2 characters',
        'string.max': 'Street cannot exceed 256 characters',
        'any.required': 'Street is required'
      }),
      houseNumber: Joi.number().min(1).required().messages({
        'number.min': 'House number must be at least 1',
        'any.required': 'House number is required'
      }),
      zip: Joi.number().min(10000).max(999999999).optional()
    }).required()
  }),

  update: Joi.object({
    title: Joi.string().min(2).max(256).optional(),
    subtitle: Joi.string().min(2).max(256).optional(),
    description: Joi.string().min(2).max(1024).optional(),
    phone: Joi.string().pattern(/^0[2-9]\d{7,8}$/).optional().messages({
      'string.pattern.base': 'Please enter a valid Israeli phone number'
    }),
    email: Joi.string().email().optional().messages({
      'string.email': 'Please enter a valid email address'
    }),
    web: Joi.string().uri().optional().messages({
      'string.uri': 'Please enter a valid URL'
    }),
    image: Joi.object({
      url: Joi.string().uri().optional(),
      alt: Joi.string().max(256).optional()
    }).optional(),
    address: Joi.object({
      state: Joi.string().max(256).optional(),
      country: Joi.string().min(2).max(256).optional(),
      city: Joi.string().min(2).max(256).optional(),
      street: Joi.string().min(2).max(256).optional(),
      houseNumber: Joi.number().min(1).optional(),
      zip: Joi.number().min(10000).max(999999999).optional()
    }).optional()
  }).min(1).messages({
    'object.min': 'At least one field must be provided for update'
  }),

  changeBizNumber: Joi.object({
    bizNumber: Joi.number().min(100000000).max(999999999).required().messages({
      'number.min': 'Business number must be 9 digits',
      'number.max': 'Business number must be 9 digits',
      'any.required': 'Business number is required'
    })
  })
};

// Validation middleware factory
const validate = (schema, property = 'body') => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[property], {
      abortEarly: false,
      stripUnknown: true
    });

    if (error) {
      const errorMessages = error.details.map(detail => detail.message);
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: errorMessages
      });
    }

    req[property] = value;
    next();
  };
};

module.exports = {
  userValidationSchemas,
  cardValidationSchemas,
  validate
};

