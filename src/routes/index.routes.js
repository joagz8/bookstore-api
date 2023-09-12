import { Router } from "express";
import { getBooks, getSpecificBooks, modifyCatalogue, updateBooks, deleteBook } from "../controllers/index.controller.js";
import { authToken } from "../helpers/authToken.js";

const router = Router()

router.get('/books', authToken, getBooks)
router.get('/books/:id', authToken, getSpecificBooks)
router.post('/books', authToken, modifyCatalogue)
router.patch('/books/:id', authToken, updateBooks)
router.delete('/books/:id', authToken, deleteBook)

export default router


