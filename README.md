# Capstone Project

This document provides an overview of the Capstone Project, including the technologies used in development and API references for user registration and login functionalities.

## Technologies Used in Development

- **Frontend:** React.js
- **Backend:** Node.js (Express.js)
- **Database:** MongoDB

## API References

Below are the API endpoints available for user management.

### Register User

- **Method:** POST
- **Route:** `/api/user/register`
- **Headers:** `Content-Type: application/json`
- **Body:**
  ```json
  {
    "fullname": "Full Name",
    "email": "user@example.com",
    "password": "password"
  }

### login user

- **Method:** POST
- **Route:** `/api/user/login`
- **Headers:** `Content-Type: application/json`
- **Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "password"
  }




Frontend Repository : https://github.com/alanyaz/capstrone_frontend