import React from 'react';

const OrderSummary = React.memo(({ items, totalPrice, totalWithTax }) => {
    return (
        <div className="order-summary">
            <h3>Order Summary</h3>
            <div className="summary-items">
                {items.map(item => (
                    <div key={item._id} className="summary-item">
                        <span>{item.name} x {item.quantity}</span>
                        <span>₹{item.price * item.quantity}</span>
                    </div>
                ))}
            </div>
            <div className="summary-breakdown">
                <div className="breakdown-row">
                    <span>Subtotal:</span>
                    <span>₹{totalPrice}</span>
                </div>
                <div className="breakdown-row">
                    <span>Tax (10%):</span>
                    <span>₹{(totalPrice * 0.1).toFixed(0)}</span>
                </div>
                <div className="breakdown-row total">
                    <span>Total:</span>
                    <span>₹{Math.round(totalWithTax)}</span>
                </div>
            </div>
        </div>
    );
});

OrderSummary.displayName = 'OrderSummary';

export default OrderSummary;
