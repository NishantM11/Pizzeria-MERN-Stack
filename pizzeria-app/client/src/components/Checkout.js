import React, { useState, useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { placeOrder } from '../services/api';
import { clearCart } from '../redux/cartSlice';
import OrderSummary from './OrderSummary';
import './Checkout.css';

const Checkout = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { items, totalPrice } = useSelector(state => state.cart);
    
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        contactNo: '',
        address: '',
        paymentMethod: 'Cash'
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const totalWithTax = useMemo(() => totalPrice + (totalPrice * 0.1), [totalPrice]);

    const handleInputChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }, []);

    const handleNextStep = useCallback(() => {
        // Trim whitespace for validation
        const trimmedName = formData.name.trim();
        const trimmedAddress = formData.address.trim();
        const trimmedContact = formData.contactNo.trim();

        if (currentStep === 1) {
            if (!trimmedName) {
                setError('Please enter your name');
                return;
            }
        }
        if (currentStep === 2) {
            if (!trimmedAddress) {
                setError('Please enter your delivery address');
                return;
            }
        }
        if (currentStep === 3) {
            if (!trimmedContact) {
                setError('Please enter your contact number');
                return;
            }
        }
        setError('');
        setCurrentStep(currentStep + 1);
    }, [currentStep, formData]);

    const handlePreviousStep = useCallback(() => {
        setError('');
        setCurrentStep(currentStep - 1);
    }, [currentStep]);

    const handlePlaceOrder = useCallback(async () => {
        setLoading(true);
        setError('');

        try {
            const orderData = {
                customerName: formData.name.trim(),
                contactNo: formData.contactNo.trim(),
                address: formData.address.trim(),
                paymentMethod: 'Cash',
                items: items.map(item => ({
                    pizzaId: item._id,
                    pizzaName: item.name,
                    quantity: item.quantity,
                    price: item.price
                })),
                totalAmount: Math.round(totalWithTax)
            };

            console.log('Placing order:', orderData);
            const response = await placeOrder(orderData);
            console.log('Order response:', response);
            
            if (response && response._id) {
                // Clear the cart
                dispatch(clearCart());
                
                // Show success message
                alert(`✓ Order Confirmed!\n\nOrder ID: ${response._id}\nTotal: ₹${response.totalAmount}\n\nYour order will be delivered soon!`);
                
                // Redirect to orders page
                history.push('/orders');
            } else {
                setError('Failed to place order. Please try again.');
            }
        } catch (err) {
            console.error('Order placement error:', err);
            setError(err.response?.data?.message || 'Failed to place order. Please try again.');
        } finally {
            setLoading(false);
        }
    }, [formData, items, dispatch, history, totalWithTax]);

    if (items.length === 0) {
        return (
            <div className="checkout-container">
                <div className="empty-checkout">
                    <h2>Your cart is empty</h2>
                    <p>Add some pizzas to your cart before checkout</p>
                    <button onClick={() => history.push('/menu')} className="btn-continue-shopping">
                        Continue Shopping
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="checkout-container">
            <h1>Checkout</h1>

            {/* Step Indicator */}
            <div className="step-indicator">
                <div className={`step ${currentStep >= 1 ? 'active' : ''}`}>
                    <span className="step-number">1</span>
                    <span className="step-label">Contact</span>
                </div>
                <div className={`step ${currentStep >= 2 ? 'active' : ''}`}>
                    <span className="step-number">2</span>
                    <span className="step-label">Address</span>
                </div>
                <div className={`step ${currentStep >= 3 ? 'active' : ''}`}>
                    <span className="step-number">3</span>
                    <span className="step-label">Payment</span>
                </div>
                <div className={`step ${currentStep >= 4 ? 'active' : ''}`}>
                    <span className="step-number">4</span>
                    <span className="step-label">Review</span>
                </div>
            </div>

            <div className="checkout-content">
                {/* Order Summary Sidebar */}
                <OrderSummary 
                    items={items} 
                    totalPrice={totalPrice} 
                    totalWithTax={totalWithTax}
                />

                {/* Form Steps */}
                <div className="checkout-form">
                    {error && <div className="error-message">{error}</div>}

                    {/* Step 1: Contact Information */}
                    {currentStep === 1 && (
                        <div className="form-step">
                            <h2>Contact Information</h2>
                            <div className="form-group">
                                <label>Full Name:</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="Enter your full name"
                                    required
                                />
                            </div>
                        </div>
                    )}

                    {/* Step 2: Address */}
                    {currentStep === 2 && (
                        <div className="form-step">
                            <h2>Delivery Address</h2>
                            <div className="form-group">
                                <label>Address:</label>
                                <textarea
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    placeholder="Enter your complete delivery address (Street, Area, City, Postal Code)"
                                    rows="5"
                                    required
                                />
                            </div>
                        </div>
                    )}

                    {/* Step 3: Payment */}
                    {currentStep === 3 && (
                        <div className="form-step">
                            <h2>Contact Number</h2>
                            <div className="form-group">
                                <label>Contact Number:</label>
                                <input
                                    type="tel"
                                    name="contactNo"
                                    value={formData.contactNo}
                                    onChange={handleInputChange}
                                    placeholder="Enter your contact number"
                                    required
                                />
                            </div>
                        </div>
                    )}

                    {/* Step 4: Review & Payment Method */}
                    {currentStep === 4 && (
                        <div className="form-step">
                            <h2>Order Summary & Confirmation</h2>
                            
                            <div className="review-section">
                                <h3>Your Order Details</h3>
                                <p><strong>Name:</strong> {formData.name}</p>
                                <p><strong>Contact:</strong> {formData.contactNo}</p>
                                <p><strong>Address:</strong> {formData.address}</p>
                                <p><strong>Payment Method:</strong> Cash on Delivery</p>
                                
                                <div style={{ marginTop: '20px', borderTop: '2px solid #ddd', paddingTop: '20px' }}>
                                    <h4>Items Ordered:</h4>
                                    <ul style={{ paddingLeft: '20px' }}>
                                        {items.map(item => (
                                            <li key={item._id}>
                                                {item.name} x {item.quantity} = ₹{item.price * item.quantity}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                
                                <div style={{ marginTop: '15px', fontSize: '18px', fontWeight: 'bold', color: '#ff6b6b' }}>
                                    Total Amount: ₹{Math.round(totalWithTax)}
                                </div>
                            </div>

                            <div style={{ backgroundColor: '#e8f5e9', padding: '15px', borderRadius: '4px', marginTop: '20px' }}>
                                <p><strong>✓ Payment Method:</strong> Cash on Delivery</p>
                                <p style={{ fontSize: '12px', color: '#666', margin: '10px 0 0 0' }}>You will pay ₹{Math.round(totalWithTax)} at the time of delivery</p>
                            </div>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="form-buttons">
                        {currentStep > 1 && (
                            <button 
                                onClick={handlePreviousStep}
                                className="btn-secondary"
                                disabled={loading}
                            >
                                Previous
                            </button>
                        )}
                        
                        {currentStep < 4 && (
                            <button 
                                onClick={handleNextStep}
                                className="btn-primary"
                                disabled={loading}
                            >
                                Next
                            </button>
                        )}
                        
                        {currentStep === 4 && (
                            <button 
                                onClick={handlePlaceOrder}
                                className="btn-place-order"
                                disabled={loading}
                            >
                                {loading ? 'Placing Order...' : 'Place Order'}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
