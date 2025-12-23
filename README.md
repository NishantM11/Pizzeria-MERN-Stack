# Pizzeria Web Application - MERN Stack

A full-stack **MERN** (MongoDB, Express, React, Node.js) web application for a pizzeria business, featuring soft deletes, advanced filtering, and robust cart management with Redux state management.

## 📋 Table of Contents
- [Project Structure](#project-structure)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Architecture Highlights](#architecture-highlights)

---

## 📁 Project Structure

```
pizzeria-app/
├── client/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.js
│   │   │   ├── Menu.js
│   │   │   ├── Menu.css
│   │   │   ├── Cart.js
│   │   │   ├── Cart.css
│   │   │   ├── FilterBar.js
│   │   │   ├── FilterBar.css
│   │   │   └── OrderForm.js
│   │   ├── pages/
│   │   │   ├── Home.js
│   │   │   ├── Menu.js
│   │   │   └── Orders.js
│   │   ├── redux/
│   │   │   ├── cartSlice.js
│   │   │   └── store.js
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   ├── package.json
│   └── README.md
├── server/
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── pizzaController.js
│   │   │   ├── orderController.js
│   │   │   └── userController.js
│   │   ├── middleware/
│   │   │   └── auth.js
│   │   ├── models/
│   │   │   ├── Pizza.js
│   │   │   ├── Order.js
│   │   │   └── User.js
│   │   ├── routes/
│   │   │   ├── pizzaRoutes.js
│   │   │   ├── orderRoutes.js
│   │   │   └── userRoutes.js
│   │   └── server.js
│   ├── package.json
│   └── README.md
└── README.md
```

---

## ✨ Features

### A. Soft Delete System (Backend) ✅

**Purpose:** Maintain data integrity and prevent permanent data loss.

**Implementation:**
- **Pizza Model:** Added `isDeleted: { type: Boolean, default: false }` field
- **getAllPizzas Controller:** Automatically filters out soft-deleted pizzas (`isDeleted: false`)
- **deletePizza Controller:** Updates the `isDeleted` flag instead of permanently removing data

**Key Benefits:**
- Data recovery capability
- Audit trail maintenance
- No orphaned references in orders

---

### B. Advanced Search & Filtering (Frontend + API) ✅

**Purpose:** Improve product discoverability with 50+ pizza varieties.

**Backend API Endpoint:**
- **Route:** `GET /api/pizzas`
- **Query Parameters:**
  - `search` (string): Text search on pizza name
  - `category` (enum): Filter by category (Vegetarian, Meat Lovers, Seafood, Specialty)
  - `minPrice` (number): Minimum price filter
  - `maxPrice` (number): Maximum price filter

**Frontend FilterBar Component:**
- Search input for pizza names
- Category dropdown (Vegetarian, Meat Lovers, Seafood, Specialty)
- Price range inputs (min/max)
- Apply and Reset buttons
- Responsive design

**Usage Example:**
```
GET /api/pizzas?search=margherita&category=Vegetarian&minPrice=8&maxPrice=15
```

---

### C. Robust Cart & Checkout (Redux + Database) ✅

#### **Redux Cart Slice**

**State Management:**
- **Items Array:** Stores pizza objects with quantity
- **Total Price:** Automatically calculated and synced

**Actions:**
- `addItem`: Adds pizza to cart or increases quantity if exists
- `removeItem`: Removes item from cart by ID
- `updateQuantity`: Updates item quantity (removes if ≤ 0)
- `clearCart`: Empties the entire cart

**Features:**
- Persistent state across page navigation
- Real-time total price calculation
- Automatic item deduplication

#### **Order Schema (Database)**

**Structure:**
```javascript
{
  user: ObjectId (ref: User),
  items: [
    {
      pizza: ObjectId (ref: Pizza),
      quantity: Number
    }
  ],
  totalAmount: Number,
  orderDate: Date,
  status: String (Pending|Completed|Cancelled)
}
```

**Relationships:**
- Links to User for order attribution
- Links to Pizza for product details
- Supports multiple items per order

#### **Cart Component Features**

- Display all cart items with product images
- Quantity adjustment with +/- buttons
- Remove individual items
- Real-time total price calculation
- Tax calculation (10%)
- Subtotal, tax, and total breakdown
- Checkout button
- Empty cart state message
- Fully responsive design

---

## 🛠️ Tech Stack

### Frontend
- **React** 17.x - UI Library
- **Redux Toolkit** - State Management
- **React Redux** - React-Redux bindings
- **React Router DOM** - Client-side Routing
- **Axios** - HTTP Client
- **CSS3** - Styling with Flexbox & Grid

### Backend
- **Node.js** - JavaScript Runtime
- **Express.js** - Web Framework
- **MongoDB** - NoSQL Database
- **Mongoose** - ODM (Object Data Modeling)
- **JWT** - Authentication
- **bcryptjs** - Password hashing

### Development
- **npm** - Package Manager
- **Nodemon** - Auto-restart development server

---

## 📦 Installation

### Prerequisites
- Node.js (v14+)
- npm or yarn
- MongoDB (local or cloud instance)

### Backend Setup
```bash
cd server
npm install
```

### Frontend Setup
```bash
cd client
npm install
npm install @reduxjs/toolkit react-redux
```

---

## 🚀 Running the Application

### Start Backend Server
```bash
cd server
npm start
```
- Server runs on `http://localhost:5000`
- API endpoints available at `http://localhost:5000/api/`

### Start Frontend Development Server

**On Windows (PowerShell):**
```bash
cd client
$env:NODE_OPTIONS="--openssl-legacy-provider"
npm start
```

**On macOS/Linux:**
```bash
cd client
export NODE_OPTIONS="--openssl-legacy-provider"
npm start
```

- Client runs on `http://localhost:3000`
- Auto-reload enabled on file changes

---

## 🔌 API Documentation

### Pizza Endpoints

#### Get All Pizzas (with filtering)
```
GET /api/pizzas?search=margherita&category=Vegetarian&minPrice=5&maxPrice=20
Response: [{ _id, name, description, price, category, toppings, imageUrl, isDeleted }]
```

#### Get Pizza by ID
```
GET /api/pizzas/:id
Response: { _id, name, description, price, category, toppings, imageUrl, isDeleted }
```

#### Add New Pizza (Admin)
```
POST /api/pizzas
Body: {
  name: string,
  description: string,
  price: number,
  category: enum,
  toppings: [string],
  imageUrl: string
}
```

#### Update Pizza (Admin)
```
PUT /api/pizzas/:id
Body: { ...updatable fields }
```

#### Soft Delete Pizza (Admin)
```
DELETE /api/pizzas/:id
Sets isDeleted: true (preserves data)
```

### Order Endpoints

#### Place Order
```
POST /api/orders
Body: {
  user: ObjectId,
  items: [{ pizza: ObjectId, quantity: number }],
  totalAmount: number
}
```

#### Get All Orders
```
GET /api/orders
Response: [{ _id, user, items, totalAmount, orderDate, status }]
```

#### Get Order by ID
```
GET /api/orders/:id
Response: { _id, user, items, totalAmount, orderDate, status }
(Populated with user and pizza details)
```

#### Update Order Status
```
PUT /api/orders/:id
Body: { status: "Pending" | "Completed" | "Cancelled" }
```

---

## 🏗️ Architecture Highlights

### 1. **Monorepo Structure**
   - Separated client and server directories
   - Independent scaling capability
   - Clear separation of concerns

### 2. **Redux State Management**
   - Redux Toolkit for simplified state logic
   - Centralized cart management
   - Easy integration with React components
   - DevTools for debugging

### 3. **Database Design**
   - Soft delete pattern for data safety
   - Referential integrity with Mongoose
   - Indexed queries for performance

### 4. **RESTful API Design**
   - Standard HTTP methods (GET, POST, PUT, DELETE)
   - Query parameter filtering
   - Proper status codes
   - Structured error handling

### 5. **User Experience**
   - Responsive grid layout (Mobile-first)
   - Real-time cart updates
   - Smooth animations and transitions
   - Professional UI/UX with Flexbox/Grid

---

## 📊 State Management Flow

```
User Action (Add to Cart)
    ↓
React Component
    ↓
Redux Action (addItem)
    ↓
Redux Reducer (Update state & calculate total)
    ↓
Redux Store
    ↓
React Component Re-render
    ↓
UI Updated
```

---

## 🔒 Security Features

- ✅ Soft delete prevents accidental data loss
- ✅ Password hashing with bcryptjs
- ✅ JWT authentication middleware
- ✅ Mongoose schema validation
- ✅ Environment variables for sensitive data

---

## 📈 Performance Optimizations

- Filtered queries reduce database load
- Redux prevents unnecessary re-renders
- Responsive images with CSS
- Lazy loading components
- Indexed database queries

---

## 🚧 Future Enhancements

- [ ] User authentication dashboard
- [ ] Payment gateway integration (Stripe/PayPal)
- [ ] Real-time order tracking
- [ ] Admin dashboard with analytics
- [ ] Review and ratings system
- [ ] Inventory management
- [ ] Email notifications
- [ ] Push notifications
- [ ] Dark mode support
- [ ] Multi-language support

---

## 📝 Resume Highlights

This project demonstrates proficiency in:

✅ **Full-Stack Development** - Both frontend and backend implementation
✅ **State Management** - Redux Toolkit for scalable state logic
✅ **Database Design** - MongoDB/Mongoose with advanced patterns
✅ **RESTful APIs** - Express.js with proper routing and controllers
✅ **React Components** - Functional components with hooks
✅ **Responsive Design** - Mobile-first CSS approach
✅ **Software Architecture** - Monorepo pattern and separation of concerns
✅ **Best Practices** - Clean code, error handling, and documentation

---

## 📄 License

MIT License - Feel free to use this for your portfolio!

---

## 👨‍💻 Author

Created as a MERN Stack Portfolio Project

**Happy Coding! 🍕**
