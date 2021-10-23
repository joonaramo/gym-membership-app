# Gym Membership App

An app which you can use to manage memberships and products of a gym.

Made as a project for the [Full Stack Open course](https://fullstackopen.com/en/) by University of Helsinki.

## Technologies used
- Frontend: React
- Backend: Node.js & Express
- Database: MongoDB
- Testing: Jest, Supertest & Cypress

## How to run locally
1. Run `npm install && npm install --prefix client` to install dependencies
2. Copy .env.example to .env and configure each of the variables
3. Run `npm run dev` to start in development mode

## Notes
- Sometimes the Cypress test fails. This is caused by lack of native iframe support in the library; one of the tests checks the Klarna purchase flow and sometimes if the payment iframe loads slowly, Cypress can not find the child elements of the iframe. As a workaround I have added multiple cy.wait() calls to wait for the iframe to update.




