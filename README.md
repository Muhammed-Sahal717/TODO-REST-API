# To-Do List REST API

A simple and robust RESTful API for managing a to-do list, built with Node.js, Express, and MongoDB. This project serves as a foundational example of a backend service with full CRUD (Create, Read, Update, Delete) functionality.

---

## Features

-   Create, Read, Update, and Delete to-do items.
-   Connects to a persistent MongoDB database.
-   Uses Mongoose for data modeling and validation.
-   Follows RESTful API design principles.

---

## Prerequisites

Before you begin, ensure you have the following installed:
-   [Node.js](https://nodejs.org/en/)
-   npm (comes with Node.js)
-   A free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account

---

## Setup & Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git](https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git)
    ```

2.  **Navigate to the project directory:**
    ```bash
    cd simple-server
    ```

3.  **Install dependencies:**
    ```bash
    npm install
    ```

4.  **Create a `.env` file** in the root of the project and add your MongoDB connection string:
    ```
    MONGO_URI=mongodb+srv://<username>:<password>@cluster.....
    ```

5.  **Start the server:**
    ```bash
    node server.js
    ```
    The server will be running on `http://localhost:3000`.

---

## API Endpoints

### Get All To-Dos
-   **Method:** `GET`
-   **Endpoint:** `/todos`
-   **Description:** Retrieves a list of all to-do items.

### Create a New To-Do
-   **Method:** `POST`
-   **Endpoint:** `/todos`
-   **Description:** Adds a new to-do item to the list.
-   **Request Body (JSON):**
    ```json
    {
        "task": "My new important task"
    }
    ```

### Get a Single To-Do
-   **Method:** `GET`
-   **Endpoint:** `/todos/:id`
-   **Description:** Retrieves a single to-do item by its unique ID.

### Update a To-Do
-   **Method:** `PATCH`
-   **Endpoint:** `/todos/:id`
-   **Description:** Updates a to-do item's properties (e.g., its task or completion status).
-   **Request Body (JSON):**
    ```json
    {
        "completed": true,
        "task": "An updated task description"
    }
    ```

### Delete a To-Do
-   **Method:** `DELETE`
-   **Endpoint:** `/todos/:id`
-   **Description:** Deletes a to-do item by its unique ID.