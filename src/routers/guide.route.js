import { Router } from "express";
import { requiredGuide } from "../middleware/allowed.middleware.js";
import { verifyjwt } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";
import reviewRoute from "./reviews.route.js";
import { getGuideProfile, getPublicGuideGuide, listGuides, updateGuideProfile } from "../controllers/guide.controller.js";
import { reqbody } from "../middleware/bodycheck.middleware.js";
const router =Router();

router.route("/me").get(verifyjwt,requiredGuide,getGuideProfile ) //private
router.route("/me/:id").patch(  upload.single("profile-pic"),reqbody,verifyjwt,requiredGuide,updateGuideProfile)//private
router.use("/reviews",reviewRoute)

router.route("/").get(listGuides); //public
router.route("/:id").get(getPublicGuideGuide)//public
export default router