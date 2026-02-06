import { Router } from "express";
import { upload } from "../middleware/multer.middleware";
import { getProfile, login, logout, registerUser, updateProfile } from "../controllers/user.controller";
import { verifyjwt } from "../middleware/auth.middleware";
const router= Router()
router.route("/register").post(upload.single("profile-pic"),registerUser)
router.route("/login").post(login)

//Secured Routes
router.route("/logout").post(verifyjwt,logout)
router.route("/profile").get(verifyjwt,getProfile)
route.route("/profile").patch(verifyjwt,upload.single("profile-pic"),updateProfile)
export default router