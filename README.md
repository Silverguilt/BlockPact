# BlockPact
BlockPact4 is a simple blockchain application built with Node.js. It allows users to interact with a blockchain network, create new blocks, and retrieve existing blocks. The application is designed to demonstrate basic blockchain concepts such as block creation, mining, and validation.

Getting Started
To get started with BlockPact4, follow these steps:

Prerequisites
Node.js installed on your machine
npm (Node Package Manager)
Installation
Clone this repository to your local machine.
Navigate to the project directory in your terminal.
Run the following command to install the required dependencies:
bash
Copy code
npm install
Starting the Server
To start the server, run the following command:

bash
Copy code
npm run node-1
This will start the server on port 3001 by default.

Testing with Postman
Postman is recommended for testing the application's endpoints. Below are the endpoints available for testing:

GET /api/v1/blocks: Retrieve all blocks in the blockchain.
GET /api/v1/blocks/:id: Retrieve a block by its ID.
POST /api/v1/blocks: Create a new block. Send block data as JSON in the request body.
Make sure to replace :id with the ID of the block you want to retrieve.

Example Usage
Start the server using npm run node-1.
Use Postman to send requests to the server's endpoints.
Create new blocks and retrieve existing blocks for testing.
