# BlockPact

BlockPact4 is a simple blockchain application built with Node.js. It allows users to interact with a blockchain network, create new blocks, and retrieve existing blocks. The application is designed to demonstrate basic blockchain concepts such as block creation, mining, and validation.

## Getting Started

### Prerequisites

- Node.js installed on your machine
- npm (Node Package Manager)

### Installation

1. Clone this repository to your local machine.
2. Navigate to the project directory in your terminal.
3. Run the following command to install the required dependencies:

   ```bash
   npm install
   ```

Starting the Server

To start the server, run the following command:

   ```bash
   npm run node-1
   ```

Testing with Postman

Postman is recommended for testing the application's endpoints. Below are the endpoints available for testing:

- GET `/api/v1/blocks`: Retrieve all blocks in the blockchain.
- GET `/api/v1/blocks/:id`: Retrieve a block by its ID.
- POST `/api/v1/blocks`: Create a new block. Send block data as JSON in the request body.
   Data could be either a simple object:
  ```
  {
     "data": "This is block from 3001"
  }
  ```
  or a complex object:
  ```
  {
     "data": {
        "name": "John Doe",
        "age": 30,
        "email": "john@example.com",
        "address": {
           "street": "123 Main St",
           "city": "Anytown",
           "country": "USA"
        },
        "tags": ["tag1", "tag2", "tag3"]
        }
  }
  ```

Make sure to replace `:id` with the ID of the block you want to retrieve.

Example Usage

1. Start the server using `npm run node-1`.
2. Use Postman to send requests to the server's endpoints.
3. Create new blocks and retrieve existing blocks for testing.
