import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '../redux/cartSlice';
import { fetchPizzas } from '../services/api';
import FilterBar from './FilterBar';
import './Menu.css';

const Menu = () => {
    const [pizzas, setPizzas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({});
    const dispatch = useDispatch();

    useEffect(() => {
        const getPizzas = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await fetchPizzas(filters);
                setPizzas(data);
            } catch (error) {
                console.error('Error loading pizzas:', error);
                setError('Failed to load pizzas. Please try again.');
                setPizzas([]);
            } finally {
                setLoading(false);
            }
        };

        getPizzas();
    }, [filters]);

    const handleAddToCart = (pizza) => {
        dispatch(addItem({
            _id: pizza._id,
            name: pizza.name,
            price: pizza.price,
            imageUrl: pizza.imageUrl,
            quantity: 1
        }));
        alert(`${pizza.name} added to cart!`);
    };

    const handleFilter = (newFilters) => {
        setFilters(newFilters);
    };

    if (loading && pizzas.length === 0) {
        return <div className="loading">Loading pizzas...</div>;
    }

    return (
        <div className="menu-container">
            <h1>Crafted Flavors, Straight from the Oven</h1>
            
            <FilterBar onFilter={handleFilter} />
            
            {error && <div className="error-message">{error}</div>}
            
            {pizzas.length === 0 ? (
                <p className="no-pizzas">No pizzas found. Try adjusting your filters.</p>
            ) : (
                <div className="pizzas-grid">
                    {pizzas.map(pizza => (
                        <div key={pizza._id} className="pizza-card">
                            <img src={pizza.imageUrl} alt={pizza.name} className="pizza-image" onError={(e) => e.target.src = 'https://via.placeholder.com/300x200?text=' + pizza.name} />
                            <div className="pizza-info">
                                <h2>{pizza.name}</h2>
                                <p className="category">{pizza.category}</p>
                                <p className="description">{pizza.description}</p>
                                <div className="toppings">
                                    <strong>Toppings:</strong>
                                    <ul>
                                        {pizza.toppings.map((topping, idx) => (
                                            <li key={idx}>{topping}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="pizza-footer">
                                    <span className="price">₹{(pizza.price * 83).toFixed(0)}</span>
                                    <button 
                                        onClick={() => handleAddToCart(pizza)}
                                        className="btn-add-to-cart"
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Menu;