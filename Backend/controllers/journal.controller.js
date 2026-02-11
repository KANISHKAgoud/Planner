import { connection } from "../config/db.js"
import { ObjectId } from "mongodb"

// GET all journal entries
export const getJournals = async (req, res) => {
  const db = await connection()
  const collection = db.collection("Journaldata")

  const data = await collection.find().sort({ _id: -1 }).toArray()
  res.json(data)
}


// CREATE journal entry
export const createJournal = async (req, res) => {
  const { text } = req.body

  if (!text) {
    return res.status(400).json({ error: "Journal text required" })
  }

  const db = await connection()
  const collection = db.collection("Journaldata")

  const result = await collection.insertOne({ text })

  res.json({
    _id: result.insertedId,
    text
  })
}


// UPDATE journal
export const updateJournal = async (req, res) => {
  const { id } = req.params
  const { text } = req.body

  const db = await connection()
  const collection = db.collection("Journaldata")

  await collection.updateOne(
    { _id: new ObjectId(id) },
    { $set: { text } }
  )

  res.json({
    _id: id,
    text
  })
}


// DELETE journal
export const deleteJournal = async (req, res) => {
  const { id } = req.params

  const db = await connection()
  const collection = db.collection("Journaldata")

  await collection.deleteOne({ _id: new ObjectId(id) })

  res.json({ success: true })
}
