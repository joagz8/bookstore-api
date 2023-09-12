import { Router } from "express";
import { getAuthors, getSpecificAuthor, deleteAuthor, updateAuthor } from "../controllers/authors.controller.js";
import { authToken } from "../helpers/authToken.js";

const router = Router()

router.get('/author', authToken, getAuthors)
router.get('/author/:id', authToken, getSpecificAuthor)
router.patch('/author/:id', authToken, updateAuthor)
router.delete('/author/:id', authToken, deleteAuthor)

export default router