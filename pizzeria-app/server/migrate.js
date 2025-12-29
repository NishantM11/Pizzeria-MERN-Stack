const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/pizzeria', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(async () => {
    console.log('MongoDB connected');
    
    try {
        // Drop the old orders collection
        await mongoose.connection.collection('orders').drop();
        console.log('✓ Orders collection dropped successfully');
        
        // Exit
        process.exit(0);
    } catch (error) {
        if (error.code === 26) {
            // Collection doesn't exist, that's fine
            console.log('✓ Orders collection was already empty or doesn\'t exist');
            process.exit(0);
        } else {
            console.error('Error dropping collection:', error);
            process.exit(1);
        }
    }
})
.catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
});
