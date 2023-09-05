import { Router } from "express";
import {  getPublishers, getSpecificPublisher, deletePublisher, updatePublisher } from "../controllers/publishers.controller.js";

const router = Router()

router.get('/publisher', getPublishers)
router.get('/publisher/:id', getSpecificPublisher)
router.patch('/publisher/:id', updatePublisher)
router.delete('/publisher/:id', deletePublisher)

export default router