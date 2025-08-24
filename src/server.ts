import express, { Request, Response,  } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import config from './config';
import bookRoute from './module/books/book.routes';
import borrowRoute from './module/Borrow/borrow.routes';
const app = express();

app.use(cors());
app.use(express.json());


app.use('/api/books', bookRoute);
app.use('/api/borrow',borrowRoute);

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Library Management API is running',
  });
});

app.use('*', (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    error: `Cannot ${req.method} ${req.originalUrl}`,
  });
});


app.use((error: any, req: Request, res: Response) => {
  console.error('Global error:', error);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: error.message,
  });
});


async function startServer() {
  try {
    await mongoose.connect(config.DataBase!);
    console.log('Database connected successfully');

    const port = config.Port || 5000;
    app.listen(port, () => {
      console.log(`✅ Server is running on port ${port}`);
    });
  } catch (error) {
    console.error('❌ Server startup error:', error);
  
  }
}

startServer();