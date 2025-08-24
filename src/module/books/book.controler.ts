import { Request, Response } from 'express';
import Book from './book.model';

const createBook = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const book = new Book(payload);
    const data = await book.save();

    res.status(201).json({
      'success': true,
      'message': 'Book created successfully',
      'data': data,
    });
  } catch (error: any) {
    res.status(400).json({
      'message': 'Validation failed',
      'success': false,
      'error': error
    });
  }
};
const getBooks = async (req: Request, res: Response) => {
  try {
    const { filter, sortBy, sort, limit } = req.query;

    let query = Book.find();
    if (filter) {
      query = query.where('genre').equals(filter);
    }
    if (sortBy && sort) {
      const sortOrder = sort === 'desc' ? -1 : 1;
      query = query.sort({ [sortBy as string]: sortOrder });
    }

    const limitValue = limit ? Number(limit) : 10;
    query = query.limit(limitValue);

    const books = await query;
    res.status(200).json({
      'success': true,
      'message': 'Books retrieved successfully',
      'data': books,
    });
  } catch (error) {
    res.status(500).json({
      'message': 'Failed to fetch books',
      'success': false,
      'error': error
    });
  }
};
const getBook = async (req: Request, res: Response) => {
  try {
    const {bookId} = req.params;
    // console.log(bookId);
    const books = await Book.findById(bookId);
    res.status(200).json({
      'success': true,
      'message': 'Books retrieved successfully',
      'data': books,
    });
  } catch (error) {
    res.status(500).json({
      'message': 'Failed to fetch books',
      'success': false,
      'error': error
    });
  }
};
const updateBooks = async (req: Request, res: Response) => {
  try {
    const {bookId} = req.params;
    const data = req.body;
    const books = await Book.findByIdAndUpdate(bookId,data,{new:true,runValidators:true});
    res.status(200).json({
      'success': true,
      'message': 'Book updated successfully',
      'data': books,
    });
  } catch (error) {
    res.status(500).json({
      'message': 'Failed to update books',
      'success': false,
      'error': error
    });
  }
};
const deleteBook = async (req: Request, res: Response) => {
  try {
    const {bookId} = req.params;
    // console.log(bookId);
    await Book.findByIdAndDelete(bookId);
    res.status(200).json({
      'success': true,
      'message': 'Book deleted successfully',
      'data': null,
    });
  } catch (error) {
    res.status(500).json({
      'message': 'Failed to delete books',
      'success': false,
      'error': error
    });
  }
};




export { createBook, getBooks,getBook,deleteBook,updateBooks };