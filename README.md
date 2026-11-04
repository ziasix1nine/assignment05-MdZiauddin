# Assignment 05 - Express API

## Setup

1. Install Node.js 22 or later.
2. Clone the repository.
3. Install dependencies:

   ```bash
   npm install

4. Start the development server:
npm run dev

5. Open http://localhost:3000.

My Collection
This project manages a sneaker collection with five initial records.

Each sneaker contains:
- id: Server-generated ID
- name: Sneaker name
- sizeUS: US shoe size
- type: running, basketball, or casual
- email: Contact email

## Predictions

| Request | Predicted Status | Predicted Response |
|---|---|---|
| GET / | 200 | Welcome message |
| GET /sneakers/stats | 200 | Collection statistics |
| GET /sneakers/2 | 200 | Nike Pegasus details |
| GET /sneakers/999 | 404 | Sneaker not found |
| GET /nothing-here | 404 | Not found |

## Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Welcome message and available endpoints |
| GET | `/sneakers` | Get all sneakers |
| GET | `/sneakers?q=nike` | Search sneakers by name |
| GET | `/sneakers?min=10&max=12` | Filter by shoe size |
| GET | `/sneakers?limit=2` | Limit returned results |
| GET | `/sneakers/stats` | Get collection statistics |
| GET | `/sneakers/:id` | Get a sneaker by ID |
| POST | `/sneakers` | Add a new sneaker |

## Route Order

The `/stats` route is defined before the `/:id` route. This prevents Express from interpreting `stats` as a sneaker ID.

The 404 handler is placed after the router so that valid routes can be matched first.


## Test Log

| Test | Expected Result | Actual Result |
|---|---|---|
| GET `/` | 200 OK | Passed |
| GET `/sneakers` | 200 OK, five sneakers | Passed |
| GET `/sneakers/stats` | 200 OK, collection statistics | Passed |
| GET `/sneakers/2` | 200 OK, sneaker details | Passed |
| GET `/sneakers/999` | 404 Not Found | Verify |
| GET `/nothing-here` | 404 Not Found | Verify |
| GET `/sneakers?min=10` | 200 OK, three results | Passed |
| GET `/sneakers?limit=2` | 200 OK, count 5 and two results | Passed |
| POST valid sneaker | 201 Created | Passed |
| POST invalid size | 400 Bad Request | Passed |
| POST invalid category | 400 Bad Request | Passed |
| POST invalid email | 400 Bad Request | Passed |
| POST short name | 400 Bad Request | Passed |
| POST unexpected field | 400 Bad Request | Passed |
| POST uppercase category | 201 Created, stored lowercase | Passed |



## Reflection

### 1. What did I learn about Express routing?
I learned how to create routes using Express Router and how route order affects which endpoint handles a request.

### 2. Why is middleware order important?
Middleware runs in the order it is registered. For example, the request logger and URL-encoded body parser must run before the routes that depend on them.

### 3. What was the most challenging part?
Implementing query and POST validation was the most challenging part. I learned how to validate user input and return appropriate HTTP status codes and error messages.