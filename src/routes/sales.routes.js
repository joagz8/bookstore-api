import { Router } from "express";
import { sellBook, getBooksSold } from "../controllers/sales.controller.js";

const router = Router()

router.get('/sale', getBooksSold)
router.post('/sale/:id', sellBook)

export default router