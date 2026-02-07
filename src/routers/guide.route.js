import { Router } from "express";
import { requiredGuide } from "../middleware/allowed.middleware";
import { verifyjwt } from "../middleware/auth.middleware";
import { upload } from "../middleware/multer.middleware";
const router =Router();

router.route("/me").get(verifyjwt,requiredGuide, getGuideProfile)//private
router.route("/me").patch(  upload.single("profile-pic"),verifyjwt,requiredGuide,updateGuideProfile)//private


router.route("/").get(listGuides); //public
router.route("/:id").get(getPublicGuideGuide)//public