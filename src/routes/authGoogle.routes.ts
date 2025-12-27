import { Router } from "express";
import { redirectToGoogle, googleCallback } from "../controllers/authGoogle.controller";

const router = Router();

router.get("/google", redirectToGoogle);
router.get("/callback", googleCallback);

export default router;
