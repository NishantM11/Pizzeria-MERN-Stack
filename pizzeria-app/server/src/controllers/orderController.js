const Order = require('../models/Order');

console.log('Order Model Schema:', Order.schema.paths);

exports.placeOrder = async (req, res) => {
    try {
        const { customerName, contactNo, address, paymentMethod, items, totalAmount } = req.body;
        
        console.log('Received order data:', { customerName, contactNo, address, paymentMethod, items, totalAmount });
        
        if (!customerName || !contactNo || !address || !items || !totalAmount) {
            return res.status(400).json({ message: 'Missing required fields: customerName, contactNo, address, items, totalAmount' });
        }

        const newOrder = new Order({
            customerName,
            contactNo,
            address,
            paymentMethod: paymentMethod || 'Cash',
            items,
            totalAmount,
            status: 'Pending'
        });

        console.log('Creating order:', newOrder);
        const savedOrder = await newOrder.save();
        console.log('Order saved successfully:', savedOrder);
        res.status(201).json(savedOrder);
    } catch (error) {
        console.error('Error placing order:', error);
        res.status(500).json({ message: error.message });
    }
};

exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().sort({ orderDate: -1 });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};