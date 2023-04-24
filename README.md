# Shopping With Promotions - Backend NodeJs

This project is a online shopping system built as a standalone NodeJS application with a set of given products, 
with their respective SKUs, prices, and inventory quantities. This system supports different promotions, including 
the free item offer, buy M for N offer and a fixed discount offer. The system supports a checkout process 
that allows users to place orders, check inventory, apply promotions, and receive a discounted cost for their order.

## Main Features

The online shopping system has the following features:
- Check inventory: The system checks the inventory of each item and makes sure that the requested quantity is available.
- Apply promotion: The system applies different promotions based on the items purchased.
- Return total cost: The system calculates the total cost of the order based on the retail price of each item and any applied promotions.

## Getting started

### Pre-requisites
- Install [Node.js](https://nodejs.org/en/) version >= 14.x
- Install [Yarn](https://yarnpkg.com/getting-started/install)

### Build and run from code
- Install dependencies
```yarn
yarn install
```
- Build and run the project
```yarn
yarn start
```

### Build and run as Docker container
- Build the Docker image
```docker
docker build -t shopping-with-promotions .
```
- Run the Docker container
```docker
docker run -p 8000:8000 shopping-with-promotions
```

## Swagger API Documents

- http://localhost:8000/api-docs/

## Example
```
POST /checkout
Content-Type: application/json

{
  "orders": [
    {
      "sku": "43N23P",
      "quantity": 1
    },
    {
      "sku": "234234",
      "quantity": 1
    }
  ]
}
```

```
HTTP/1.1 200 OK
Content-Type: application/json

{
  "filled": true,
  "orders": [
    {
      "sku": "43N23P",
      "name": "MacBook Pro",
      "retailPrice": 5399.99,
      "discountedPrice": null
    },
    {
      "sku": "234234",
      "name": "Raspberry Pi B",
      "retailPrice": 30,
      "discountedPrice": 0
    }
  ],
  "cost": 5399.99
}
```

## Available Scripts

In the project directory, you can run:

| Yarn Script | Description |
| ------------------------- | ------------------------------------------------------------------------------------------------- |
| `start`           | Runs full build and runs node on src/app.ts. |
| `build     `      | Runs full build. |
| `test`            | Runs build in watch mode and runs node in watch mode. |                                         |
| `lint`            | Runs ESLint for code style checking. |


