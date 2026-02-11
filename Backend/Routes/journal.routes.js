import express from "express"
import {
  getJournals,
  createJournal,
  updateJournal,
  deleteJournal
} from "../controllers/journal.controller.js"

const router = express.Router()

router.get("/", getJournals)
router.post("/", createJournal)
router.put("/:id", updateJournal)
router.delete("/:id", deleteJournal)

export default router
