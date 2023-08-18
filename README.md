# E-Commerce Node.js API

This is an E-Commerce API built with Node.js and MongoDB, providing various functionalities for user management, product categories, and orders.

## Features

- User Sign Up and Sign In
- Add and remove products from user's cart
- Place orders and view order history
- Retrieve product categories and details
- Swagger API documentation

## Prerequisites

- Node.js (v14 or higher)
- MongoDB database
- npm or yarn package manager

## Installation

1. Clone the repository:

   ```bash
   git clone <repository_url>
   cd e-commerce-node-api

2. Install the dependencies:

   ```bash
   npm install

3. Create a .env file in the root directory and add your MongoDB connection string:

   ```env
   CONNECTION_URL=your_mongodb_connection_string
   PORT=5000

4. Start the server:

   ```bash
   npm start

5. Open your browser and navigate to http://localhost:5000/api-docs to access the Swagger API documentation.

## API Endpoints
  Detailed API documentation can be found in the Swagger documentation accessible at http://localhost:5000/api-docs.

## Directory Structure
1. 
   ```bash 
   e-commerce-node-api/
    ├── controllers/ # Route handlers
    ├── models/ # Mongoose models
    ├── routes/ # API route definitions
    ├── middleware/ # Middleware functions
    ├── index.js # Express app setup
    ├── .env # Environment variables
    ├── package.json # Project dependencies
    └── README.md # Project documentation


## Contributing
  Contributions are welcome! If you find any issues or have suggestions for improvements, feel free to open an issue or create a pull request.

## License
This project is licensed under the MIT License.

```vbnet
 Replace `<repository_url>` with the actual URL of your GitHub repository. Make sure to update 