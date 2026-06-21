# Tourism Booking Platform

A backend-focused web application for promoting tourism in Bangladesh. The platform enables users to browse tours, book destinations, reserve tour guides, and securely complete payments online.

## Features

* User registration and authentication
* Browse and search tours
* Tour and guide booking system
* Secure Stripe payment integration
* User profile and booking management
* Admin functionalities for managing tours and guides
* Responsive user interface
* MongoDB-based data storage

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

### Payment

* Stripe

### Tools

* Git
* GitHub

## Architecture

The project follows the MVC (Model-View-Controller) architecture:

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

## Installation

### Clone the repository

```bash
git clone https://github.com/Hosain199/tourism-booking-platform.git
cd tourism-booking-platform
```

### Install dependencies

```bash
npm install
```

### Configure environment variables

Create a `.env` file and add:

```env
DATABASE=<your_mongodb_connection_string>
STRIPE_SECRET_KEY=<your_stripe_secret_key>
JWT_SECRET=<your_secret_key>
```

### Run the application

```bash
npm start
```

or

```bash
npm run dev
```

## Project Structure

```text
├── controllers/
├── models/
├── routes/
├── views/
├── public/
├── middleware/
├── utils/
├── app.js
├── server.js
└── package.json
```

## Future Improvements

* REST API support
* Email notifications
* User reviews and ratings
* Wishlist and favorites
* Hotel and transportation booking
* Admin dashboard analytics

## Screenshots

Add screenshots here.

## Author

**MD. Hosain Mahmud**

* GitHub: https://github.com/Hosain199
* LinkedIn: https://linkedin.com/in/hosain191
* Portfolio: https://hosain199.github.io
