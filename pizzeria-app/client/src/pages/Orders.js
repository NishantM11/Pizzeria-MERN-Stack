import React, { useEffect, useState } from 'react';
import { fetchOrders } from '../services/api';
import '../components/Cart.css';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const loadOrders = async () => {
        try {
            setLoading(true);
            setError('');
            const fetchedOrders = await fetchOrders();
            setOrders(fetchedOrders);
        } catch (err) {
            setError('Failed to load orders');
            console.error('Error fetching orders:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadOrders();
    }, []);

    if (loading) {
        return <div style={{ textAlign: 'center', padding: '40px' }}>Loading orders...</div>;
    }

    return (
        <div className="cart-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2>Your Orders</h2>
                <button 
                    onClick={loadOrders}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#ff6b6b',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '14px'
                    }}
                >
                    Refresh
                </button>
            </div>
            
            {error && <div style={{ color: 'red', padding: '10px', marginBottom: '20px', backgroundColor: '#fee', borderRadius: '4px' }}>{error}</div>}
            
            {orders.length === 0 ? (
                <p className="empty-cart">No orders found. Start by placing an order!</p>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {orders.map(order => (
                        <div key={order._id} style={{
                            border: '2px solid #ddd',
                            padding: '20px',
                            borderRadius: '8px',
                            backgroundColor: '#f9f9f9',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                        }}>
                            <div style={{ marginBottom: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <h3 style={{ margin: 0 }}>Order #{order._id.slice(-8)}</h3>
                                <span style={{ 
                                    padding: '5px 12px',
                                    backgroundColor: order.status === 'Pending' ? '#fff3cd' : '#d4edda',
                                    color: order.status === 'Pending' ? '#856404' : '#155724',
                                    borderRadius: '20px',
                                    fontSize: '12px',
                                    fontWeight: 'bold'
                                }}>
                                    {order.status || 'Pending'}
                                </span>
                            </div>
                            <p style={{ color: '#666', fontSize: '12px', margin: '5px 0 10px 0' }}>
                                Placed on: {new Date(order.orderDate || order.createdAt).toLocaleDateString()} at {new Date(order.orderDate || order.createdAt).toLocaleTimeString()}
                            </p>

                            <div style={{ marginBottom: '15px', padding: '10px', backgroundColor: 'white', borderRadius: '4px' }}>
                                <h4 style={{ marginTop: 0 }}>📍 Delivery Details</h4>
                                <p style={{ margin: '5px 0' }}><strong>Name:</strong> {order.customerName}</p>
                                <p style={{ margin: '5px 0' }}><strong>Contact:</strong> {order.contactNo}</p>
                                <p style={{ margin: '5px 0' }}><strong>Address:</strong> {order.address}</p>
                            </div>

                            <div style={{ marginBottom: '15px', padding: '10px', backgroundColor: 'white', borderRadius: '4px' }}>
                                <h4 style={{ marginTop: 0 }}>🍕 Items Ordered</h4>
                                {order.items && order.items.length > 0 ? (
                                    <ul style={{ paddingLeft: '20px', margin: '5px 0' }}>
                                        {order.items.map((item, idx) => (
                                            <li key={idx} style={{ margin: '5px 0' }}>
                                                {item.pizzaName} x {item.quantity} = <strong>₹{item.price * item.quantity}</strong>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>No items in this order</p>
                                )}
                            </div>

                            <div style={{
                                backgroundColor: '#fff',
                                padding: '15px',
                                borderRadius: '4px',
                                borderTop: '2px solid #ddd',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}>
                                <div>
                                    <div style={{ fontSize: '12px', color: '#666' }}>Total Amount</div>
                                    <div style={{ color: '#ff6b6b', fontSize: '20px', fontWeight: 'bold' }}>₹{order.totalAmount}</div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ fontSize: '12px', color: '#666' }}>Payment Method</div>
                                    <div style={{ fontWeight: 'bold', color: '#333' }}>{order.paymentMethod || 'Cash'}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Orders;