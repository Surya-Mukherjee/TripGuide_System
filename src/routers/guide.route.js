import { Router } from "express";
import { requiredGuide } from "../middleware/allowed.middleware.js";
import { verifyjwt } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";
import reviewRoute from "./reviews.route.js";
import { getGuideProfile, getPublicGuideGuide, listGuides, updateGuideProfile } from "../controllers/guide.controller.js";
const router =Router();

router.route("/me").get(verifyjwt,requiredGuide,getGuideProfile ) //private
router.route("/me").patch(  upload.single("profile-pic"),verifyjwt,requiredGuide,updateGuideProfile)//private
router.route("/:guideId/reviews",reviewRoute)

router.route("/").get(listGuides); //public
router.route("/:id").get(getPublicGuideGuide)//public
export default router