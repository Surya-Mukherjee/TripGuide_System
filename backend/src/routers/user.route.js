import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import { reqbody } from "../middleware/bodycheck.middleware.js";
import { deleteUser, getProfile, login, logout, registerUser, updateProfile, userScheme} from "../controllers/user.controller.js";
import { verifyjwt } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validation.middleware.js";
const router= Router()
router.route("/register").post(upload.single("profile-pic"),validate(userScheme),registerUser)
router.route("/login").post(reqbody,validate(userScheme),login)

//Secured Routes
router.route("/logout").post(verifyjwt,logout)
router.route("/profile").get(verifyjwt,getProfile)
router.route("/profile").delete(verifyjwt,deleteUser)
router.route("/profile").patch(verifyjwt,upload.single("profile-pic"),updateProfile)
export default router