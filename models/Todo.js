const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true, // This task is now required
    },
    completed: {
        type: String,
        default: 'false', // Default value is 'false'
    },
    createAt: {
        type: Date,
        default: Date.now, // Default value is the current date and time
    },
});

// Create and export the model
module.exports = mongoose.model('Todo', TodoSchema);

// In this code, schema means the structure of the document, it defines the fields and their types. A model is a compiled version of the schema, it provides an interface to interact with the database for that specific schema. In this case, we are creating a model named 'Todo' based on the TodoSchema, and exporting it so it can be used in other parts of the application. 
// if we compare this to SQL databases, the schema is like the table definition, and the model is like the table itself that we can use to perform operations like insert, update, delete, and query.

// in simple terms, a schema is like a blueprint that defines the structure of the data, while a model is like a tool that allows us to interact with that data in the database.