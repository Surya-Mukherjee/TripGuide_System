import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import { reqbody } from "../middleware/bodycheck.middleware.js";
import { deleteUser, getProfile, login, logout, passwordUpdate, registerUser, updateProfile, userScheme} from "../controllers/user.controller.js";
import { verifyjwt } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validation.middleware.js";
const router= Router()
router.route("/register").post(upload.single("profile-pic"),validate(userScheme),registerUser)
router.route("/login").post(reqbody,validate(userScheme),(req,res,next)=>{
    console.log("reached router")
    next()
},login)

//Secured Routes
router.route("/logout").post(verifyjwt,logout)
router.route("/profile").get(verifyjwt,getProfile)
router.route("/profile/delete").delete(verifyjwt,deleteUser)
router.route("/profile/update").patch(verifyjwt,upload.single("profile-pic"),updateProfile)
router.route("/profile/password-update").patch(verifyjwt,passwordUpdate)
export default router