import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from '../redux/cartSlice';
import './Cart.css';

const Cart = () => {
    const dispatch = useDispatch();
    const { items, totalPrice } = useSelector(state => state.cart);

    const handleRemoveItem = (id) => {
        dispatch(removeItem(id));
    };

    const handleUpdateQuantity = (id, quantity) => {
        if (quantity > 0) {
            dispatch(updateQuantity({ _id: id, quantity }));
        }
    };

    return (
        <div className="cart-container">
            <h2>Your Cart</h2>
            
            {items.length === 0 ? (
                <p className="empty-cart">Your cart is empty. Start by adding some pizzas!</p>
            ) : (
                <>
                    <div className="cart-items">
                        {items.map(item => (
                            <div key={item._id} className="cart-item">
                                <img src={item.imageUrl} alt={item.name} className="item-image" />
                                <div className="item-details">
                                    <h3>{item.name}</h3>
                                    <p className="item-price">${item.price.toFixed(2)}</p>
                                </div>
                                <div className="item-quantity">
                                    <button 
                                        onClick={() => handleUpdateQuantity(item._id, item.quantity - 1)}
                                        className="qty-btn"
                                    >
                                        -
                                    </button>
                                    <span className="qty-value">{item.quantity}</span>
                                    <button 
                                        onClick={() => handleUpdateQuantity(item._id, item.quantity + 1)}
                                        className="qty-btn"
                                    >
                                        +
                                    </button>
                                </div>
                                <div className="item-total">
                                    ${(item.price * item.quantity).toFixed(2)}
                                </div>
                                <button 
                                    onClick={() => handleRemoveItem(item._id)}
                                    className="btn-remove"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="cart-summary">
                        <div className="summary-row">
                            <span className="summary-label">Subtotal:</span>
                            <span className="summary-value">${totalPrice.toFixed(2)}</span>
                        </div>
                        <div className="summary-row">
                            <span className="summary-label">Tax (10%):</span>
                            <span className="summary-value">${(totalPrice * 0.1).toFixed(2)}</span>
                        </div>
                        <div className="summary-row total">
                            <span className="summary-label">Total:</span>
                            <span className="summary-value">${(totalPrice * 1.1).toFixed(2)}</span>
                        </div>
                        <button className="btn-checkout">Proceed to Checkout</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Cart;