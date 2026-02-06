import  mongoose from 'mongoose'
import { db_name } from '../constant.js'

const connectDb=async ()=>{
    try{
        connectionInstance=await mongoose.connect(`${process.env.MONGODB_URI}/${db_name}`)
        console.log(`Mongo Db connected!! host:${connectionInstance.connection.host}`)
    }catch(err){
        console.log(" MONGO DB failed to connect",err)
        process.exit(1)
    }
}

export default connectDb