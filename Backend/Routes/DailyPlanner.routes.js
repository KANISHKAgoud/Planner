import express from "express"
import { getdata, postdata,putdata, deletedata , getdataDB ,postdataDB} from "../controllers/DailyPlanner.controller.js"
// import { Router } from "express"

const router = express.Router()

router.get("/", getdata)
router.post("/", postdata)
router.put("/:id" , putdata)
router.delete("/:id", deletedata)
router.get("/:type", getdataDB)
router.post("/:type", postdataDB)

export default router;