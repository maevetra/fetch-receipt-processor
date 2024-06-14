# Fetch Rewards Receipt Processor

This project aims to develop a small API used for processing, storing, and accessing receipts. The original repository for the task can be found
[here](https://github.com/fetch-rewards/receipt-processor-challenge)

## API Specification

Endpoint: Process Receipts

- Path: /receipts/process
- Method: POST
- Payload: Receipt JSON
- Response: JSON containing an id for the receipt.

Example Response:
```
{ "id": "7fb1377b-b223-49d9-a31a-5a02701dd310" }
```

Endpoint: Get Points

- Path: /receipts/{id}/points
- Method: GET
- Response: A JSON object containing the number of points awarded.


Example Response:
```
{ "points": 32 }
```

## Rules for getting points

The points are calculated based on the following rules:

1. One point for every alphanumeric character in the retailer name.
1. 50 points if the total is a round dollar amount with no cents.
1. 25 points if the total is a multiple of 0.25.
1. 5 points for every two items on the receipt.
1. If the trimmed length of the item description is a multiple of 3, multiply the price by 0.2 and round up to the nearest integer. The result is the number of points earned.
1. 6 points if the day in the purchase date is odd.
1. 10 points if the time of purchase is after 2:00pm and before 4:00pm.

## Example
```
{
  "retailer": "Target",
  "purchaseDate": "2022-01-01",
  "purchaseTime": "13:01",
  "items": [
    {
      "shortDescription": "Mountain Dew 12PK",
      "price": "6.49"
    },{
      "shortDescription": "Emils Cheese Pizza",
      "price": "12.25"
    },{
      "shortDescription": "Knorr Creamy Chicken",
      "price": "1.26"
    },{
      "shortDescription": "Doritos Nacho Cheese",
      "price": "3.35"
    },{
      "shortDescription": "   Klarbrunn 12-PK 12 FL OZ  ",
      "price": "12.00"
    }
  ],
  "total": "35.35"
}
```

```
Expected result: 28 points
```

## Tech Stack

- **Backend**: JavaScript, Node.js, Express.js
- **Containerization**: Docker

## Setup and Running Instructions

1. Prerequisites:

- Make sure [Docker](https://www.docker.com/) is installed on your machine.
- Clone the project repository.

2. Build Docker Image:

- When you're ready, navigate to the project's directory and build the Docker image by running:

```
docker build . -t fetch-receipt-processor
```

- You can then start the server using the following command:
```
docker run -p 3000:3000 fetch-receipt-processor
```

4. Accessing the Application:

- The application will now be running in a Docker container and is accessible at http://localhost:3000.
- You can now use the defined routes to process receipts and retrieve points: http://localhost:3000/receipts/process for processing receipts and http://localhost:3000/receipts/{id}/points for retrieving points.
