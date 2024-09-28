# Library Management API

This API allows you to manage books in a library system, providing functionalities to create, read, update, and delete book records.

## Features

1. **Create a Book**: Add new books to the system with title, author, published date, and genre.
2. **List Books**: Retrieve a list of all available books.
3. **Get Book Details**: Fetch detailed information for a specific book by its ID.
4. **Update a Book**: Modify the information of an existing book.
5. **Delete a Book**: Remove a book from the inventory logically.
6. **Input Validation**: Validate input data to ensure correctness.

## Requirements

- Node.js (version 14 or higher)
- PostgreSQL or MongoDB database
- NestJS framework
- TypeORM (for PostgreSQL) or Mongoose (for MongoDB)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/library-management-api.git
cd library-management-api
```

### 2. Install Dependencies

Run the following command to install all necessary dependencies:

```bash
npm install
```

### 3. Configure Database

Create a .env file in the root directory and configure your database settings:

- DB_USER= postgres.provider
- DB_HOST= provider
- DB_PASSWORD= password
- DB_DATABASE= postgres
- DB_PORT= 6543

### 4. Start the Server

To start the API, run:

```bash
npm run start
```

The server will be running on http://localhost:3000.