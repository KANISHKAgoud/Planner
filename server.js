import express from "express";
import { collectionName, connection } from "./config.js";
import { ObjectId } from "mongodb";
import cors from "cors"

const app = express();
app.use(express.json());

app.use(cors())

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({ error: "Invalid JSON body" });
  }
  next();
});

// GET THE COLLECTION NAME 
function getcollectionname(type){
  if(type == "Journaldata") return "Journaldata"
  if(type == "Study") return "Study"
  if(type == "Finance") return "Finance"
  if(type == "Media") return "Media"
  return null
}
// GET all journal entries
app.get("/", async (req, res) => {
  const {type} = req.query
  const collectionName = getcollectionname(type)

  if (!collectionName){
    res.status(400).json({invalid:"collection name"})
  }
  const db = await connection();
  const collection = db.collection(collectionName);
  const data = await collection.find().toArray();
  res.json(data);
});


// ADD new entry
app.post("/", async (req, res) => {
  const {text,type} = req.body

  if (!text || !type) {
    return res.status(400).json({ error: "Text is required" });
  }

  const collectionName = getcollectionname(type)

  const db = await connection();
  const collection = db.collection(type);

  const result = await collection.insertOne({ text: text });
  res.json({ _id: result.insertedId, text: text });
});

// DELETE entry
app.delete("/:id", async (req, res) => {
  const {type} = req.query
  const collectionName = getcollectionname(type)

  const db = await connection();
  const collection = db.collection(collectionName);

  await collection.deleteOne({ _id: new ObjectId(req.params.id) });
  res.json({ success: true });
});

app.get("/Daily_planner", async (req,res)=>{
  const db = await connection()
  const collection = await db.collection("Daily-Planner")
  const data = await collection.find().toArray()
  // res.send("Done!")
  res.json(data)
})

app.post("/Daily_planner", async(req,res) =>{
  const {Time,Task,Notes,Done} = req.body
  const db = await connection()
  const collection = await db.collection("Daily-Planner")
  const result = await collection.insertOne({Time : Time , Task : Task , Notes : Notes ,Done : Done})
  res.json({id : result.insertedId ,
     Time : Time,
    Task : Task ,
     Notes : Notes,
    Done: Done})
})

app.delete("/Daily_planner/:id", async(req,res)=>{
  const db = await connection()
  const collection = await db.collection("Daily-Planner")
  const result = await collection.deleteOne({ _id : new ObjectId(req.params.id)})
  res.json({success: true})
})

app.put("/Daily_planner/:id" , async(req,res) =>{
  const {Time, Task , Notes , Done} = req.body
  const db = await connection()
  const collection = await db.collection("Daily-Planner")
  const result = await collection.updateOne({_id : new ObjectId(req.params.id)} , {
    $set : { 
      Time,
      Task  , 
      Notes , 
      Done 
    }
  })
  res.json({_id : result.ObjectId , Time , Task , Notes, Done})
})

app.listen(3200, () => {
  console.log("Server running on port 3200");
});
