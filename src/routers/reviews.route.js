import { Router } from "express";
import { verifyjwt } from "../middleware/auth.middleware";
import { addReview, updateGuideStats } from "../controllers/review.controller";
const route= Router()


router.route("/").post(verifyjwt,addReview)
router.route("/").patch(verifyjwt,updateGuideStats)

export default route