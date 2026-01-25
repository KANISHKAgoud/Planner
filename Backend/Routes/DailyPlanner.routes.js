import express from "express"
import { getdata, postdata,putdata, deletedata } from "../controllers/DailyPlanner.controller.js"
// import { Router } from "express"

const router = express.Router()

router.get("/", getdata)
router.post("/", postdata)
router.put("/:id" , putdata)
router.delete("/:id", deletedata)

export default router;