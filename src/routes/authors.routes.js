import { Router } from "express";
import { getAuthors, getSpecificAuthor, deleteAuthor, updateAuthor } from "../controllers/authors.controller.js";

const router = Router()

router.get('/author', getAuthors)
router.get('/author/:id', getSpecificAuthor)
router.patch('/author/:id', updateAuthor)
router.delete('/author/:id', deleteAuthor)

export default router