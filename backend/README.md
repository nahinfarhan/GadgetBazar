# GadgetBazar Backend

Backend API server for the GadgetBazar e-commerce platform.

## Overview

This directory contains the backend API server that provides:
- RESTful API endpoints
- Database management
- Authentication with Firebase
- Business logic implementation
- Data validation and security

## Getting Started

**Note**: This section will be completed by the backend developer.

### Prerequisites

- Node.js (v16 or higher) or Python 3.8+
- Database (PostgreSQL recommended as per SRS)
- Firebase Admin SDK credentials

### Installation

```bash
# Install dependencies
npm install
# or
pip install -r requirements.txt

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Run database migrations
npm run migrate
# or
python manage.py migrate

# Start development server
npm run dev
# or
python app.py
```

## API Documentation

The API follows the contract defined in [API_CONTRACT.md](../API_CONTRACT.md).

### Base URL
- Development: `http://localhost:8000/api`
- Production: TBD

### Authentication
All protected endpoints require a valid Firebase JWT token.

## Database Schema

Based on SRS requirements, the database includes:
- Users
- Products
- Categories
- Orders
- Order_Items
- Stock_Requests
- Reviews
- Cart_Items
- Wishlist_Items

## Environment Variables

Create `.env` file with:

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/gadgetbazar
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=gadgetbazar
DATABASE_USER=your_user
DATABASE_PASSWORD=your_password

# Firebase
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_PRIVATE_KEY=your_private_key
FIREBASE_CLIENT_EMAIL=your_client_email

# Server
PORT=8000
NODE_ENV=development

# Security
JWT_SECRET=your_jwt_secret
BCRYPT_ROUNDS=12

# External APIs
BKASH_API_KEY=your_bkash_key
PAYMENT_GATEWAY_URL=your_payment_url
```

## Scripts

```bash
# Development
npm run dev          # Start development server
npm run test         # Run tests
npm run test:watch   # Run tests in watch mode
npm run lint         # Run linter

# Production
npm run build        # Build for production
npm run start        # Start production server

# Database
npm run migrate      # Run database migrations
npm run seed         # Seed database with test data
npm run db:reset     # Reset database
```

## Testing

```bash
# Run all tests
npm test

# Run specific test file
npm test -- products.test.js

# Run tests with coverage
npm run test:coverage
```

## API Endpoints

### Authentication
- `POST /api/auth/verify-token` - Verify Firebase token

### Products
- `GET /api/products` - Get products with pagination/filtering
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create category (admin)

### Cart
- `GET /api/cart` - Get user cart
- `POST /api/cart/items` - Add item to cart
- `PUT /api/cart/items/:id` - Update cart item
- `DELETE /api/cart/items/:id` - Remove cart item

### Orders
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get order details
- `POST /api/orders` - Create new order

### Admin
- `GET /api/admin/dashboard` - Admin dashboard data
- `GET /api/admin/orders` - All orders management
- `PUT /api/admin/orders/:id` - Update order status

## Contributing

1. Follow the API contract specifications
2. Write tests for all endpoints
3. Use proper error handling and validation
4. Follow security best practices
5. Document any API changes

## Deployment

The backend will be deployed to [Platform TBD] with:
- Automatic deployments from `main` branch
- Environment-specific configurations
- Database migrations
- Health checks and monitoring

## Security Considerations

- Input validation and sanitization
- SQL injection prevention
- Rate limiting
- CORS configuration
- Secure headers
- Authentication token validation
- Data encryption at rest and in transit

---

**Backend Developer**: Please update this README with specific implementation details, chosen technology stack, and setup instructions.