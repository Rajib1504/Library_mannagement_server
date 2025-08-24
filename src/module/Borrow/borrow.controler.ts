import { Request, Response } from "express";
import Borrow from "./borrow.model";
import Book from "../books/book.model";

const BorrowBook = async (req: Request, res: Response) => {
      try {
            const { book, quantity, dueDate } = req.body;

            const bookExists = await Book.findById(book);
            if (!bookExists) {
                  return res.status(404).json({
                        "message": "Book not found",
                        "success": false,
                        "error": "Book with this ID does not exist"
                  });
            }
            if (bookExists.copies < quantity) {
                  return res.status(400).json({
                        "message": "Not enough copies available",
                        "success": false,
                        "error": `Only ${bookExists.copies} copies available, requested ${quantity}`
                  });
            }

            bookExists.copies -= quantity;

            if (bookExists.copies === 0) {
                  bookExists.available = false;
            }

            await bookExists.save();

            const borrowRecord = new Borrow({
                  book,
                  quantity,
                  dueDate
            });
            const savedBorrow = await borrowRecord.save();

            res.status(201).json({
                  "success": true,
                  "message": "Book borrowed successfully",
                  "data": savedBorrow,
            });

      } catch (error: any) {
            res.status(400).json({
                  "message": "Borrow failed",
                  "success": false,
                  "error": error
            });
      }
}

const getBorrowedBooksSummary = async (req: Request, res: Response) => {
      try {
            const summary = await Borrow.aggregate([
                  {
                        $group: {
                              _id: "$book",
                              totalQuantity: { $sum: "$quantity" }
                        }
                  },
                  {
                        $lookup: {
                              from: "books", 
                              localField: "_id",
                              foreignField: "_id",
                              as: "bookDetails"
                        }
                  },

                  {
                        $unwind: "$bookDetails"
                  },
                  {
                        $project: {
                              _id: 0,
                              book: {
                                    title: "$bookDetails.title",
                                    isbn: "$bookDetails.isbn"
                              },
                              totalQuantity: 1
                        }
                  }
            ]);

            res.status(200).json({
                  "success": true,
                  "message": "Borrowed books summary retrieved successfully",
                  "data": summary,
            });

      } catch (error) {
            res.status(500).json({
                  "message": "Failed to fetch borrowed books summary",
                  "success": false,
                  "error": error
            });
      }
}

export const borrowControler = {
      BorrowBook,
      getBorrowedBooksSummary,
}