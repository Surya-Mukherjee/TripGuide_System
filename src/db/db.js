
import  mongoose from 'mongoose'
import { db_name } from '../constant.js'
console.log(db_name)
const connectDb=async ()=>{
    console.log("URI",process.env.MONGO_URI)
    try{
       
        const connectionInstance=await mongoose.connect(`${process.env.MONGO_URI}`)
        console.log(connectionInstance)
        console.log(`Mongo Db connected!! host:${connectionInstance.connection.host}`)
    }catch(err){
        console.log(" MONGO DB failed to connect",err)
        process.exit(1)
    }
}

export default connectDb