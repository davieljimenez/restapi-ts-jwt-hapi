import {Router} from "express";
import {TokenValidation} from "../libs/verifyToken";

const router: Router = Router();

import { signup, signin, profile, testing } from "../controllers/auth.controller";

router.post("/signup", signup)
router.post("/signin", signin)
router.get("/profile",TokenValidation, profile)
router.get("/testing",TokenValidation, testing)




export default router;