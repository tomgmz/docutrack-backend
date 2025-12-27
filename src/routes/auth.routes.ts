import { Router } from "express";
import { signUp } from "../controllers/signUp.controller";
import { validateRequest } from "../middlewares/validateRequest";
import { signUpSchema } from "../schema/signUp.schema";
import { login } from "../controllers/login.controller";
import { loginSchema } from "../schema/login.schema";
import { signOut } from "../controllers/signOut.controller";

const router = Router();

router.post("/signup", validateRequest(signUpSchema), signUp);
router.post("/login", validateRequest(loginSchema),login);
router.post("/signout", signOut);

export default router;
