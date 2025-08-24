import dotenv from 'dotenv';


dotenv.config();

export default {
  Port: process.env.PORT,
  DataBase: process.env.DATABASE_URL,

};