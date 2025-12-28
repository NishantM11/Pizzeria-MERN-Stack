import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Header.css';

const Header = () => {
    const cartItems = useSelector(state => state.cart.items);
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    return (
    <header className="header">
        <div className="header-container">
            <div className="logo">
                <Link to="/" className="logo-link">
                    <span role="img" aria-label="pizza slice" className="logo-icon">🍕</span> Pizzeria
                </Link>
            </div>

            <nav className="navbar">
                <ul className="nav-links">
                    <li>
                        <Link to="/" className="nav-link">Home</Link>
                    </li>
                    <li>
                        <Link to="/menu" className="nav-link">Menu</Link>
                    </li>
                    <li>
                        <Link to="/orders" className="nav-link">Orders</Link>
                    </li>
                    <li>
                        <Link to="/cart" className="cart-link">
                            <span role="img" aria-label="shopping cart" className="cart-icon">🛒</span> Cart
                            {totalItems > 0 && (
                                <span className="cart-badge">{totalItems}</span>
                            )}
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    </header>
);
};

export default Header;