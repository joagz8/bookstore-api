import { Router } from "express";
import { sellBook, getBooksSold } from "../controllers/sales.controller.js";
import { authToken } from "../helpers/authToken.js";

const router = Router()

router.get('/sale', authToken, getBooksSold)
router.post('/sale/:id', authToken, sellBook)

export default router