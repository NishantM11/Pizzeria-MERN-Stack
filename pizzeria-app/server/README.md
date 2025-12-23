# Pizzeria Web Application

This is a MERN stack Pizzeria web application that allows users to browse a menu of pizzas, place orders, and manage their cart. The application consists of a client-side built with React and a server-side built with Node.js and Express.

## Project Structure

The project is organized into two main directories: `client` and `server`.

### Client

The client-side of the application is built using React. It includes the following components and pages:

- **Components**
  - `Header.js`: Navigation bar for the application.
  - `Menu.js`: Displays the list of available pizzas.
  - `Cart.js`: Shows items added to the cart and allows checkout.
  - `OrderForm.js`: Handles user input for placing an order.

- **Pages**
  - `Home.js`: Landing page of the application.
  - `Menu.js`: Menu page displaying available pizzas.
  - `Orders.js`: Shows the user's past orders.

- **Services**
  - `api.js`: Functions for making API calls to the server.

- **Main Files**
  - `App.js`: Main application component that sets up routing.
  - `index.js`: Entry point of the client application.

### Server

The server-side of the application is built using Node.js and Express. It includes the following models, routes, controllers, and middleware:

- **Models**
  - `Pizza.js`: Defines the schema for pizza items.
  - `Order.js`: Defines the schema for orders.
  - `User.js`: Defines the schema for user accounts.

- **Routes**
  - `pizzaRoutes.js`: Handles pizza-related requests.
  - `orderRoutes.js`: Handles order-related requests.
  - `userRoutes.js`: Handles user-related requests.

- **Controllers**
  - `pizzaController.js`: Handles pizza-related logic.
  - `orderController.js`: Handles order-related logic.
  - `userController.js`: Handles user-related logic.

- **Middleware**
  - `auth.js`: Middleware for authenticating users.

- **Main File**
  - `server.js`: Entry point of the server application.

## Getting Started

To get started with the application, follow these steps:

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the server directory and install dependencies:
   ```
   cd server
   npm install
   ```

3. Navigate to the client directory and install dependencies:
   ```
   cd ../client
   npm install
   ```

4. Start the server:
   ```
   cd ../server
   npm start
   ```

5. Start the client:
   ```
   cd ../client
   npm start
   ```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License.