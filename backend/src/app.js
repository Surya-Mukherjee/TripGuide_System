import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';// to access cookies from request object

const app=express();

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))

app.use(express.json({limit:"16kb"}))

app.use(express.urlencoded({
    extended:true,
    limit:"16kb"
}))
app.use((req, res, next) => {
    console.log(`${req.method} ${req.originalUrl}`);
    console.log("reached express")
    next();
});
app.use(express.static("public"))
app.use(cookieParser());

import userRouter from './routers/user.route.js'
import guideRouter from './routers/guide.route.js'
import bookingRouter from  './routers/Booking.route.js'
import { errorHandler } from './middleware/error.middleware.js';

app.use('/api/v1/users',userRouter)
app.use('/api/v1/guides',guideRouter)
app.use('/api/v1/Booking',bookingRouter)

app.use(errorHandler)
export default app