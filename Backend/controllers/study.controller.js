import { connection } from "../config/db.js"
import { ObjectId } from "mongodb"

// GET study data
export const getStudy = async (req, res) => {
  const db = await connection()
  const data = await db.collection("StudyPlanner").findOne()
  res.json(data || {})
}

// SAVE / UPDATE
export const saveStudy = async (req, res) => {
  const db = await connection()
  const collection = db.collection("StudyPlanner")

  const existing = await collection.findOne()

  if (existing) {
    await collection.updateOne({}, { $set: req.body })
    return res.json(req.body)
  }

  await collection.insertOne(req.body)
  res.json(req.body)
}
