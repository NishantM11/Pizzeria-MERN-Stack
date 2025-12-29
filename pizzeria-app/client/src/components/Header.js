import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Header.css';

const Header = () => {
    const cartItems = useSelector(state => state.cart.items);
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    return (
    <header className="header">
        <div className="header-container">
        
            <div className="logo">
                        <Link to="/" className="logo-link">
                            {/* Image */}
                            <img 
                                src="http://localhost:5000/images/Pizzeria%20Logo.png"
                                alt="Pizzeria Logo" 
                                className="logo-img" 
                            />
                            {/* Text */}
                            <span className="logo-text">Pizzeria</span>
                        </Link>
                    </div>

            {/* Hamburger Menu Icon */}
            <div className="hamburger" onClick={toggleMenu}>
                <span className={`line ${menuOpen ? 'open' : ''}`}></span>
                <span className={`line ${menuOpen ? 'open' : ''}`}></span>
                <span className={`line ${menuOpen ? 'open' : ''}`}></span>
            </div>

            <nav className={`navbar ${menuOpen ? 'open' : ''}`}>
                <ul className="nav-links">
                    <li>
                        <Link to="/" className="nav-link" onClick={closeMenu}>Home</Link>
                    </li>
                    <li>
                        <Link to="/menu" className="nav-link" onClick={closeMenu}>Menu</Link>
                    </li>
                    <li>
                        <Link to="/orders" className="nav-link" onClick={closeMenu}>Orders</Link>
                    </li>
                    <li>
                        <Link to="/cart" className="cart-link" onClick={closeMenu}>
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