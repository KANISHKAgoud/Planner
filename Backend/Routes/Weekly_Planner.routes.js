import express from "express"
import {getdata_SkinProfile , putdata, postdata_SkinProfile , deletedata_SkinProfile} from "../controllers/WeeklyPlanner.controller.js"

const route = express.Router()

route.get("/", getdata_SkinProfile)
route.get("/" , postdata_SkinProfile)
route.get("/:id", deletedata_SkinProfile)
export default route