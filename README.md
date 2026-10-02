# 🛍️ ZenMart — Full-Stack E-Commerce Platform

ZenMart is a full-stack e-commerce application built with **React, Node.js, Express, MongoDB, JWT, and React Context API**.

The project provides secure authentication and complete product CRUD functionality through a REST API and a responsive React frontend.

This README is designed as a long-term reference so that the complete project flow, architecture, responsibilities, and setup can still be understood easily after returning to the project months later.

---

# 📌 Table of Contents

- [Project Overview](#-project-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Architecture](#-project-architecture)
- [Project Structure](#-project-structure)
- [Authentication Architecture](#-authentication-architecture)
- [Registration Flow](#-registration-flow)
- [Login Flow](#-login-flow)
- [Session Restoration](#-session-restoration)
- [Access Token Refresh](#-access-token-refresh)
- [Logout Flow](#-logout-flow)
- [Protected Routes](#-protected-routes)
- [Product Architecture](#-product-architecture)
- [Get Products Flow](#-get-products-flow)
- [Add Product Flow](#-add-product-flow)
- [Edit Product Flow](#-edit-product-flow)
- [Delete Product Flow](#-delete-product-flow)
- [Frontend State Management](#-frontend-state-management)
- [API Architecture](#-api-architecture)
- [API Endpoints](#-api-endpoints)
- [Validation](#-validation)
- [Security](#-security)
- [Important Backend Files](#-important-backend-files)
- [Important Frontend Files](#-important-frontend-files)
- [Environment Variables](#-environment-variables)
- [Installation](#-installation)
- [Running the Project](#-running-the-project)
- [Request Lifecycle](#-request-lifecycle)
- [Error Handling](#-error-handling)
- [Development Notes](#-development-notes)
- [Future Improvements](#-future-improvements)
- [Quick Mental Model](#-quick-mental-model)

---

# 📖 Project Overview

ZenMart consists of two major applications:

```text
                         ZENMART
                            │
              ┌─────────────┴─────────────┐
              │                           │
          FRONTEND                    BACKEND
              │                           │
            React                     Node.js
              │                           │
        React Router                  Express
              │                           │
        Context API                 REST API
              │                           │
           Axios                     Mongoose
              │                           │
              └─────────────┬─────────────┘
                            │
                            ▼
                         MongoDB
```

## Frontend responsibility

The frontend is responsible for:

- User interface
- Login and registration
- Product listing
- Add product
- Edit product
- Delete product
- Form handling
- Navigation
- Authentication state
- Product state
- API communication
- Loading and error states
- User interaction

## Backend responsibility

The backend is responsible for:

- REST API
- Authentication
- Authorization
- Password hashing
- JWT generation and verification
- Refresh tokens
- Request validation
- Product CRUD
- Database operations
- Secure cookie handling

---

# ✨ Features

## 🔐 Authentication

- User registration
- User login
- Password hashing with bcrypt
- JWT access token
- JWT refresh token
- HttpOnly refresh-token cookie
- Access token stored only in application memory
- Automatic access-token refresh
- Session restoration after browser refresh
- Current-user endpoint
- Logout
- Server-side refresh-token invalidation
- Protected frontend routes

## 🛒 Product Management

- View all products
- View a single product
- Add product
- Edit product
- Delete product
- Product name
- Description
- Price
- Stock
- Category
- Image URL
- Stock status display

## 🎨 Frontend UX

- ZenMart Emerald Noir theme
- Responsive design
- Loading skeletons
- Empty states
- Error states
- Retry functionality
- Account dropdown
- Logout confirmation modal
- Delete confirmation modal
- React Hook Form validation
- Reusable ProductCard component

---

# 🧰 Tech Stack

## Frontend

| Technology | Purpose |
|---|---|
| React | UI development |
| React Router | Client-side routing |
| React Hook Form | Form handling and validation |
| Axios | API communication |
| Tailwind CSS | Styling |
| Context API | Shared application state |
| Vite | Development and build tool |

## Backend

| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime |
| Express.js | REST API |
| MongoDB | Database |
| Mongoose | MongoDB ODM |
| JWT | Authentication |
| bcryptjs | Password hashing |
| express-validator | Request validation |
| cookie-parser | Cookie handling |
| cors | Cross-origin requests |
| dotenv | Environment variables |

---

# 🏗️ Project Architecture

The project follows a separation-of-concerns architecture.

```text
                         React Frontend
                              │
                              │ Axios
                              ▼
                       Express REST API
                              │
                              ▼
                         Middleware
                    ┌─────────┴─────────┐
                    │                   │
               Authentication       Validation
                    │                   │
                    └─────────┬─────────┘
                              │
                              ▼
                         Controllers
                    ┌─────────┴─────────┐
                    │                   │
              Auth Controller     Product Controller
                    │                   │
                    └─────────┬─────────┘
                              │
                              ▼
                            Models
                       ┌──────┴──────┐
                       │             │
                      User        Product
                       │             │
                       └──────┬──────┘
                              │
                              ▼
                           MongoDB
```

---

# 📁 Project Structure

```text
ZenMart/
│
├── backend/
│   │
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   │
│   │   ├── controllers/
│   │   │   ├── auth.controller.js
│   │   │   └── product.controller.js
│   │   │
│   │   ├── middlewares/
│   │   │   ├── auth.middleware.js
│   │   │   └── validate.middleware.js
│   │   │
│   │   ├── models/
│   │   │   ├── user.model.js
│   │   │   └── product.model.js
│   │   │
│   │   ├── routes/
│   │   │   ├── auth.routes.js
│   │   │   └── product.routes.js
│   │   │
│   │   ├── utils/
│   │   │   └── token.js
│   │   │
│   │   └── validators/
│   │       ├── auth.validator.js
│   │       └── product.validator.js
│   │
│   ├── app.js
│   ├── server.js
│   ├── .env
│   ├── .env.example
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   │
│   ├── src/
│   │   ├── api/
│   │   │   ├── auth.api.js
│   │   │   └── product.api.js
│   │   │
│   │   ├── assets/
│   │   │
│   │   ├── Auth/
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   │
│   │   ├── components/
│   │   │   ├── Logo.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   │
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   └── ProductContext.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Auth.jsx
│   │   │   ├── Products.jsx
│   │   │   ├── AddProduct.jsx
│   │   │   └── EditProduct.jsx
│   │   │
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   └── token.js
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── public/
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

> **Important:** `.env` contains private credentials and must never be committed to GitHub.

---

# 🔐 Authentication Architecture

ZenMart uses two JWT tokens.

```text
ACCESS TOKEN
    │
    ├── Short-lived
    ├── Stored only in frontend memory
    └── Sent in Authorization header


REFRESH TOKEN
    │
    ├── Long-lived
    ├── Stored in HttpOnly cookie
    ├── Persisted server-side
    └── Used to generate new access tokens
```

The access token is intentionally **not stored in localStorage**.

---

# 📝 Registration Flow

```text
Register Form
      │
      ▼
React Hook Form
      │
      ▼
AuthContext.register()
      │
      ▼
auth.api.js
      │
      ▼
POST /api/auth/register
      │
      ▼
Backend Validation
      │
      ▼
Auth Controller
      │
      ▼
Check duplicate email
      │
      ▼
bcrypt Password Hash
      │
      ▼
MongoDB
      │
      ▼
User Created
      │
      ▼
User Data Returned
```

No access token or refresh token is generated during registration.

The user can then log in.

---

# 🔑 Login Flow

```text
Login Form
     │
     ▼
React Hook Form
     │
     ▼
AuthContext.login()
     │
     ▼
loginUser()
     │
     ▼
POST /api/auth/login
     │
     ▼
Validate Request
     │
     ▼
Find User
     │
     ▼
bcrypt.compare()
     │
     ▼
Generate JWT Tokens
     │
     ├─────────────────────┐
     ▼                     ▼
Access Token          Refresh Token
     │                     │
     ▼                     ▼
Frontend Memory       HttpOnly Cookie
                           │
                           ▼
                       Database
     │
     ▼
GET /api/auth/me
     │
     ▼
Current User
     │
     ▼
AuthContext
```

---

# ♻️ Session Restoration

The access token exists only in memory.

Therefore, when the browser is refreshed, the access token disappears.

The refresh token remains in the HttpOnly cookie.

The application restores the session like this:

```text
Browser Refresh
      │
      ▼
AuthProvider starts
      │
      ▼
POST /api/auth/refresh-token
      │
      ▼
Browser sends HttpOnly cookie
      │
      ▼
Backend verifies refresh token
      │
      ▼
New access token
      │
      ▼
Store access token in memory
      │
      ▼
GET /api/auth/me
      │
      ▼
Restore user
```

This allows the user to remain logged in after refreshing the page.

---

# 🔄 Access Token Refresh

The centralized Axios instance handles expired access tokens.

Normal request:

```text
Frontend
    │
    │ Authorization: Bearer <access-token>
    ▼
Backend
```

If the token has expired:

```text
Request
   │
   ▼
Backend
   │
   ▼
401 Unauthorized
   │
   ▼
Axios Response Interceptor
   │
   ▼
POST /auth/refresh-token
   │
   ▼
New Access Token
   │
   ▼
Retry Original Request
```

If multiple requests receive `401` while a refresh is already running, the requests wait for the new access token instead of creating multiple refresh requests.

---

# 🚪 Logout Flow

```text
Account Button
      │
      ▼
Account Dropdown
      │
      ▼
Logout
      │
      ▼
Confirmation Modal
      │
      ├───────────────┐
      │               │
    Cancel       Yes, Logout
      │               │
      ▼               ▼
Close Modal      POST /auth/logout
                      │
                      ▼
              Refresh Token Removed
                      │
                      ▼
                Cookie Cleared
                      │
                      ▼
               Access Token Cleared
                      │
                      ▼
                  User Cleared
                      │
                      ▼
                    /auth
```

---

# 🛡️ Protected Routes

The following frontend pages are protected:

```text
/products
/products/add
/products/edit/:id
```

The flow is:

```text
User visits protected route
          │
          ▼
   ProtectedRoute
          │
          ▼
     authLoading?
       /      \
     Yes       No
      │         │
   Loading    user?
               / \
             Yes  No
              │    │
              ▼    ▼
           Page   /auth
```

The backend remains responsible for protecting authenticated API operations.

---

# 🛒 Product Architecture

Product requests follow this flow:

```text
Page
 │
 ▼
ProductContext
 │
 ▼
Product API Module
 │
 ▼
Axios
 │
 ▼
Express Route
 │
 ▼
Middleware
 │
 ▼
Validator
 │
 ▼
Controller
 │
 ▼
Mongoose Model
 │
 ▼
MongoDB
```

---

# 📦 Get Products Flow

Product listing is public.

```text
Products.jsx
     │
     ▼
useEffect()
     │
     ▼
fetchProducts()
     │
     ▼
ProductContext
     │
     ▼
getProducts()
     │
     ▼
GET /api/products
     │
     ▼
Product Controller
     │
     ▼
MongoDB
     │
     ▼
Products Returned
     │
     ▼
ProductContext
     │
     ▼
ProductCard
```

---

# ➕ Add Product Flow

```text
AddProduct.jsx
      │
      ▼
React Hook Form
      │
      ▼
Client-side Validation
      │
      ▼
ProductContext.addProduct()
      │
      ▼
createProduct()
      │
      ▼
POST /api/products
      │
      ▼
Access Token
      │
      ▼
Auth Middleware
      │
      ▼
Product Validator
      │
      ▼
Product Controller
      │
      ▼
MongoDB
      │
      ▼
Created Product
      │
      ▼
ProductContext
      │
      ▼
/products
```

---

# ✏️ Edit Product Flow

```text
Products Page
      │
      ▼
Click Edit
      │
      ▼
/products/edit/:id
      │
      ▼
useParams()
      │
      ▼
fetchProduct(id)
      │
      ▼
GET /api/products/:id
      │
      ▼
Existing Product
      │
      ▼
React Hook Form reset()
      │
      ▼
User edits fields
      │
      ▼
editProduct(id, data)
      │
      ▼
PUT /api/products/:id
      │
      ▼
Authentication
      │
      ▼
Validation
      │
      ▼
MongoDB
      │
      ▼
Updated Product
      │
      ▼
ProductContext State Updated
      │
      ▼
/products
```

---

# 🗑️ Delete Product Flow

The project uses a custom confirmation modal instead of the browser's `window.confirm()`.

```text
ProductCard
     │
     ▼
Delete Button
     │
     ▼
Custom Delete Modal
     │
     ├───────────────┐
     │               │
   Cancel        Yes, Delete
     │               │
     ▼               ▼
Close Modal    removeProduct(id)
                     │
                     ▼
             DELETE /api/products/:id
                     │
                     ▼
              Auth Middleware
                     │
                     ▼
             Product Controller
                     │
                     ▼
                  MongoDB
                     │
                     ▼
             Context Updated
                     │
                     ▼
               UI Updated
```

---

# 🧠 Frontend State Management

The application uses **React Context API** instead of Redux.

```text
┌───────────────────────────────────────────────┐
│                FRONTEND STATE                 │
├─────────────────┬─────────────────────────────┤
│ AuthContext     │ Authentication state        │
│ ProductContext  │ Product state               │
│ Local State     │ UI-specific state           │
│ React Hook Form │ Form state + validation     │
└─────────────────┴─────────────────────────────┘
```

## AuthContext

Responsible for:

- Current user
- Access token
- Login
- Register
- Logout
- Session restoration
- Authentication loading state

## ProductContext

Responsible for:

- Products
- Loading state
- Error state
- Fetching products
- Fetching one product
- Adding product
- Editing product
- Removing product

## Local State

Used for UI-only state such as:

- Account dropdown
- Logout modal
- Delete modal
- Action loading states

---

# 🌐 API Architecture

The frontend does not make Axios requests directly from every component.

Instead:

```text
Component
    │
    ▼
Context
    │
    ▼
API Module
    │
    ▼
Central Axios Instance
    │
    ▼
Backend
```

## Auth API

File:

```text
frontend/src/api/auth.api.js
```

Handles:

- Register
- Login
- Logout
- Current user
- Refresh token

## Product API

File:

```text
frontend/src/api/product.api.js
```

Handles:

- Get products
- Get product
- Create product
- Update product
- Delete product

---

# 📡 API Endpoints

Base URL:

```text
/api
```

## Authentication

| Method | Endpoint | Authentication | Purpose |
|---|---|---|---|
| POST | `/auth/register` | Public | Register user |
| POST | `/auth/login` | Public | Login user |
| POST | `/auth/refresh-token` | Refresh Cookie | Generate new access token |
| POST | `/auth/logout` | Access Token | Logout |
| GET | `/auth/me` | Access Token | Get current user |

## Products

| Method | Endpoint | Authentication | Purpose |
|---|---|---|---|
| GET | `/products` | Public | Get all products |
| GET | `/products/:id` | Public | Get one product |
| POST | `/products` | Required | Create product |
| PUT | `/products/:id` | Required | Update product |
| DELETE | `/products/:id` | Required | Delete product |

---

# ✅ Validation

Backend validation is implemented using `express-validator`.

General request pipeline:

```text
Request
   │
   ▼
Route
   │
   ▼
Validator
   │
   ├──── Invalid ────► 400 Response
   │
   ▼
Middleware
   │
   ▼
Controller
```

## Authentication Validation

Examples:

- Name required
- Email format
- Password requirements
- Confirm password
- Duplicate email handling

## Product Validation

Examples:

- Product name required
- Product name minimum length
- Description required
- Price required
- Price must be a number
- Price cannot be negative
- Stock required
- Stock must be a non-negative integer
- Category required
- Image required
- Image must be a valid URL
- Product ID must be a valid MongoDB ObjectId

---

# 🔒 Security

## Password Hashing

Passwords are never stored as plain text.

```text
Plain Password
      │
      ▼
    bcrypt
      │
      ▼
Password Hash
      │
      ▼
   MongoDB
```

The backend uses bcrypt with 10 salt rounds.

---

## Access Token

The access token:

- Is a JWT
- Is short-lived
- Is stored only in frontend memory
- Is sent using the Authorization header

Example:

```text
Authorization: Bearer <access-token>
```

The access token is **not stored in localStorage**.

---

## Refresh Token

The refresh token:

- Is a JWT
- Has a longer lifetime
- Is stored in an HttpOnly cookie
- Is persisted server-side
- Is used to create new access tokens
- Is invalidated during logout

Cookie configuration uses:

```text
httpOnly: true
secure: production only
sameSite: strict
```

---

# 🧩 Important Backend Files

## `backend/server.js`

Starts the backend server.

---

## `backend/app.js`

Configures the Express application.

Responsible for:

- Middleware
- CORS
- Cookie parser
- Routes

---

## `backend/src/config/db.js`

Handles the MongoDB connection.

---

## `backend/src/controllers/auth.controller.js`

Contains authentication business logic:

- Register
- Login
- Refresh token
- Logout
- Current user

---

## `backend/src/controllers/product.controller.js`

Contains product CRUD business logic.

---

## `backend/src/middlewares/auth.middleware.js`

Protects authenticated routes.

Flow:

```text
Authorization Header
        │
        ▼
Extract Bearer Token
        │
        ▼
Verify JWT
        │
        ▼
req.user
```

---

## `backend/src/middlewares/validate.middleware.js`

Collects express-validator errors and returns structured validation responses.

---

## `backend/src/models/user.model.js`

Defines the User MongoDB schema.

---

## `backend/src/models/product.model.js`

Defines the Product MongoDB schema.

---

## `backend/src/routes/`

Connects API endpoints with middleware, validators, and controllers.

---

## `backend/src/validators/`

Contains request validation rules.

---

## `backend/src/utils/token.js`

Contains JWT token generation and verification utilities.

---

# 🎨 Important Frontend Files

## `frontend/src/pages/Auth.jsx`

Controls the Login/Register interface.

Login and Register use the same authentication area.

---

## `frontend/src/Auth/Login.jsx`

Handles the login form and login submission.

---

## `frontend/src/Auth/Register.jsx`

Handles the registration form and registration submission.

---

## `frontend/src/context/AuthContext.jsx`

Central authentication state and authentication operations.

---

## `frontend/src/context/ProductContext.jsx`

Central product state and product operations.

---

## `frontend/src/services/api.js`

Central Axios configuration.

Responsible for:

- API base URL
- Credentials
- Authorization header
- Access-token refresh
- Retrying failed requests

---

## `frontend/src/services/token.js`

Stores the current access token in application memory.

---

## `frontend/src/components/Navbar.jsx`

Contains:

- ZenMart logo
- Add Product button
- Account section
- Account dropdown
- Logout confirmation modal

---

## `frontend/src/components/ProductCard.jsx`

Reusable product card component.

---

## `frontend/src/components/ProtectedRoute.jsx`

Protects frontend routes from unauthenticated access.

---

## `frontend/src/pages/Products.jsx`

Main product dashboard.

Contains:

- Product listing
- Product count
- Loading skeleton
- Error state
- Empty state
- Delete confirmation modal

---

## `frontend/src/pages/AddProduct.jsx`

Form for creating a product.

---

## `frontend/src/pages/EditProduct.jsx`

Form for updating an existing product.

---

# ⚙️ Environment Variables

Backend environment files are stored inside:

```text
backend/.env
backend/.env.example
```

## `.env.example`

The safe template contains:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

ACCESS_TOKEN_SECRET=your_access_token_secret

REFRESH_TOKEN_SECRET=your_refresh_token_secret

NODE_ENV=development

CLIENT_URL=http://localhost:5173
```

## Actual `.env`

The real `.env` contains:

```env
PORT=5000

MONGO_URI=your_real_mongodb_connection_string

ACCESS_TOKEN_SECRET=your_real_access_secret

REFRESH_TOKEN_SECRET=your_real_refresh_secret

NODE_ENV=development

CLIENT_URL=http://localhost:5173
```

**Never commit the actual `.env` file to GitHub.**

The `.env.example` file can safely be committed because it contains placeholders only.

---

# 🚀 Installation

## 1. Clone the repository

```bash
git clone <your-repository-url>
cd ZenMart
```

---

# 🔧 Backend Setup

Move into the backend directory:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create:

```text
backend/.env
```

Use:

```text
backend/.env.example
```

as the template.

Configure your actual MongoDB connection string and JWT secrets.

---

# 🎨 Frontend Setup

Open another terminal.

Move into the frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

---

# ▶️ Running the Project

## Start Backend

From:

```text
ZenMart/backend
```

run:

```bash
npm run dev
```

Example backend URL:

```text
http://localhost:5000
```

---

## Start Frontend

From:

```text
ZenMart/frontend
```

run:

```bash
npm run dev
```

Example frontend URL:

```text
http://localhost:5173
```

---

# 🧪 Request Lifecycle

## Login Request

```text
Login.jsx
    │
    ▼
useAuth().login()
    │
    ▼
loginUser()
    │
    ▼
POST /api/auth/login
    │
    ▼
Express Route
    │
    ▼
Validation
    │
    ▼
Auth Controller
    │
    ▼
bcrypt.compare()
    │
    ▼
JWT Generation
    │
    ├──────────────┐
    ▼              ▼
Access Token    Refresh Token
    │              │
    ▼              ▼
Memory        HttpOnly Cookie
    │
    ▼
GET /api/auth/me
    │
    ▼
AuthContext.user
```

---

## Add Product Request

```text
AddProduct.jsx
      │
      ▼
React Hook Form
      │
      ▼
ProductContext
      │
      ▼
product.api.js
      │
      ▼
Axios
      │
      ▼
POST /api/products
      │
      ▼
Authentication
      │
      ▼
Validation
      │
      ▼
Controller
      │
      ▼
MongoDB
      │
      ▼
Response
      │
      ▼
ProductContext
      │
      ▼
Products Page
```

---

# ❌ Error Handling

Errors can occur at multiple levels.

## Frontend

Handles:

- Form validation errors
- API errors
- Product loading errors
- Delete errors
- Login errors
- Registration errors
- Session restoration errors

## Backend

Handles:

- Invalid input
- Invalid MongoDB ID
- Duplicate email
- Invalid credentials
- Missing access token
- Invalid access token
- Invalid refresh token
- Expired refresh token
- Product not found
- Database errors

General flow:

```text
Error
  │
  ▼
Backend
  │
  ▼
HTTP Response
  │
  ▼
Axios
  │
  ▼
Context / Component
  │
  ▼
User-friendly Error Message
```

---

# 🧹 Development Notes

## Why Context API instead of Redux?

The application's shared state is relatively small.

The main shared states are:

```text
Authentication
Products
```

Therefore, Context API is sufficient for this project.

Redux would introduce additional complexity without being necessary for the current application.

---

## Why separate API modules?

Instead of writing Axios requests directly inside components:

```text
Component
    │
    ▼
Context
    │
    ▼
API Module
    │
    ▼
Axios
```

This keeps API communication separate from UI logic.

---

## Why separate Context and API layers?

Each layer has a clear responsibility:

```text
API Module
    ↓
Communicates with backend

Context
    ↓
Manages shared application state

Component
    ↓
Displays UI and handles interaction
```

---

# 🔮 Future Improvements

Possible future features:

- Product search
- Category filtering
- Pagination
- Product detail page
- User profile
- Image upload instead of image URLs
- Admin/user roles
- Shopping cart
- Order management
- Wishlist
- Product reviews
- Password reset
- Email verification
- Rate limiting
- Swagger/OpenAPI documentation
- Automated tests
- Production deployment
- Environment-based frontend API URL
- Centralized error handling

---

# 🧭 Quick Mental Model

If you return to this project after a few months, remember this:

```text
                         ZENMART
                            │
             ┌──────────────┴──────────────┐
             │                             │
         FRONTEND                       BACKEND
             │                             │
           React                         Express
             │                             │
        React Router                  Middleware
             │                             │
        Context API                    Validation
             │                             │
           Axios                      Controllers
             │                             │
             │                           Models
             │                             │
             └────────── HTTP ──────────────┘
                                           │
                                           ▼
                                        MongoDB
```

---

# 🔐 Authentication

```text
Register
   │
   ▼
Login
   │
   ├───────────────┐
   ▼               ▼
Access Token    Refresh Token
   │               │
   ▼               ▼
Memory        HttpOnly Cookie
   │               │
   │               ▼
   │            Database
   │
   ▼
Protected API Requests
   │
   ▼
401?
   │
   ▼
Refresh Token
   │
   ▼
New Access Token
   │
   ▼
Retry Request
```

---

# 🛒 Products

```text
Products Page
      │
      ├── GET products
      │
      ├── Add Product
      │       │
      │       └── POST
      │
      ├── Edit Product
      │       │
      │       └── PUT
      │
      └── Delete Product
              │
              └── DELETE
```

---

# 🧠 Frontend Architecture

```text
                    React
                      │
        ┌─────────────┼─────────────┐
        │             │             │
       Pages      Components     Context
        │             │             │
        │             │       ┌─────┴─────┐
        │             │       │           │
        │             │    AuthContext ProductContext
        │             │       │           │
        └─────────────┴───────┴─────┬─────┘
                                    │
                              API Modules
                                    │
                                  Axios
                                    │
                                    ▼
                                Backend
```

---

# 👨‍💻 Author

**Sahil Sahu**

Full-Stack E-Commerce Project — **ZenMart**
