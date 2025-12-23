import React from 'react';
import Header from '../components/Header';
import Menu from '../components/Menu';
import Cart from '../components/Cart';

const Home = () => {
    return (
        <div>
            <Header />
            <h1>Welcome to Our Pizzeria!</h1>
            <Menu />
            <Cart />
        </div>
    );
};

export default Home;