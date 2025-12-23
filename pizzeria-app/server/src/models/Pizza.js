const mongoose = require('mongoose');

const pizzaSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        enum: ['Vegetarian', 'Meat Lovers', 'Seafood', 'Specialty'],
        required: true,
    },
    toppings: {
        type: [String],
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

const Pizza = mongoose.model('Pizza', pizzaSchema);

module.exports = Pizza;