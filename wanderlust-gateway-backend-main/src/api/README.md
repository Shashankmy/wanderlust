# Wanderlust Travel API

This document provides information about the Wanderlust Travel API, including endpoints, request and response formats.

## Base URL

When deployed on Supabase Edge Functions, your API will be available at:

```
https://[YOUR_SUPABASE_ID].supabase.co/functions/v1
```

## Authentication

Most endpoints require authentication. Include the Supabase JWT token in the `Authorization` header:

```
Authorization: Bearer [YOUR_JWT_TOKEN]
```

For admin-only endpoints, the user must have the appropriate role.

## Destinations

### Get All Destinations

```
GET /destinations
```

#### Response

```json
{
  "destinations": [
    {
      "id": "1",
      "name": "Bali",
      "country": "Indonesia",
      "description": "...",
      "shortDescription": "...",
      "imageUrl": "...",
      "rating": 4.7,
      "activities": ["Surfing", "Temple Visits"],
      "price": 1200,
      "currency": "USD",
      "continent": "Asia"
    },
    // more destinations...
  ]
}
```

### Get Destination by ID

```
GET /destinations/:id
```

#### Response

```json
{
  "destination": {
    "id": "1",
    "name": "Bali",
    "country": "Indonesia",
    "description": "...",
    "shortDescription": "...",
    "imageUrl": "...",
    "rating": 4.7,
    "activities": ["Surfing", "Temple Visits"],
    "price": 1200,
    "currency": "USD",
    "continent": "Asia"
  }
}
```

### Get Destinations by Continent

```
GET /destinations/continent/:continent
```

#### Response

```json
{
  "destinations": [
    // destinations in the specified continent
  ]
}
```

### Create Destination (Admin only)

```
POST /destinations
```

#### Request Body

```json
{
  "name": "New Destination",
  "country": "Country Name",
  "description": "...",
  "shortDescription": "...",
  "imageUrl": "...",
  "rating": 4.5,
  "activities": ["Activity 1", "Activity 2"],
  "price": 1000,
  "currency": "USD",
  "continent": "Europe"
}
```

#### Response

```json
{
  "destination": {
    "id": "new-id",
    "name": "New Destination",
    // other fields...
  }
}
```

### Update Destination (Admin only)

```
PUT /destinations/:id
```

#### Request Body

```json
{
  "name": "Updated Name",
  "price": 1100
  // include only fields to update
}
```

#### Response

```json
{
  "destination": {
    "id": "1",
    "name": "Updated Name",
    // other fields...
  }
}
```

### Delete Destination (Admin only)

```
DELETE /destinations/:id
```

#### Response

```json
{
  "success": true,
  "message": "Destination deleted"
}
```

## Inquiries

### Submit Inquiry

```
POST /inquiries
```

#### Request Body

```json
{
  "name": "Visitor Name",
  "email": "visitor@example.com",
  "destination": "Bali",
  "message": "I'm interested in visiting Bali..."
}
```

#### Response

```json
{
  "inquiry": {
    "id": "new-id",
    "name": "Visitor Name",
    "email": "visitor@example.com",
    "destination": "Bali",
    "message": "I'm interested in visiting Bali...",
    "createdAt": "2023-04-11T12:00:00Z"
  }
}
```

### Get All Inquiries (Admin only)

```
GET /inquiries
```

#### Response

```json
{
  "inquiries": [
    {
      "id": "1",
      "name": "Visitor Name",
      "email": "visitor@example.com",
      "destination": "Bali",
      "message": "...",
      "createdAt": "2023-04-11T12:00:00Z"
    },
    // more inquiries...
  ]
}
```

### Get Inquiry by ID (Admin only)

```
GET /inquiries/:id
```

#### Response

```json
{
  "inquiry": {
    "id": "1",
    "name": "Visitor Name",
    "email": "visitor@example.com",
    "destination": "Bali",
    "message": "...",
    "createdAt": "2023-04-11T12:00:00Z"
  }
}
```

### Delete Inquiry (Admin only)

```
DELETE /inquiries/:id
```

#### Response

```json
{
  "success": true,
  "message": "Inquiry deleted"
}
```

## Error Responses

All endpoints may return the following error responses:

- `400 Bad Request`: Invalid request parameters
- `401 Unauthorized`: Missing or invalid authentication
- `403 Forbidden`: Insufficient permissions
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server-side error

Error response format:

```json
{
  "error": "Error message"
}
```
