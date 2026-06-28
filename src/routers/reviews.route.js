import { Router } from "express";
import { verifyjwt } from "../middleware/auth.middleware.js";
import { addReview } from "../controllers/review.controller.js";
import { requireUser } from "../middleware/allowed.middleware.js";
import { reqbody } from "../middleware/bodycheck.middleware.js"
import { upload } from "../middleware/multer.middleware.js";
const router= Router()


router.route("/:guideId").post(upload.none(),reqbody,verifyjwt,requireUser,addReview)
router.route("/").patch(verifyjwt,requireUser,addReview)

// router.route("/").delete(verifyjwt,requireUser,deleteReview);


export default router