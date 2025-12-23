const express = require('express');
const router = express.Router();
const pizzaController = require('../controllers/pizzaController');

// Route to get all pizzas
router.get('/', pizzaController.getAllPizzas);

// Route to add a new pizza
router.post('/', pizzaController.addPizza);

// Route to get a pizza by ID
router.get('/:id', pizzaController.getPizzaById);

// Route to update a pizza by ID
router.put('/:id', pizzaController.updatePizza);

// Route to delete a pizza by ID
router.delete('/:id', pizzaController.deletePizza);

module.exports = router;