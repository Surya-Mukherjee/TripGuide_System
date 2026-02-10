import mongoose,{Schema} from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
const userSchema= new Schema(
    {
        userName:{
            type:String,
            required:true,
            unique:true,
            toLowerCase:true
        },
        email:{
            type:String,
            required:true,
            toLowerCase:true
        },
        profilePic:{
            type:String,
            
            required:true
        },
        password:{
            type:String,
            required:true
        },
        refreshToken:{
            type:String
        },
        role:{
            type:String,
            enum:["tourist","guide",],
            toLowerCase:true,
            required:true
        }

    
},
    {timeStamps:true}
)



// perform action to encrypt the password before save

userSchema.pre("save", async function(next){
    if(!this.isModified("password"))return 
    this.password=await bcrypt.hash(this.password,10)

})

//validate password
userSchema.methods.isPasswordCorrect=async function(password){
    return await bcrypt.compare(password,this.password)
}

//create accesToken
userSchema.methods.accessTokenGenerator= function(){
    return jwt.sign({
        _id:this._id,
        role:this.role
    },
    process.env.ACCESS_SECRET_KEY,
    {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    }
)
};

userSchema.methods.refreshTokenGenerator=function(){
    return jwt.sign({
        _id:this._id,
        role:this.role
    },
    process.env.REFRESH_TOKEN_SECRET_KEY,
    {
        expiresIn:process.env.REFRESH_TOKEN_EXPIRY
    }
)
}

export const User=mongoose.model("User",userSchema);