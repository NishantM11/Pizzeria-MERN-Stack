const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const pizzaRoutes = require('./routes/pizzaRoutes');
const orderRoutes = require('./routes/orderRoutes');
const userRoutes = require('./routes/userRoutes');
const Pizza = require('./models/Pizza');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Serve static files (images) from public folder
app.use('/images', express.static(path.join(__dirname, '../../client/public')));

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

// Root endpoint
app.get('/', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'Pizzeria API is running at http://localhost:5000/api/pizzas' });
});

// Health check
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// Mock data seeding (GET and POST)
app.get('/api/seed-pizzas', async (req, res) => {
    try {
        // Clear existing pizzas
        await Pizza.deleteMany({});

        const mockPizzas = [
            {
                name: 'Margherita',
                description: 'Classic pizza with tomato, mozzarella, and basil',
                price: 829,
                category: 'Vegetarian',
                toppings: ['Tomato', 'Mozzarella', 'Basil'],
                imageUrl: 'http://localhost:5000/images/Margherita%20Pizza.png'
            },
            {
                name: 'Pepperoni Paradise',
                description: 'Loaded with pepperoni and cheese',
                price: 1078,
                category: 'Non-Vegetarian',
                toppings: ['Pepperoni', 'Mozzarella', 'Tomato'],
                imageUrl: 'http://localhost:5000/images/Pepperoni%20Paradise.png'
            },
            {
                name: 'Vegetarian Supreme',
                description: 'Mix of fresh vegetables with mozzarella',
                price: 995,
                category: 'Vegetarian',
                toppings: ['Bell Peppers', 'Mushrooms', 'Onions', 'Spinach'],
                imageUrl: 'http://localhost:5000/images/Vegetarian%20Supreme.png'
            },
            {
                name: 'Meat Lovers Feast',
                description: 'Pepperoni, sausage, bacon, and ham',
                price: 1243,
                category: 'Non-Vegetarian',
                toppings: ['Pepperoni', 'Sausage', 'Bacon', 'Ham'],
                imageUrl: 'http://localhost:5000/images/Meat%20Lovers%20Feast.png'
            },
            {
                name: 'Seafood Deluxe',
                description: 'Fresh shrimp, mussels, and calamari',
                price: 1326,
                category: 'Seafood',
                toppings: ['Shrimp', 'Mussels', 'Calamari', 'Garlic'],
                imageUrl: 'http://localhost:5000/images/Seafood%20Deluxe.png'
            },
            {
                name: 'Hawaiian Special',
                description: 'Ham and pineapple on a cheesy base',
                price: 995,
                category: 'Specialty',
                toppings: ['Ham', 'Pineapple', 'Mozzarella'],
                imageUrl: 'http://localhost:5000/images/Hawaiian%20Special.png'
            },
            {
                name: 'BBQ Chicken',
                description: 'Grilled chicken with BBQ sauce and onions',
                price: 1161,
                category: 'Non-Vegetarian',
                toppings: ['Chicken', 'BBQ Sauce', 'Onions', 'Cilantro'],
                imageUrl: 'http://localhost:5000/images/BBQ%20Chicken.png'
            },
            {
                name: 'Mushroom Magic',
                description: 'Assorted mushrooms with garlic and herbs',
                price: 912,
                category: 'Vegetarian',
                toppings: ['Mushrooms', 'Garlic', 'Herbs', 'Mozzarella'],
                imageUrl: 'http://localhost:5000/images/Mushroom%20Magic.png'
            },
            {
                name: 'Spicy Inferno',
                description: 'Hot peppers and jalapeños with spicy sauce',
                price: 1078,
                category: 'Specialty',
                toppings: ['Jalapeños', 'Red Peppers', 'Habanero', 'Spicy Sauce'],
                imageUrl: 'http://localhost:5000/images/Spicy%20Inferno.png'
            },
            {
                name: 'White Sauce Classic',
                description: 'Creamy white sauce with garlic and herbs',
                price: 995,
                category: 'Vegetarian',
                toppings: ['White Sauce', 'Garlic', 'Spinach', 'Ricotta'],
                imageUrl: 'http://localhost:5000/images/White%20Sauce%20Classic.png'
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

app.post('/api/seed-pizzas', async (req, res) => {
    try {
        // Clear existing pizzas
        await Pizza.deleteMany({});

        const mockPizzas = [
            {
                name: 'Margherita',
                description: 'Classic pizza with tomato, mozzarella, and basil',
                price: 829,
                category: 'Vegetarian',
                toppings: ['Tomato', 'Mozzarella', 'Basil'],
                imageUrl: 'http://localhost:5000/images/Margherita%20Pzza.png'
            },
            {
                name: 'Pepperoni Paradise',
                description: 'Loaded with pepperoni and cheese',
                price: 1078,
                category: 'Non-Vegetarian',
                toppings: ['Pepperoni', 'Mozzarella', 'Tomato'],
                imageUrl: 'http://localhost:5000/images/Pepperoni%20Paradise.png'
            },
            {
                name: 'Vegetarian Supreme',
                description: 'Mix of fresh vegetables with mozzarella',
                price: 995,
                category: 'Vegetarian',
                toppings: ['Bell Peppers', 'Mushrooms', 'Onions', 'Spinach'],
                imageUrl: 'http://localhost:5000/images/Vegetarian%20Supreme.png'
            },
            {
                name: 'Meat Lovers Feast',
                description: 'Pepperoni, sausage, bacon, and ham',
                price: 1243,
                category: 'Non-Vegetarian',
                toppings: ['Pepperoni', 'Sausage', 'Bacon', 'Ham'],
                imageUrl: 'http://localhost:5000/images/Meat%20Lovers%20Feast.png'
            },
            {
                name: 'Seafood Deluxe',
                description: 'Fresh shrimp, mussels, and calamari',
                price: 1326,
                category: 'Seafood',
                toppings: ['Shrimp', 'Mussels', 'Calamari', 'Garlic'],
                imageUrl: 'http://localhost:5000/images/Seafood%20Deluxe.png'
            },
            {
                name: 'Hawaiian Special',
                description: 'Ham and pineapple on a cheesy base',
                price: 995,
                category: 'Specialty',
                toppings: ['Ham', 'Pineapple', 'Mozzarella'],
                imageUrl: 'http://localhost:5000/images/Hawaiian%20Special.png'
            },
            {
                name: 'BBQ Chicken',
                description: 'Grilled chicken with BBQ sauce and onions',
                price: 1161,
                category: 'Non-Vegetarian',
                toppings: ['Chicken', 'BBQ Sauce', 'Onions', 'Cilantro'],
                imageUrl: 'http://localhost:5000/images/BBQ%20Chicken.png'
            },
            {
                name: 'Mushroom Magic',
                description: 'Assorted mushrooms with garlic and herbs',
                price: 912,
                category: 'Vegetarian',
                toppings: ['Mushrooms', 'Garlic', 'Herbs', 'Mozzarella'],
                imageUrl: 'http://localhost:5000/images/Mushroom%20Magic.png'
            },
            {
                name: 'Spicy Inferno',
                description: 'Hot peppers and jalapeños with spicy sauce',
                price: 1078,
                category: 'Specialty',
                toppings: ['Jalapeños', 'Red Peppers', 'Habanero', 'Spicy Sauce'],
                imageUrl: 'http://localhost:5000/images/Spicy%20Inferno.png'
            },
            {
                name: 'White Sauce Classic',
                description: 'Creamy white sauce with garlic and herbs',
                price: 995,
                category: 'Vegetarian',
                toppings: ['White Sauce', 'Garlic', 'Spinach', 'Ricotta'],
                imageUrl: 'http://localhost:5000/images/White%20Sauce%20Classic.png'
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

// Clear orders collection
app.get('/api/clear-orders', async (req, res) => {
    try {
        const Order = require('./models/Order');
        await Order.deleteMany({});
        res.status(200).json({ message: 'All orders cleared successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error clearing orders', error });
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