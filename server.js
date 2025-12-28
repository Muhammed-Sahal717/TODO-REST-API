const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from .env file

const Todo = require('./models/Todo'); // Import the Todo model, it means we are importing the Todo.js file from the models folder

// Initialize the express app
const app = express();
app.use(express.json()); // Middleware to parse JSON bodies, this is crucial for POST and PUT requests, without this, req.body will be undefined for JSON payloads, JSON playloads means the data sent in JSON format.

const PORT = process.env.PORT || 3000; // Use the port from environment variables or default to 3000
const MONGO_URI = process.env.MONGO_URI; // it means we are getting the MONGO_URI from the .env file, the term 'process.env' refers to the environment variables that are set in the operating system or in a .env file when using the dotenv package.

// --- DATABASE CONNECTION ---
mongoose
    .connect(MONGO_URI)
    .then(() => console.log('Successfully connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));


// --- ROUTES ---

// Get all todos
app.get('/todos', async (req, res) => { // the full form of req, res is request, response
    try {
        const todos = await Todo.find(); // Fetch all todos from the database
        res.json(todos); // Send the todos as JSON
    } catch (err) {
        res.status(500).json({ message: err.message }); // Handle errors, the 'message' property of the error object contains a human-readable description of the error that occurred.
    }
});

//in thid code block, we are defining a route to handle GET requests to the /todos endpoint. When a request is made to this endpoint, the server will attempt to fetch all todo items from the MongoDB database using the Todo model's find method. If successful, it will return the list of todos in JSON format. If there is an error during the database operation, it will respond with a 500 status code and an error message.




// POST a new todo
app.post('/todos', async (req, res) => {
    const todo = new Todo({
        task: req.body.task,
        completed: req.body.completed || 'false' // Default to 'false' if not provided
    });

    try {
        const newTodo = await todo.save(); // Save the new todo to the database
        res.status(201).json(newTodo); // Send back the new todo with a 201 status code
    } catch (err) {
        res.status(400).json({ message: err.message }); // Handle validation errors
    }
});

// In this code block, we are defining a route to handle POST requests to the /todos endpoint. When a request is made to this endpoint, the server will create a new todo item using the data provided in the request body. It uses the Todo model to create a new instance and then attempts to save it to the MongoDB database. If the save operation is successful, it responds with a 201 status code (indicating that a new resource has been created) and returns the newly created todo item in JSON format. If there are any validation errors or issues during the save operation, it responds with a 400 status code and an error message.

// Get a single todo by ID
app.get('/todos/:id', async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id); // Find the todo by ID, the term 'params' refers to the parameters in the URL path, in this case, ':id' is a route parameter that will be replaced with the actual ID of the todo when a request is made.
        
        //and 'findById' is a Mongoose method that retrieves a single document from the database by its unique identifier (ID). It is a shorthand for finding a document where the _id field matches the provided ID value.

        if (todo) {
            res.json(todo); // Send back the found todo as JSON
        } else {
            res.status(404).json({ message: 'Todo not found' }); // If not found, send a 404 status
        }
    } catch (err) {
        res.status(500).json({ message: err.message }); // Handle errors
    }
});
// to test this in thunder client, we can use the GET method and the endpoint: http://localhost:3000/todos/"the id of the todo we want to get", for example: http://localhost:3000/todos/64a7f0c8e4b0c8b1f8e4b0c8.

// In this code block, we are defining a route to handle GET requests to the /todos/:id endpoint, where :id is a placeholder for the unique identifier of a specific todo item. When a request is made to this endpoint with a specific ID, the server will attempt to find the corresponding todo item in the MongoDB database using the Todo model's findById method. If the todo item is found, it responds with the item in JSON format. If no item is found with the provided ID, it responds with a 404 status code and a "Todo not found" message. If there is an error during the database operation, it responds with a 500 status code and an error message.

// PATCH (update) a todo by ID
app.patch('/todos/:id', async (req, res) => {
    try {
        const updatedTodo = await Todo.findByIdAndUpdate(// 'findByIdAndUpdate' is a Mongoose method that finds a document by its ID and updates it with the provided data in one atomic operation. It takes three arguments: the ID of the document to update, an object containing the fields to update, and an options object.
            req.params.id,
            req.body,
            { new: true } // This option returns the updated document
        );
        if (!updatedTodo) return res.status(404).json({ message: 'Todo not found' });// If not found, send a 404 status
        res.json(updatedTodo); // Send back the updated todo
    } catch (err) {
        res.status(400).json({ message: err.message }); // Handle validation errors
    }
});
// In this code block, we are defining a route to handle PATCH requests to the /todos/:id endpoint, where :id is a placeholder for the unique identifier of a specific todo item. When a request is made to this endpoint with a specific ID, the server will attempt to update the corresponding todo item in the MongoDB database using the Todo model's findByIdAndUpdate method. The method takes the ID from the URL parameters and the updated data from the request body. The { new: true } option ensures that the updated document is returned in the response. If the todo item is successfully updated, it responds with the updated item in JSON format. If no item is found with the provided ID, it responds with a 404 status code and a "Todo not found" message. If there are any validation errors or issues during the update operation, it responds with a 400 status code and an error message.

// DELETE a todo by ID
app.delete('/todos/:id', async (req, res) => {
    try {
        const todo = await Todo.findByIdAndDelete(req.params.id);// 'findByIdAndDelete' is a Mongoose method that finds a document by its ID and deletes it from the database. It takes the ID of the document to delete as its argument and returns the deleted document if it was found and deleted, or null if no document with the specified ID was found.
        if (!todo) return res.status(404).json({ message: 'Todo not found' });
        res.status(204).send(); // No content
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});