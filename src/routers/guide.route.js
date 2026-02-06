import { Router } from "express";
import { requiredGuide } from "../middleware/allowed.middleware";
import { verifyjwt } from "../middleware/auth.middleware";
const router =Router();

router.route("/guide").get(verifyjwt,requiredGuide, getGuideRoutes)