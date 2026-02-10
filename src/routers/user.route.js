import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import { deleteUser, getProfile, login, logout, registerUser, updateProfile } from "../controllers/user.controller.js";
import { verifyjwt } from "../middleware/auth.middleware.js";
const router= Router()
router.route("/register").post(upload.single("profile-pic"),registerUser)
router.route("/login").post(login)

//Secured Routes
router.route("/logout").post(verifyjwt,logout)
router.route("/profile").get(verifyjwt,getProfile)
router.route("/profile").delete(verifyjwt,deleteUser)
router.route("/profile").patch(verifyjwt,upload.single("profile-pic"),updateProfile)
export default router