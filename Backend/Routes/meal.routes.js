import express from "express"
import { getMeals, saveMeal, deleteMeal } from "../controllers/meal.controller.js"

const router = express.Router()

router.get("/", getMeals)
router.post("/", saveMeal)
router.delete("/:date", deleteMeal)

export default router
