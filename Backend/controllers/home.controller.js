import {ObjectId} from "mongodb"
import {connection} from "../config/db.js"

function getcollectionname(type){
  if(type == "Journaldata") return "Journaldata"
  if(type == "Study") return "Study"
  if(type == "Finance") return "Finance"
  if(type == "Media") return "Media"
  return null
}

export const getdata = async (req, res) =>{
    const {type} = req.query
      const collectionName = getcollectionname(type)
    
      if (!collectionName){
        res.status(400).json({invalid:"collection name"})
      }
      const db = await connection();
      const collection = db.collection(collectionName);
      const data = await collection.find().toArray();
      res.json(data);
}

export const postdata = async (req, res) => {
  const {text,type} = req.body

  if (!text || !type) {
    return res.status(400).json({ error: "Text is required" });
  }

  const collectionName = getcollectionname(type)

  const db = await connection();
  const collection = db.collection(type);

  const result = await collection.insertOne({ text: text });
  res.json({ _id: result.insertedId, text: text });
}

export const deletedata = async (req, res) => {
  const {type} = req.query
  const collectionName = getcollectionname(type)

  const db = await connection();
  const collection = db.collection(collectionName);

  await collection.deleteOne({ _id: new ObjectId(req.params.id) });
  res.json({ success: true });
}