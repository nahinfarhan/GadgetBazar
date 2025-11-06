# GadgetBazar API Contract

This document defines the API contract between frontend and backend teams. All endpoints, request/response formats, and error handling are specified here.

## Base URL

- **Development**: `http://localhost:8000/api`
- **Production**: `https://api.gadgetbazar.com` (TBD)

## Authentication

All authenticated endpoints require a Firebase JWT token in the Authorization header:
```
Authorization: Bearer <firebase_jwt_token>
```

## Response Format

### Success Response
```json
{
  "success": true,
  "data": {
    // Response data here
  },
  "message": "Success message"
}
```

### Error Response
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable error message",
    "details": {} // Optional additional error details
  }
}
```

## Endpoints

### Authentication

#### POST /auth/verify-token
Verify Firebase token and get/create user profile.

**Request:**
```json
{
  "firebaseToken": "string"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "string",
      "email": "string",
      "displayName": "string",
      "role": "customer|admin",
      "createdAt": "ISO8601",
      "updatedAt": "ISO8601"
    }
  }
}
```

### Products

#### GET /products
Get paginated list of products with optional filtering.

**Query Parameters:**
- `page` (number, default: 1)
- `limit` (number, default: 20, max: 100)
- `category` (string, optional)
- `search` (string, optional)
- `minPrice` (number, optional)
- `maxPrice` (number, optional)
- `inStock` (boolean, optional)

**Response:**
```json
{
  "success": true,
  "data": {
    "products": [
      {
        "id": "string",
        "name": "string",
        "description": "string",
        "price": 2500,
        "originalPrice": 3000,
        "images": ["url1", "url2"],
        "category": {
          "id": "string",
          "name": "string"
        },
        "rating": 4.5,
        "reviewCount": 128,
        "inStock": true,
        "stockQuantity": 50,
        "isNew": true,
        "isDeal": false,
        "createdAt": "ISO8601",
        "updatedAt": "ISO8601"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 10,
      "totalItems": 200,
      "hasNext": true,
      "hasPrev": false
    }
  }
}
```

#### GET /products/:id
Get single product details.

**Response:**
```json
{
  "success": true,
  "data": {
    "product": {
      "id": "string",
      "name": "string",
      "description": "string",
      "specifications": {
        "brand": "string",
        "model": "string",
        "warranty": "string"
      },
      "price": 2500,
      "originalPrice": 3000,
      "images": ["url1", "url2"],
      "category": {
        "id": "string",
        "name": "string"
      },
      "rating": 4.5,
      "reviewCount": 128,
      "reviews": [
        {
          "id": "string",
          "userId": "string",
          "userName": "string",
          "rating": 5,
          "comment": "string",
          "createdAt": "ISO8601"
        }
      ],
      "inStock": true,
      "stockQuantity": 50,
      "isNew": true,
      "isDeal": false,
      "createdAt": "ISO8601",
      "updatedAt": "ISO8601"
    }
  }
}
```

### Categories

#### GET /categories
Get all product categories.

**Response:**
```json
{
  "success": true,
  "data": {
    "categories": [
      {
        "id": "string",
        "name": "string",
        "image": "url",
        "productCount": 25,
        "createdAt": "ISO8601"
      }
    ]
  }
}
```

### Cart (Authenticated)

#### GET /cart
Get user's cart items.

**Response:**
```json
{
  "success": true,
  "data": {
    "cart": {
      "id": "string",
      "userId": "string",
      "items": [
        {
          "id": "string",
          "productId": "string",
          "product": {
            "id": "string",
            "name": "string",
            "price": 2500,
            "image": "url",
            "inStock": true
          },
          "quantity": 2,
          "addedAt": "ISO8601"
        }
      ],
      "totalItems": 3,
      "totalAmount": 7500,
      "updatedAt": "ISO8601"
    }
  }
}
```

#### POST /cart/items
Add item to cart.

**Request:**
```json
{
  "productId": "string",
  "quantity": 1
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "cartItem": {
      "id": "string",
      "productId": "string",
      "quantity": 1,
      "addedAt": "ISO8601"
    }
  },
  "message": "Item added to cart"
}
```

#### PUT /cart/items/:itemId
Update cart item quantity.

**Request:**
```json
{
  "quantity": 3
}
```

#### DELETE /cart/items/:itemId
Remove item from cart.

### Wishlist (Authenticated)

#### GET /wishlist
Get user's wishlist.

#### POST /wishlist/items
Add item to wishlist.

#### DELETE /wishlist/items/:itemId
Remove item from wishlist.

### Orders (Authenticated)

#### GET /orders
Get user's order history.

#### GET /orders/:id
Get specific order details.

#### POST /orders
Create new order.

**Request:**
```json
{
  "items": [
    {
      "productId": "string",
      "quantity": 2,
      "price": 2500
    }
  ],
  "shippingAddress": {
    "name": "string",
    "phone": "string",
    "address": "string",
    "city": "string",
    "postalCode": "string"
  },
  "paymentMethod": "cod|bkash|card",
  "paymentDetails": {}
}
```

### Stock Requests

#### POST /stock-requests
Request stock notification for out-of-stock product.

**Request:**
```json
{
  "productId": "string",
  "email": "string"
}
```

## Error Codes

- `INVALID_TOKEN` - Invalid or expired authentication token
- `PRODUCT_NOT_FOUND` - Product does not exist
- `OUT_OF_STOCK` - Product is out of stock
- `INVALID_QUANTITY` - Invalid quantity specified
- `CART_ITEM_NOT_FOUND` - Cart item does not exist
- `ORDER_NOT_FOUND` - Order does not exist
- `VALIDATION_ERROR` - Request validation failed
- `INTERNAL_ERROR` - Server internal error

## Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `409` - Conflict
- `422` - Validation Error
- `500` - Internal Server Error

## Notes for Implementation

1. All timestamps should be in ISO8601 format
2. Prices are in BDT (Bangladeshi Taka) as integers (e.g., 2500 = 25.00 BDT)
3. Images should be full URLs
4. Pagination should be consistent across all list endpoints
5. Search should be case-insensitive and support partial matches
6. All authenticated endpoints must validate Firebase tokens
7. Rate limiting should be implemented for public endpoints

## Testing

Use the following test data for development:

### Test Products
- Power Bank 20000mAh (ID: test-product-1)
- Smart Watch Pro (ID: test-product-2)
- Bluetooth Headphones (ID: test-product-3)

### Test Categories
- Power Bank (ID: test-category-1)
- Wearables (ID: test-category-2)
- Headphones (ID: test-category-3)

This contract should be updated as the API evolves. All changes must be communicated to the frontend team.