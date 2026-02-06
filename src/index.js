import dotenv from 'dotenv';
import connectDb from './db/db.js';
import {app} from './app';
dotenv.config({
    path:'./.env'
});

connectDb().then(
 app.listen(process.env.PORT||8000,()=>{
    console.log(`server is running at${process.env.PORT}`)
 })
).catch((err)=>{
    console.log("DB connection failed!!",err)
})