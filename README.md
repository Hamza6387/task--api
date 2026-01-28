📝 Task Management REST API

A simple REST API built using Node.js, Express.js, and MongoDB (Mongoose) to manage tasks with full CRUD functionality.

🚀 Features

Create, read, update, and delete tasks

MongoDB for persistent storage

Input validation using Express middleware

Async database operations with Mongoose

🛠 Tech Stack

Node.js

Express.js

MongoDB

Mongoose

🔗 API Endpoints

GET /tasks – Get all tasks

POST /tasks/create – Create a task

GET /tasks/:id – Get task by ID

PUT /tasks/update/:id – Update a task

DELETE /tasks/delete/:id – Delete a task

🧩 Middleware
validateTask – Validates request body
checkTaskExist – Checks task existence before update/delete

▶️ Run Locally
npm install
node index.js


MongoDB must be running locally.

📌 Key Learning

REST API design

Express middleware

MongoDB integration using Mongoose

Async/await handling
