## PHYTECH — Scalable Full-Stack E-Commerce Platform

PHYTECH is a production-ready, full-stack e-commerce platform designed with scalability, security, and clean architecture at its core. The project focuses on building real-world backend systems backed by a modern frontend, following product-company engineering standards.

The platform supports secure authentication, role-based access control, product and cart management, and is deployed end-to-end in the cloud.

# Why PHYTECH

Designed like a real product, not a demo app

Clean separation of concerns (controllers, routes, models, middleware)

Secure, token-based authentication

Role-driven APIs for sellers and admins

Built to scale with modular architecture and optimized database access

# Tech Stack
Backend

Node.js – Runtime environment

Express.js – REST API framework

MongoDB – NoSQL database

Mongoose – ODM for schema modeling and data validation

JWT – Secure authentication and authorization

Deployment: Render

Frontend

React.js – Component-based UI framework

React Router – Client-side routing

Deployment: Netlify

**Core Features**
**🔐 Authentication & Authorization**

User registration and login

JWT-based secure authentication

Role upgrade flow (User → Seller/Admin)

Protected routes using middleware

🛒** Product Management**

Add, update, and fetch products

Advanced querying:

Category filtering

Keyword search

Sorting (price, name, etc.)

Pagination for performance

Role-restricted product creation and updates

**🧺 Cart Management**

Add items to cart

Update product quantities

Persistent cart per authenticated user

Clean and modular cart logic

**API Design
Authentication**

POST /api/auth/register – Register new user

POST /api/auth/login – Login and receive JWT

PUT /api/auth/upgrade-role – Upgrade user role (JWT required)

**Products**

GET /api/products – Fetch products with filters and pagination

POST /api/products/add – Add new product (Seller/Admin)

PUT /api/products/:id – Update product details

Query Parameters Supported:

category

search

sort

page

limit

Cart

POST /api/cart/add – Add item to cart

PUT /api/cart/update – Update item quantity

GET /api/cart – Fetch user cart

**Project Architecture (Backend)**
backend/
├── controllers/     # Business logic
├── routes/          # API routing
├── models/          # Mongoose schemas
├── middleware/      # JWT verification & auth guards
├── config/          # Environment & DB config
├── app.js
└── server.js


This structure ensures:

High maintainability

Easy feature extension

Clear ownership of logic

## Live Deployments

**Backend API:**
https://backend-j6gi.onrender.com

**Frontend App:**
https://spontaneous-sable-f1b9e5.netlify.app/

Engineering Highlights

REST-first API design

Secure JWT authentication flow

Role-based access control

Optimized MongoDB read/write operations

Clean MVC-style architecture

Production deployments with cloud hosting
