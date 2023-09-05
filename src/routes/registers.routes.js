import { Router } from "express";
import { signIn, signUp } from "../controllers/registers.controller.js"

const router = Router()

router.get('/sign-in', signIn)
router.get('/sign-up', signUp)

export default router