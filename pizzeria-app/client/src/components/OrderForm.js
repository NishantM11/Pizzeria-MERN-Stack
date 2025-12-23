import React, { useState } from 'react';

const OrderForm = ({ onSubmit }) => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [pizzaId, setPizzaId] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ name, address, phone, pizzaId });
        setName('');
        setAddress('');
        setPhone('');
        setPizzaId('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Place Your Order</h2>
            <div>
                <label>Name:</label>
                <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    required 
                />
            </div>
            <div>
                <label>Address:</label>
                <input 
                    type="text" 
                    value={address} 
                    onChange={(e) => setAddress(e.target.value)} 
                    required 
                />
            </div>
            <div>
                <label>Phone:</label>
                <input 
                    type="tel" 
                    value={phone} 
                    onChange={(e) => setPhone(e.target.value)} 
                    required 
                />
            </div>
            <div>
                <label>Pizza ID:</label>
                <input 
                    type="text" 
                    value={pizzaId} 
                    onChange={(e) => setPizzaId(e.target.value)} 
                    required 
                />
            </div>
            <button type="submit">Submit Order</button>
        </form>
    );
};

export default OrderForm;