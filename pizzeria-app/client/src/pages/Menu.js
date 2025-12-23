import React, { useEffect, useState } from 'react';
import { fetchPizzas } from '../services/api';

const Menu = () => {
    const [pizzas, setPizzas] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getPizzas = async () => {
            const data = await fetchPizzas();
            setPizzas(data);
            setLoading(false);
        };

        getPizzas();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Menu</h1>
            <ul>
                {pizzas.map(pizza => (
                    <li key={pizza._id}>
                        <h2>{pizza.name}</h2>
                        <p>{pizza.description}</p>
                        <p>${pizza.price}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Menu;