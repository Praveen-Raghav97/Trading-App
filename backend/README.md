# Opinion Trading App

## 🚀 Project Introduction..

This is the backend setup for a trading application using Express.js. It allows users to place trades on live events, view event details, and manage trades. The application includes user authentication, role-based access control, and real-time updates using Socket.io.

## Table of Contents

- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [API Documentation](#api-documentation)
  - [Authentication](#authentication)
  - [Events](#events)
  - [Trades](#trades)
  - [Admin](#admin)
- [Postman Collection](#postman-collection)
- [License](#license)

## Project Structure

- **src/app.js**: Entry point of the application. Sets up the Express app, middleware, and routes.
- **src/controllers/**: Contains the controller classes with methods to handle various routes.
- **src/routes/**: Exports the route configuration functions.
- **src/models/**: Defines the Mongoose schemas for Users, Events, Trades, and Market Data.
- **src/middleware/**: Contains middleware for authentication and role-based access control.
- **src/utils/**: Utility functions and configurations.
- **.env**: Environment variables configuration file.
- **package.json**: NPM configuration file listing dependencies and scripts.

---- 

## 📡 API Documentation

### Authentication

#### 1. Register User
Endpoint: POST /api/auth/register
Description: Register a new user.


**Request Body:**
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "user"
}
```
**Response:**
```json
{
  "message": "User registered successfully",
  "token": "jwt_token_here"
}
```

#### 2. Login User
Endpoint: POST /api/auth/login
Description: Login a user.
Request Body:
**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```
**Response:**
```json
{
  "message": "Login successful",
  "token": "jwt_token_here"
}
```
#### List Events
Endpoint: GET /api/events
Description: Get a list of all events.
 
 **Response:**

[
  {
    "_id": "event_id",
    "name": "Event Name",
    "date": "2025-03-15T00:00:00.000Z",
    "location": "Location",
    "status": "upcoming",
    "outcome": "draw",
    "odds": 1.5,
    "createdAt": "2025-03-01T00:00:00.000Z"
  }
] ,

Create Event (Admin Only)
Endpoint: POST /api/admin/events
Description: Create a new event.

  **Request Body:**
{
  "name": "Event Name",
  "date": "2025-03-15T00:00:00.000Z",
  "location": "Location",
  "status": "upcoming",
  "odds": 1.5
},

  **Response:**
{
  "_id": "event_id",
  "name": "Event Name",
  "date": "2025-03-15T00:00:00.000Z",
  "location": "Location",
  "status": "upcoming",
  "outcome": "draw",
  "odds": 1.5,
  "createdAt": "2025-03-01T00:00:00.000Z"
},

### Trades
#### 1. Place a Trade
Endpoint: POST /api/trades
Description: Place a new trade.


**Headers:**
```plaintext
Authorization: Bearer jwt_token_here
```
**Request Body:**
```json
{
  "eventId": "event_id",
  "amount": 100,
  "type": "buy"
}
```
**Response:**
```json
{
  "_id": "trade_id",
  "userId": "user_id",
  "eventId": "event_id",
  "amount": 100,
  "type": "buy",
  "status": "open",
  "result": "pending",
  "createdAt": "2025-03-01T00:00:00.000Z"
}
```

#### 2. Get  Trades
```http
GET /api/trades
```
**Headers:**
```plaintext
Authorization: Bearer jwt_token_here
```
**Response:**
```json
[
  {
    "_id": "trade_id",
    "userId": "user_id",
    "eventId": "event_id",
    "amount": 100,
    "type": "buy",
    "status": "open",
    "result": "pending",
    "createdAt": "2025-03-01T00:00:00.000Z"
  }
]
```
#### 3. Check Trade Outcomes
Endpoint: GET /api/trades
Description: Get a list of all trades for the authenticated user.
 
 **Response:**
[
  {
    "_id": "trade_id",
    "userId": "user_id",
    "eventId": "event_id",
    "amount": 100,
    "type": "buy",
    "status": "open",
    "result": "pending",
    "createdAt": "2025-03-01T00:00:00.000Z"
  }
],

#### 4. Settle Trade (Admin Only)
Endpoint: PUT /api/trades/:id/settle
Description: Settle a trade based on event outcomes.

 **Response:**

{
  "_id": "trade_id",
  "userId": "user_id",
  "eventId": "event_id",
  "amount": 100,
  "type": "buy",
  "status": "closed",
  "result": "win",
  "createdAt": "2025-03-01T00:00:00.000Z"
},

# Admin
#### 5.List All Trades (Admin Only)
Endpoint: GET /api/admin/trades
Description: Get a list of all trades.
 
 **Response:**
[
  {
    "_id": "trade_id",
    "userId": "user_id",
    "eventId": "event_id",
    "amount": 100,
    "type": "buy",
    "status": "closed",
    "result": "win",
    "createdAt": "2025-03-01T00:00:00.000Z"
  }
]
---

## Getting Started

### Prerequisites

- Node.js (v18+ or higher)
- MongoDB

### Installation

1. **Clone the repository**:

```bash
git clone https://github.com/your-username/trading-app.git
cd trading-app/backend
```

## Environment Variables

2.Install Dependencies: Run npm install to install the required packages.

3.Create a .env file in the root directory and add the following environment variables:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/trading-app
JWT_SECRET=your_jwt_secret
API_URL=https://api.the-odds-api.com/v4/sports/upcoming/odds
API_KEY=your_api_key
```

4.Run the Application: Start the server using npm start.

The server will start on http://localhost:3000.


## 📦 Postman Collection
Import the Postman collection by using the following link or JSON file:

- [Download Postman Collection](https://example.com/postman-collection.json)

---

## 🛠️ Contribution
Feel free to fork the repo, make feature branches, and submit PRs. Ensure you run all tests and linting before making a pull request.

```bash
# Run tests
npm test

# Run linting
npm run lint
```

---

**Architecture and Data Flow**
# Architecture
## The application follows a typical MVC (Model-View-Controller) architecture:

Models: Define the data structure and interact with the database.
Controllers: Handle the business logic and process incoming requests.
Routes: Define the endpoints and map them to the corresponding controller methods.
Middleware: Handle authentication, authorization, and other pre-processing tasks.

# Data Flow
1. Client Request: The client sends a request to the server (e.g., to place a trade).
2. Route Handling: The request is routed to the appropriate controller method 3.based on the endpoint.
3. Controller Logic: The controller processes the request, interacts with the models, and performs the necessary business logic.
4. Database Interaction: The models interact with the MongoDB database to fetch or store data.
5. Response: The controller sends a response back to the client with the requested data or confirmation of the action performed.

**Challenges and Solutions**

# Challenge 1: Real-time Updates
Problem: Ensuring that all clients receive real-time updates for events and trades.

Solution: Implemented Socket.io to handle real-time communication between the server and clients. This allows the server to broadcast updates to all connected clients whenever there is a change in events or trades.

# Challenge 2: Role-based Access Control
Problem: Restricting certain actions (e.g., creating events, settling trades) to admin users only.

Solution: Implemented role-based access control using middleware. The middleware checks the user's role before allowing access to specific endpoints.

# Challenge 3: Data Consistency
Problem: Ensuring data consistency when multiple clients are interacting with the same data (e.g., placing trades on the same event).

Solution: Used Mongoose transactions to ensure atomic operations and maintain data consistency. This ensures that all related operations are completed successfully or none at all.


## 📄 License
This project is licensed under the MIT License.



