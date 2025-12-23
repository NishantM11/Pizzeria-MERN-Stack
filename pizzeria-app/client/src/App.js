import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import Header from './components/Header';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Orders from './pages/Orders';
import Cart from './components/Cart';
import OrderForm from './components/OrderForm';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/menu" component={Menu} />
          <Route path="/orders" component={Orders} />
          <Route path="/cart" component={Cart} />
          <Route path="/order" component={OrderForm} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;