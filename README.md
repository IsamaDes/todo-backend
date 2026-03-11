Todo Backend

This is the backend API for the Todo application — a simple yet powerful task management tool. It handles user authentication, task creation, updates, and deletions, while exposing clean and secure RESTful endpoints.

 Frontend App: https://todo-frontend-rosy-five.vercel.app/

Features

Authentication — Secure user signup and login using JSON Web Token (JWT)

Todo Management — Create, read, update, and delete todos

Validation — Request data validation for reliability

RESTful API — Clean and predictable endpoint structure

Database Integration — Uses MongoDB for data persistence

Tech Stack

Runtime: Node.js

Framework: Express.js

Database: MongoDB + Mongoose

Auth: JSON Web Token (JWT)

Validation: Joi / custom middleware

Getting Started

1. Clone the repository
   git clone https://github.com/your-username/todo-backend.git
   cd todo-backend

2. Install dependencies
   npm install

3. Create a .env file

You can copy the contents from .env.example below:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

4. Start the development server
   npm run dev

API Endpoints
Method Endpoint Description Auth Required
POST /api/auth/signup Register a new user No
POST /api/auth/login Login user No
GET /api/todos Get all todos Yes
POST /api/todos Create a todo Yes
PUT /api/todos/:id Update a todo Yes
DELETE /api/todos/:id Delete a todo Yes

Project Structure
todo-backend/
│
├── controllers/ # Route logic
├── models/ # Mongoose schemas
├── routes/ # API route definitions
├── middleware/ # Auth & error handlers
├── server.js # App entry point
└── .env.example # Example environment variables

Testing

Run tests using:

npm test

Notes

Ensure MongoDB is running locally or use a cloud service like MongoDB Atlas.

The backend must be running for the Frontend App
to function properly.

License

This project is licensed under the MIT License — you are free to use, modify, and distribute this project with attribution.

Built with ❤️ and using Node.js + Express.js
