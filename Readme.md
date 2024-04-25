# Expense Tracker Application

This is a simple expense tracker application built using Node.js, Express.js, and MongoDB. It allows users to track their expenses, register, login, reset password, and receive email notifications.

## Features

- **User Authentication:** Users can register, login, and reset their password.
- **Expense Tracking:** Users can create, view, edit, and delete their expenses.
- **Email Notifications:** Users receive email notifications for registration, password reset, and notification after password reset.

## Technologies Used

- **Node.js:** Runtime environment for executing JavaScript code.
- **Express.js:** Web application framework for Node.js.
- **MongoDB:** NoSQL database used for storing user data and expenses.
- **JWT (JSON Web Tokens):** Used for user authentication and authorization.
- **Validator:** Library used for validating user input data.
- **Nodemailer:** Library used for sending emails.

## Authentication Flow

1. **Registration:**
   - User fills out the registration form.
   - Data is validated using the Validator library.
   - Upon successful validation, user data is saved in the MongoDB database.
   - An email confirmation is sent to the user.

2. **Login:**
   - User enters their credentials (email and password).
   - Data is validated using the Validator library.
   - If credentials are valid, a JWT token is generated and sent to the client for authentication.

3. **Password Reset:**
   - User clicks on the "Forgot Password" link.
   - User provides their email address.
   - A 5-digit verification code is generated and sent to the user's email address.
   - User enters the verification code.
   - If the code is correct, user is prompted to enter a new password.
   - Password is updated in the database.
   - User receives a notification email about the password change.

## Expense Management

1. **Create Expense:**
   - User can add a new expense by providing details such as amount, description, and date.
   - Expense data is validated and saved in the MongoDB database.

2. **View Expense:**
   - User can view their existing expenses along in their dashboard.
