const express = require('express');
const mongoose = require('mongoose');
const pizzaRoutes = require('./routes/pizzaRoutes');
const orderRoutes = require('./routes/orderRoutes');
const userRoutes = require('./routes/userRoutes');
const Pizza = require('./models/Pizza');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// CORS middleware
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

// Health check
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// Mock data seeding
app.post('/api/seed-pizzas', async (req, res) => {
    try {
        // Clear existing pizzas
        await Pizza.deleteMany({});

        const mockPizzas = [
            {
                name: 'Margherita',
                description: 'Classic pizza with tomato, mozzarella, and basil',
                price: 9.99,
                category: 'Vegetarian',
                toppings: ['Tomato', 'Mozzarella', 'Basil'],
                imageUrl: 'https://via.placeholder.com/300x200?text=Margherita'
            },
            {
                name: 'Pepperoni Paradise',
                description: 'Loaded with pepperoni and cheese',
                price: 12.99,
                category: 'Meat Lovers',
                toppings: ['Pepperoni', 'Mozzarella', 'Tomato'],
                imageUrl: 'https://via.placeholder.com/300x200?text=Pepperoni'
            },
            {
                name: 'Vegetarian Supreme',
                description: 'Mix of fresh vegetables with mozzarella',
                price: 11.99,
                category: 'Vegetarian',
                toppings: ['Bell Peppers', 'Mushrooms', 'Onions', 'Spinach'],
                imageUrl: 'https://via.placeholder.com/300x200?text=Veggie'
            },
            {
                name: 'Meat Lovers Feast',
                description: 'Pepperoni, sausage, bacon, and ham',
                price: 14.99,
                category: 'Meat Lovers',
                toppings: ['Pepperoni', 'Sausage', 'Bacon', 'Ham'],
                imageUrl: 'https://via.placeholder.com/300x200?text=Meat'
            },
            {
                name: 'Seafood Deluxe',
                description: 'Fresh shrimp, mussels, and calamari',
                price: 15.99,
                category: 'Seafood',
                toppings: ['Shrimp', 'Mussels', 'Calamari', 'Garlic'],
                imageUrl: 'https://via.placeholder.com/300x200?text=Seafood'
            },
            {
                name: 'Hawaiian Special',
                description: 'Ham and pineapple on a cheesy base',
                price: 11.99,
                category: 'Specialty',
                toppings: ['Ham', 'Pineapple', 'Mozzarella'],
                imageUrl: 'https://via.placeholder.com/300x200?text=Hawaiian'
            },
            {
                name: 'BBQ Chicken',
                description: 'Grilled chicken with BBQ sauce and onions',
                price: 13.99,
                category: 'Meat Lovers',
                toppings: ['Chicken', 'BBQ Sauce', 'Onions', 'Cilantro'],
                imageUrl: 'https://via.placeholder.com/300x200?text=BBQ+Chicken'
            },
            {
                name: 'Mushroom Magic',
                description: 'Assorted mushrooms with garlic and herbs',
                price: 10.99,
                category: 'Vegetarian',
                toppings: ['Mushrooms', 'Garlic', 'Herbs', 'Mozzarella'],
                imageUrl: 'https://via.placeholder.com/300x200?text=Mushroom'
            },
            {
                name: 'Spicy Inferno',
                description: 'Hot peppers and jalapeños with spicy sauce',
                price: 12.99,
                category: 'Specialty',
                toppings: ['Jalapeños', 'Red Peppers', 'Habanero', 'Spicy Sauce'],
                imageUrl: 'https://via.placeholder.com/300x200?text=Spicy'
            },
            {
                name: 'White Sauce Classic',
                description: 'Creamy white sauce with garlic and herbs',
                price: 11.99,
                category: 'Vegetarian',
                toppings: ['White Sauce', 'Garlic', 'Spinach', 'Ricotta'],
                imageUrl: 'https://via.placeholder.com/300x200?text=White+Sauce'
            }
        ];

        const savedPizzas = await Pizza.insertMany(mockPizzas);
        res.status(201).json({ 
            message: 'Pizzas seeded successfully', 
            count: savedPizzas.length,
            pizzas: savedPizzas 
        });
    } catch (error) {
        res.status(500).json({ message: 'Error seeding pizzas', error });
    }
});

// Routes
app.use('/api/pizzas', pizzaRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/pizzeria', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('MongoDB connected');
})
.catch(err => {
    console.error('MongoDB connection error:', err);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Health check: http://localhost:${PORT}/api/health`);
    console.log(`Seed pizzas: POST http://localhost:${PORT}/api/seed-pizzas`);
});