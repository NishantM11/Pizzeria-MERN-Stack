import React from 'react';
import Menu from '../components/Menu';
import Cart from '../components/Cart';

const Home = () => {
    return (
        <div>
            
            {/* <h1 style={{ textAlign: 'center', margin: '2rem 0' }}>
                  
                Welcome to Our Pizzeria!
            </h1> */}
            <Menu />
            <Cart />
        </div>
    );
};

export default Home;