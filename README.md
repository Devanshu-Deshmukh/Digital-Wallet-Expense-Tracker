# Digital Wallet and Expense Tracker

A full-stack web application for tracking personal income and expenses. Built with Spring Boot (Java) for the backend and React for the frontend.

## Features

- Add income and expense transactions with category, date, and description
- View total balance, total income, and total expenses at a glance
- Visual expense breakdown chart by category (pie chart)
- Recent transactions list with delete support
- Input validation on both client and server side
- Responsive design with a royal cream color theme

## Tech Stack

### Backend
- Java 21
- Spring Boot 4.0.1
- Spring Data JPA (Hibernate)
- MySQL 8.0
- Jakarta Bean Validation
- Lombok

### Frontend
- React 19
- Vite 8
- Tailwind CSS v4
- Recharts (for pie chart)

## Project Structure

```
DigitalWallet/
├── backend/                        # Spring Boot REST API
│   └── src/main/java/com/devanshu/digitalwallet/
│       ├── model/
│       │   ├── Transaction.java        # JPA Entity
│       │   └── TransactionType.java    # INCOME/EXPENSE enum
│       ├── repository/
│       │   └── TransactionRepository.java
│       ├── service/
│       │   └── TransactionService.java
│       ├── controller/
│       │   └── TransactionController.java
│       ├── config/
│       │   └── CorsConfig.java
│       └── exception/
│           └── GlobalExceptionHandler.java
└── frontend/                       # React SPA
    └── src/
        ├── context/
        │   └── TransactionContext.jsx  # React Context for state
        ├── components/
        │   ├── Header.jsx
        │   ├── BalanceCards.jsx
        │   ├── ExpenseChart.jsx
        │   ├── RecentTransactions.jsx
        │   └── TransactionModal.jsx
        ├── App.jsx
        ├── main.jsx
        └── index.css
```

## API Endpoints

| Method | Endpoint                    | Description                          |
|--------|-----------------------------|--------------------------------------|
| GET    | /api/transactions           | Fetch all transactions and balance   |
| POST   | /api/transactions           | Create a new transaction             |
| DELETE | /api/transactions/{id}      | Delete a transaction by ID           |

## Database

Uses MySQL with a single `transactions` table:

| Column      | Type              | Constraint       |
|-------------|-------------------|------------------|
| id          | BIGINT (PK)       | Auto-increment   |
| amount      | DOUBLE            | NOT NULL, > 0    |
| type        | ENUM              | INCOME / EXPENSE |
| category    | VARCHAR(255)      | NOT NULL         |
| date        | DATE              | NOT NULL         |
| description | VARCHAR(500)      | Optional         |

## Prerequisites

- Java 21
- Node.js 18+
- MySQL 8.0

## Setup

### 1. Database

Create the MySQL database (the table is auto-created by Hibernate):

```sql
CREATE DATABASE IF NOT EXISTS digitalwallet;
```

### 2. Backend

Update `backend/src/main/resources/application.properties` with your MySQL credentials if needed.

```bash
cd backend
./mvnw spring-boot:run
```

The API starts at http://localhost:8080.

### 3. Frontend

```bash
cd frontend
npm install
npm run dev
```

The app opens at http://localhost:5173.

## Architecture

The application follows a layered architecture:

- Controller layer handles HTTP requests and responses
- Service layer contains business logic (balance calculation, validation)
- Repository layer interfaces with the database via Spring Data JPA
- Frontend uses React Context API for state management and communicates with the backend through a Vite proxy
