import { Router } from "express";
import { getBooks, getSpecificBooks, modifyCatalogue, updateBooks, deleteBook } from "../controllers/index.controller.js";

const router = Router()

router.get('/books', getBooks)
router.get('/books/:id', getSpecificBooks)
router.post('/books', modifyCatalogue)
router.patch('/books/:id', updateBooks)
router.delete('/books/:id', deleteBook)

export default router


