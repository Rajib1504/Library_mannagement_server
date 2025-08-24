import express, { Request, Response,  } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import config from './config';
import bookRoute from './module/books/book.routes';
import borrowRoute from './module/Borrow/borrow.routes';
const app = express();

app.use(cors())
app.use(express.json())


app.use('/api/books', bookRoute)
app.use('/api/borrow',borrowRoute)


app.get('/',(req:Request,res:Response)=>{
      res.send('book server is running')
})

app.listen(config.Port, () => {
      console.log(`✅ server is running on ${config.Port}`)
})

async function server() {
      try {
            await mongoose.connect(config.DataBase!)
            console.log('database is connected');
      } catch (error) {
            console.log(`server error${error}`);
      }
}
server()