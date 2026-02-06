import {v2 as cloudinary} from  "cloudinary"
import fs from 'fs'
cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET
});


const upploadToCloudinary= async(localpath)=>
{
    const options={
        use_filename:true,
        unique_filename:false,
        resource_type:auto,
        overwrite:true

    };

    try{
        const result=await cloudinary.uploader.upload(localpath,options);
        console.log("public_id:",result.public_id);
        console.log("-----------------------------");
        console.log("result:",result);
        fs.unlinkSync(localpath)  
        return result.url
    }catch(err){
        console.log("File upload failed!");
        console.log(err);
        fs.unlinkSync(localpath)
        console.log("File deleted")
    }
}

export  {upploadToCloudinary}