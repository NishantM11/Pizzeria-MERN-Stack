const Pizza = require('../models/Pizza');

// Mock pizzas for when database is unavailable
const MOCK_PIZZAS = [
    {
        _id: '1',
        name: 'Margherita',
        description: 'Classic pizza with tomato, mozzarella, and basil',
        price: 9.99,
        category: 'Vegetarian',
        toppings: ['Tomato', 'Mozzarella', 'Basil'],
        imageUrl: 'https://via.placeholder.com/300x200?text=Margherita'
    },
    {
        _id: '2',
        name: 'Pepperoni Paradise',
        description: 'Loaded with pepperoni and cheese',
        price: 12.99,
        category: 'Non-Vegetarian',
        toppings: ['Pepperoni', 'Mozzarella', 'Tomato'],
        imageUrl: 'https://via.placeholder.com/300x200?text=Pepperoni'
    },
    {
        _id: '3',
        name: 'Vegetarian Supreme',
        description: 'Mix of fresh vegetables with mozzarella',
        price: 11.99,
        category: 'Vegetarian',
        toppings: ['Bell Peppers', 'Mushrooms', 'Onions', 'Spinach'],
        imageUrl: 'https://via.placeholder.com/300x200?text=Veggie'
    },
    {
        _id: '4',
        name: 'Meat Lovers Feast',
        description: 'Pepperoni, sausage, bacon, and ham',
        price: 14.99,
        category: 'Non-Vegetarian',
        toppings: ['Pepperoni', 'Sausage', 'Bacon', 'Ham'],
        imageUrl: 'https://via.placeholder.com/300x200?text=Meat'
    },
    {
        _id: '5',
        name: 'Seafood Deluxe',
        description: 'Fresh shrimp, mussels, and calamari',
        price: 15.99,
        category: 'Seafood',
        toppings: ['Shrimp', 'Mussels', 'Calamari', 'Garlic'],
        imageUrl: 'https://via.placeholder.com/300x200?text=Seafood'
    },
    {
        _id: '6',
        name: 'Hawaiian Special',
        description: 'Ham and pineapple on a cheesy base',
        price: 11.99,
        category: 'Specialty',
        toppings: ['Ham', 'Pineapple', 'Mozzarella'],
        imageUrl: 'https://via.placeholder.com/300x200?text=Hawaiian'
    },
    {
        _id: '7',
        name: 'BBQ Chicken',
        description: 'Grilled chicken with BBQ sauce and onions',
        price: 13.99,
        category: 'Non-Vegetarian',
        toppings: ['Chicken', 'BBQ Sauce', 'Onions', 'Cilantro'],
        imageUrl: 'https://via.placeholder.com/300x200?text=BBQ+Chicken'
    },
    {
        _id: '8',
        name: 'Mushroom Magic',
        description: 'Assorted mushrooms with garlic and herbs',
        price: 10.99,
        category: 'Vegetarian',
        toppings: ['Mushrooms', 'Garlic', 'Herbs', 'Mozzarella'],
        imageUrl: 'https://via.placeholder.com/300x200?text=Mushroom'
    },
    {
        _id: '9',
        name: 'Spicy Inferno',
        description: 'Hot peppers and jalapeños with spicy sauce',
        price: 12.99,
        category: 'Specialty',
        toppings: ['Jalapeños', 'Red Peppers', 'Habanero', 'Spicy Sauce'],
        imageUrl: 'https://via.placeholder.com/300x200?text=Spicy'
    },
    {
        _id: '10',
        name: 'White Sauce Classic',
        description: 'Creamy white sauce with garlic and herbs',
        price: 11.99,
        category: 'Vegetarian',
        toppings: ['White Sauce', 'Garlic', 'Spinach', 'Ricotta'],
        imageUrl: 'https://via.placeholder.com/300x200?text=White+Sauce'
    }
];

// Get all pizzas with filtering support
exports.getAllPizzas = async (req, res) => {
    try {
        const { search, category, minPrice, maxPrice } = req.query;
        
        let query = { isDeleted: false };
        
        if (search) {
            query.name = { $regex: search, $options: 'i' };
        }
        if (category && category !== 'All Categories') {
            query.category = category;
        }
        if (minPrice) {
            query.price = { ...query.price, $gte: parseFloat(minPrice) };
        }
        if (maxPrice) {
            query.price = { ...query.price, $lte: parseFloat(maxPrice) };
        }
        
        const pizzas = await Pizza.find(query);
        console.log('Database query returned:', pizzas.length, 'pizzas');
        
        if (pizzas.length === 0) {
            console.log('No pizzas in database, returning mock data');
            throw new Error('No pizzas in database');
        }
        
        res.status(200).json(pizzas);
    } catch (error) {
        console.log('Database error, returning mock data:', error.message);
        // Return mock data if database is unavailable
        let mockData = [...MOCK_PIZZAS];
        
        const { search, category, minPrice, maxPrice } = req.query;
        
        if (search) {
            mockData = mockData.filter(p => 
                p.name.toLowerCase().includes(search.toLowerCase())
            );
        }
        if (category && category !== 'All Categories') {
            mockData = mockData.filter(p => p.category === category);
        }
        if (minPrice) {
            mockData = mockData.filter(p => p.price >= parseFloat(minPrice));
        }
        if (maxPrice) {
            mockData = mockData.filter(p => p.price <= parseFloat(maxPrice));
        }
        
        console.log('Returning', mockData.length, 'mock pizzas');
        res.status(200).json(mockData);
    }
};

// Add a new pizza
exports.addPizza = async (req, res) => {
    const newPizza = new Pizza(req.body);
    try {
        const savedPizza = await newPizza.save();
        res.status(201).json(savedPizza);
    } catch (error) {
        res.status(400).json({ message: 'Error creating pizza', error });
    }
};

// Get a pizza by ID
exports.getPizzaById = async (req, res) => {
    try {
        const pizza = await Pizza.findById(req.params.id);
        if (!pizza || pizza.isDeleted) {
            return res.status(404).json({ message: 'Pizza not found' });
        }
        res.status(200).json(pizza);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving pizza', error });
    }
};

// Update a pizza by ID
exports.updatePizza = async (req, res) => {
    try {
        const pizza = await Pizza.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!pizza || pizza.isDeleted) {
            return res.status(404).json({ message: 'Pizza not found' });
        }
        res.status(200).json(pizza);
    } catch (error) {
        res.status(400).json({ message: 'Error updating pizza', error });
    }
};

// Soft delete a pizza by ID
exports.deletePizza = async (req, res) => {
    try {
        const pizza = await Pizza.findByIdAndUpdate(
            req.params.id,
            { isDeleted: true },
            { new: true }
        );
        if (!pizza) {
            return res.status(404).json({ message: 'Pizza not found' });
        }
        res.status(200).json({ message: 'Pizza deleted successfully', pizza });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting pizza', error });
    }
};