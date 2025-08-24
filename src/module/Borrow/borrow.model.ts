import { model, Schema } from "mongoose";
import { IBorrow } from "./borrow.interface";

const borrowModel = new Schema<IBorrow>({
      book: { type: Schema.Types.ObjectId, ref: 'book', required: true },
      quantity: { type: Number, required: true, min: 1 },
      dueDate: { type: Date, required: true },
}, {
      timestamps: true
})

const Borrow = model('borrow',borrowModel);
export default Borrow;