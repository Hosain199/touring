# Tourism Booking Platform

A backend-focused web application designed to promote tourism in Bangladesh. Users can explore tours, book destinations, reserve tour guides, and securely complete payments online.

## Features

* User authentication and authorization
* Tour browsing and booking
* Tour guide reservation system
* Secure payment integration with Stripe
* Dynamic views with Pug templates
* MongoDB-based data management
* MVC architecture for maintainability

## Tech Stack

### Backend

* Node.js
* Express.js

### Frontend

* Pug
* HTML5
* CSS3
* Bootstrap

### Database

* MongoDB
* Mongoose

### Payment

* Stripe

### Tools

* Git
* GitHub
* ESLint
* Prettier

## Project Structure

```text
.
├── controllers/
│   ├── tourController.js
│   └── userController.js
├── dev-data/
├── models/
├── public/
├── routes/
├── app.js
├── server.js
├── package.json
├── .eslintrc.json
├── .prettierrc
└── .gitignore
```

## Installation

### Clone the repository

```bash
git clone https://github.com/Hosain199/touring.git
cd touring
```

### Install dependencies

```bash
npm install
```

### Configure environment variables

Create a `config.env` file:

```env
DATABASE=<your_mongodb_connection_string>
DATABASE_PASSWORD=<password>
JWT_SECRET=<your_secret>
JWT_EXPIRES_IN=90d
STRIPE_SECRET_KEY=<your_stripe_secret_key>
```

### Run the application

Development mode:

```bash
npm run start:dev
```

Production mode:

```bash
npm start
```

## Architecture

```text
Client
  ↓
Routes
  ↓
Controllers
  ↓
Models
  ↓
MongoDB
```

## Future Improvements

* REST API endpoints
* Reviews and ratings
* Wishlist and favorites
* Email notifications
* Hotel and transportation booking
* Admin dashboard

## Author

**MD. Hosain Mahmud**

* GitHub: https://github.com/Hosain199
* LinkedIn: https://linkedin.com/in/hosain191
* Portfolio: https://hosain199.github.io
