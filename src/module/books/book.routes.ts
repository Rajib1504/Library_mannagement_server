import { Router } from 'express';
import { createBook, deleteBook, getBook, getBooks, updateBooks } from './book.controler';

const bookRoute = Router();

bookRoute.post('/',createBook);
bookRoute.get('/',getBooks);
bookRoute.get('/:bookId',getBook);
bookRoute.delete('/:bookId',deleteBook);
bookRoute.put('/:bookId',updateBooks);

export default bookRoute;