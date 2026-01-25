import express from "express"
import {getdata, postdata , deletedata} from "../controllers/home.controller.js"

const route = express.Router()

route.get("/" , getdata)
route.post("/" , postdata)
route.delete("/:id", deletedata)

export default route