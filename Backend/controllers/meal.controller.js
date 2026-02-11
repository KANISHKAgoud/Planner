import { connection } from "../config/db.js"
import { ObjectId } from "mongodb"

// GET all meals
export const getMeals = async (req, res) => {
  const db = await connection()
  const data = await db.collection("MealPlanner").find().toArray()
  res.json(data)
}

// SAVE / UPDATE meal
export const saveMeal = async (req, res) => {
  const { date, meals } = req.body

  const db = await connection()
  const collection = db.collection("MealPlanner")

  const existing = await collection.findOne({ date })

  if (existing) {
    await collection.updateOne(
      { date },
      { $set: { meals } }
    )
    return res.json({ date, meals })
  }

  await collection.insertOne({ date, meals })
  res.json({ date, meals })
}

// DELETE meal
export const deleteMeal = async (req, res) => {
  const { date } = req.params

  const db = await connection()
  await db.collection("MealPlanner").deleteOne({ date })

  res.json({ success: true })
}
