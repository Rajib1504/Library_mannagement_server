import { Router } from "express";
import { borrowControler } from "./borrow.controler";

const borrowRoute = Router();


borrowRoute.post('/', borrowControler.BorrowBook);
borrowRoute.get('/', borrowControler.getBorrowedBooksSummary);

export default borrowRoute;