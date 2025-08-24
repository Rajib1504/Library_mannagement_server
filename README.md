# 📚 Library Management API

A robust Library Management System built with Express.js, TypeScript, MongoDB, and Mongoose. This API provides comprehensive book management and borrowing functionality with advanced features like filtering, sorting, and aggregation.

## 🚀 Features

### Core Features
- ✅ **Book Management** - Complete CRUD operations for books
- ✅ **Borrowing System** - Advanced borrowing with business logic
- ✅ **Query Parameters** - Filtering, sorting, and limiting capabilities
- ✅ **Aggregation Pipeline** - Borrowed books summary with MongoDB aggregation
- ✅ **Validation** - Comprehensive input validation and error handling
- ✅ **TypeScript** - Full TypeScript implementation with interfaces

### Advanced Features
- 🔍 **Filtering** - Filter books by genre (FICTION, NON_FICTION, SCIENCE, HISTORY, BIOGRAPHY, FANTASY)
- 📊 **Sorting** - Sort by any field (title, author, createdAt, etc.) in ascending or descending order
- 📏 **Limiting** - Limit results with default of 10 items
- 📈 **Aggregation** - MongoDB aggregation pipeline for borrowed books summary
- 🔄 **Business Logic** - Automatic availability management when copies reach zero

## 🛠️ Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB
- **ODM**: Mongoose
- **Development**: ts-node-dev

## 📋 Prerequisites

Before running this project, make sure you have:

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone <your-repository-url>
cd Book_mannagement_system_server
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env` file in the root directory:

```env
PORT=5000
DATABASE_URL=mongodb://localhost:27017/library_management
# OR for MongoDB Atlas:
# DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/library_management
```

### 4. Run the Application

**Development Mode:**
```bash
npm run dev
```

**Production Mode:**
```bash
npm start
```

The server will start on `http://localhost:5000`

## 📚 API Documentation

### Base URL
```
http://localhost:5000
```

### 1. Create Book
**POST** `/api/books`

**Request Body:**
```json
{
  "title": "The Theory of Everything",
  "author": "Stephen Hawking",
  "genre": "SCIENCE",
  "isbn": "9780553380163",
  "description": "An overview of cosmology and black holes.",
  "copies": 5,
  "available": true
}
```

**Response:**
```json
{
  "success": true,
  "message": "Book created successfully",
  "data": {
    "_id": "64f123abc4567890def12345",
    "title": "The Theory of Everything",
    "author": "Stephen Hawking",
    "genre": "SCIENCE",
    "isbn": "9780553380163",
    "description": "An overview of cosmology and black holes.",
    "copies": 5,
    "available": true,
    "createdAt": "2024-11-19T10:23:45.123Z",
    "updatedAt": "2024-11-19T10:23:45.123Z"
  }
}
```

### 2. Get All Books
**GET** `/api/books`

**Query Parameters:**
- `filter` - Filter by genre (FICTION, NON_FICTION, SCIENCE, HISTORY, BIOGRAPHY, FANTASY)
- `sortBy` - Sort by field (title, author, createdAt, etc.)
- `sort` - Sort direction (asc or desc)
- `limit` - Number of results (default: 10)

**Example:**
```
GET /api/books?filter=FANTASY&sortBy=createdAt&sort=desc&limit=5
```

**Response:**
```json
{
  "success": true,
  "message": "Books retrieved successfully",
  "data": [
    {
      "_id": "64f123abc4567890def12345",
      "title": "The Theory of Everything",
      "author": "Stephen Hawking",
      "genre": "SCIENCE",
      "isbn": "9780553380163",
      "description": "An overview of cosmology and black holes.",
      "copies": 5,
      "available": true,
      "createdAt": "2024-11-19T10:23:45.123Z",
      "updatedAt": "2024-11-19T10:23:45.123Z"
    }
  ]
}
```

### 3. Get Book by ID
**GET** `/api/books/:bookId`

**Response:**
```json
{
  "success": true,
  "message": "Book retrieved successfully",
  "data": {
    "_id": "64f123abc4567890def12345",
    "title": "The Theory of Everything",
    "author": "Stephen Hawking",
    "genre": "SCIENCE",
    "isbn": "9780553380163",
    "description": "An overview of cosmology and black holes.",
    "copies": 5,
    "available": true,
    "createdAt": "2024-11-19T10:23:45.123Z",
    "updatedAt": "2024-11-19T10:23:45.123Z"
  }
}
```

### 4. Update Book
**PUT** `/api/books/:bookId`

**Request Body:**
```json
{
  "copies": 50
}
```

**Response:**
```json
{
  "success": true,
  "message": "Book updated successfully",
  "data": {
    "_id": "64f123abc4567890def12345",
    "title": "The Theory of Everything",
    "author": "Stephen Hawking",
    "genre": "SCIENCE",
    "isbn": "9780553380163",
    "description": "An overview of cosmology and black holes.",
    "copies": 50,
    "available": true,
    "createdAt": "2024-11-19T10:23:45.123Z",
    "updatedAt": "2024-11-20T08:30:00.000Z"
  }
}
```

### 5. Delete Book
**DELETE** `/api/books/:bookId`

**Response:**
```json
{
  "success": true,
  "message": "Book deleted successfully",
  "data": null
}
```

### 6. Borrow a Book
**POST** `/api/borrow`

**Business Logic:**
- Verifies book has enough available copies
- Deducts requested quantity from book's copies
- Updates availability to false if copies become 0
- Creates borrow record with all details

**Request Body:**
```json
{
  "book": "64ab3f9e2a4b5c6d7e8f9012",
  "quantity": 2,
  "dueDate": "2025-07-18T00:00:00.000Z"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Book borrowed successfully",
  "data": {
    "_id": "64bc4a0f9e1c2d3f4b5a6789",
    "book": "64ab3f9e2a4b5c6d7e8f9012",
    "quantity": 2,
    "dueDate": "2025-07-18T00:00:00.000Z",
    "createdAt": "2025-06-18T07:12:15.123Z",
    "updatedAt": "2025-06-18T07:12:15.123Z"
  }
}
```

### 7. Borrowed Books Summary
**GET** `/api/borrow`

**Purpose:** Returns summary of borrowed books using MongoDB aggregation pipeline

**Response:**
```json
{
  "success": true,
  "message": "Borrowed books summary retrieved successfully",
  "data": [
    {
      "book": {
        "title": "The Theory of Everything",
        "isbn": "9780553380163"
      },
      "totalQuantity": 5
    },
    {
      "book": {
        "title": "1984",
        "isbn": "9780451524935"
      },
      "totalQuantity": 3
    }
  ]
}
```

## 🗄️ Database Schema

### Book Model
```typescript
interface IBook {
  title: string;                    // Required
  author: string;                   // Required
  genre: "FICTION" | "NON_FICTION" | "SCIENCE" | "HISTORY" | "BIOGRAPHY" | "FANTASY"; // Required
  isbn: string;                     // Required, Unique
  description?: string;             // Optional
  copies: number;                   // Required, min: 0
  available: boolean;               // Default: true
  createdAt: Date;                  // Auto-generated
  updatedAt: Date;                  // Auto-generated
}
```

### Borrow Model
```typescript
interface IBorrow {
  book: Types.ObjectId;             // Required, Reference to Book
  quantity: number;                 // Required, min: 1
  dueDate: Date;                    // Required
  createdAt: Date;                  // Auto-generated
  updatedAt: Date;                  // Auto-generated
}
```

## 🔧 Project Structure

```
src/
├── config/
│   └── index.ts                    # Environment configuration
├── module/
│   ├── books/
│   │   ├── book.model.ts           # Book schema and model
│   │   ├── book.interface.ts       # Book TypeScript interface
│   │   ├── book.controler.ts       # Book controllers
│   │   └── book.routes.ts          # Book routes
│   └── Borrow/
│       ├── borrow.model.ts         # Borrow schema and model
│       ├── borrow.interface.ts     # Borrow TypeScript interface
│       ├── borrow.controler.ts     # Borrow controllers
│       └── borrow.routes.ts        # Borrow routes
└── server.ts                       # Main server file
```

## 🎯 Key Implementation Features

### 1. **Query Parameter Handling**
- Advanced filtering by genre
- Dynamic sorting by any field
- Configurable result limiting
- Default limit of 10 items

### 2. **Business Logic**
- Automatic availability management
- Copy quantity validation
- Real-time inventory updates

### 3. **MongoDB Aggregation**
- Group borrow records by book
- Sum total quantities
- Join with book details
- Formatted response structure

### 4. **Error Handling**
- Comprehensive validation errors
- Proper HTTP status codes
- Detailed error messages
- Graceful failure handling

## 🧪 Testing

### Test the API endpoints using Postman or any API client:

1. **Create a book** - POST `/api/books`
2. **Get all books** - GET `/api/books`
3. **Filter books** - GET `/api/books?filter=SCIENCE`
4. **Sort books** - GET `/api/books?sortBy=title&sort=asc`
5. **Borrow a book** - POST `/api/borrow`
6. **Get borrow summary** - GET `/api/borrow`

## 📝 Error Response Format

All error responses follow this format:
```json
{
  "message": "Error description",
  "success": false,
  "error": {
    // Detailed error information
  }
}
```

## 🚀 Deployment

### Local Development
```bash
npm run dev
```

### Production
```bash
npm start
```

## 📄 License

This project is created for educational purposes as part of the Library Management System assignment.

## 👨‍💻 Author

[Your Name] - Library Management API Assignment

---

**Note:** This API strictly follows the provided assignment requirements with exact endpoint structures and response formats as specified in the documentation.
