import {v2 as cloudinary} from  "cloudinary"
import fs from 'fs'
cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET_KEY
});


const upploadToCloudinary= async(localpath)=>
{
    const options={
        use_filename:true,
        unique_filename:false,
       
        overwrite:true

    };

    try{
      
        const result=await cloudinary.uploader.upload(localpath,options);
        console.log("public_id:",result.public_id);
        console.log("-----------------------------");
        console.log("result:",result);
        console.log("hi")
        fs.unlinkSync(localpath)  
        console.log("hi")
        return result.url
    }catch(err){
        console.log("File upload failed!");
        console.log(err);
        fs.unlinkSync(localpath)
        console.log("File deleted")
    }
}

export  {upploadToCloudinary}