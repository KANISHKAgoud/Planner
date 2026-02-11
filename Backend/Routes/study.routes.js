import express from "express"
import { getStudy, saveStudy } from "../controllers/study.controller.js"

const router = express.Router()

router.get("/", getStudy)
router.post("/", saveStudy)

export default router
