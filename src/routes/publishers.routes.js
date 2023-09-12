import { Router } from "express";
import {  getPublishers, getSpecificPublisher, deletePublisher, updatePublisher } from "../controllers/publishers.controller.js";
import { authToken } from "../helpers/authToken.js";

const router = Router()

router.get('/publisher', authToken, getPublishers)
router.get('/publisher/:id', authToken, getSpecificPublisher)
router.patch('/publisher/:id', authToken, updatePublisher)
router.delete('/publisher/:id', authToken, deletePublisher)

export default router