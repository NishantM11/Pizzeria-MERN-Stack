import React, { useEffect, useState } from 'react';
import { fetchOrders } from '../services/api';

const Orders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const getOrders = async () => {
            const fetchedOrders = await fetchOrders();
            setOrders(fetchedOrders);
        };

        getOrders();
    }, []);

    return (
        <div>
            <h1>Your Past Orders</h1>
            {orders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                <ul>
                    {orders.map(order => (
                        <li key={order._id}>
                            <p>Order ID: {order._id}</p>
                            <p>Items: {order.items.join(', ')}</p>
                            <p>Total: ${order.total}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Orders;