import { Router } from "express";
import { requiredGuide, requireUser } from "../middleware/allowed.middleware.js";
import { verifyjwt } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";
import reviewRoute from "./reviews.route.js";
import { completeGuideProfile, deleteGuide, getGuideProfile, getPublicGuideGuide, guideScheme, listGuides, updateGuideProfile } from "../controllers/guide.controller.js";
import { reqbody } from "../middleware/bodycheck.middleware.js";
import { validate } from "../middleware/validation.middleware.js";
const router =Router();

router.route("/my-profile").get(verifyjwt,requiredGuide,getGuideProfile ) //private
router.route("/my-profile/update").patch(  upload.single("profile-pic"),reqbody,verifyjwt,requiredGuide,updateGuideProfile)//private
router.route("/profile/delete").delete(verifyjwt,requiredGuide,deleteGuide)
router.route("/profile/complete").post(verifyjwt,validate(guideScheme),requiredGuide,completeGuideProfile)
router.use("/reviews",reviewRoute)

router.route("/").get(listGuides); //public
router.route("/:id").get(getPublicGuideGuide)//public
export default router