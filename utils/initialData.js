const User = require('../models/User');
const Card = require('../models/Card');

const createInitialData = async () => {
  try {
    // Check if data already exists
    const userCount = await User.countDocuments();
    const cardCount = await Card.countDocuments();

    if (userCount > 0 || cardCount > 0) {
      console.log('Initial data already exists, skipping...');
      return;
    }

    console.log('Creating initial data...');

    // Create initial users
    const users = await User.create([
      {
        name: {
          first: 'John',
          middle: '',
          last: 'Doe'
        },
        phone: '0501234567',
        email: 'john@example.com',
        password: '1234567',
        address: {
          country: 'Israel',
          city: 'Tel Aviv',
          street: 'Dizengoff',
          houseNumber: 100,
          zip: 64332
        },
        isBusiness: false,
        isAdmin: false
      },
      {
        name: {
          first: 'Jane',
          middle: '',
          last: 'Smith'
        },
        phone: '0507654321',
        email: 'jane@example.com',
        password: '1234567',
        address: {
          country: 'Israel',
          city: 'Haifa',
          street: 'Herzl',
          houseNumber: 50,
          zip: 31000
        },
        isBusiness: true,
        isAdmin: false
      },
      {
        name: {
          first: 'Admin',
          middle: '',
          last: 'User'
        },
        phone: '0509999999',
        email: 'admin@example.com',
        password: '1234567',
        address: {
          country: 'Israel',
          city: 'Jerusalem',
          street: 'King George',
          houseNumber: 1,
          zip: 91000
        },
        isBusiness: true,
        isAdmin: true
      }
    ]);

    console.log(`✅ Created ${users.length} users`);

    // Create initial cards
    const cards = await Card.create([
      {
        title: 'Pizza Palace',
        subtitle: 'Best Pizza in Town',
        description: 'Authentic Italian pizza made with fresh ingredients and traditional recipes. We offer delivery and takeout services.',
        phone: '0501234567',
        email: 'info@pizzapalace.com',
        web: 'https://pizzapalace.com',
        image: {
          url: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500',
          alt: 'Delicious pizza'
        },
        address: {
          country: 'Israel',
          city: 'Tel Aviv',
          street: 'Dizengoff',
          houseNumber: 100,
          zip: 64332
        },
        user_id: users[1]._id // Jane Smith (business user)
      },
      {
        title: 'Coffee Corner',
        subtitle: 'Artisan Coffee & Pastries',
        description: 'Specialty coffee roasted daily, fresh pastries, and a cozy atmosphere perfect for work or relaxation.',
        phone: '0507654321',
        email: 'hello@coffeecorner.co.il',
        web: 'https://coffeecorner.co.il',
        image: {
          url: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=500',
          alt: 'Coffee and pastries'
        },
        address: {
          country: 'Israel',
          city: 'Haifa',
          street: 'Herzl',
          houseNumber: 50,
          zip: 31000
        },
        user_id: users[1]._id // Jane Smith (business user)
      },
      {
        title: 'Tech Solutions',
        subtitle: 'Professional IT Services',
        description: 'Complete IT solutions for businesses: web development, system administration, cloud services, and technical support.',
        phone: '0509999999',
        email: 'contact@techsolutions.co.il',
        web: 'https://techsolutions.co.il',
        image: {
          url: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=500',
          alt: 'Technology services'
        },
        address: {
          country: 'Israel',
          city: 'Jerusalem',
          street: 'King George',
          houseNumber: 1,
          zip: 91000
        },
        user_id: users[2]._id // Admin User (business user)
      }
    ]);

    console.log(`✅ Created ${cards.length} cards`);

    // Add some likes to cards
    await Card.findByIdAndUpdate(cards[0]._id, {
      $addToSet: { likes: [users[0]._id, users[2]._id] }
    });

    await Card.findByIdAndUpdate(cards[1]._id, {
      $addToSet: { likes: [users[0]._id] }
    });

    console.log('✅ Initial data created successfully!');
    console.log('\n📋 Initial Users:');
    console.log('1. john@example.com (Regular user) - Password: 1234567');
    console.log('2. jane@example.com (Business user) - Password: 1234567');
    console.log('3. admin@example.com (Admin user) - Password: 1234567');
    console.log('\n🎴 Initial Cards:');
    console.log('1. Pizza Palace (by Jane)');
    console.log('2. Coffee Corner (by Jane)');
    console.log('3. Tech Solutions (by Admin)');

  } catch (error) {
    console.error('❌ Error creating initial data:', error.message);
  }
};

module.exports = {
  createInitialData
};

