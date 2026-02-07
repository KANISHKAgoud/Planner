// import { connection } from "../config/db";
// import { ObjectId } from "mongodb";

// function getcollectionname(type){
//   if(type == "WeeklyPlanner-SkinProfile") return "WeeklyPlanner-SkinProfile"
//   if(type == "WeeklyPlanner-Skintips") return "WeeklyPlanner-Skintips"
//   if(type == "WeeklyPlanner-Skintodo") return "WeeklyPlanner-Skintodo"
//   return null
// }

// export const getdata = async (req, res) =>{
//     const {type} = req.query
//       const collectionName = getcollectionname(type)
    
//       if (!collectionName){
//         res.status(400).json({invalid:"collection name"})
//       }
//       const db = await connection();
//       const collection = db.collection(collectionName);
//       const data = await collection.find().toArray();
//       res.json(data);
// }

// export const postdata = async (req, res) => {
//   const {text,type} = req.body

//   if (!text || !type) {
//     return res.status(400).json({ error: "Text is required" });
//   }

//   const collectionName = getcollectionname(type)

//   const db = await connection();
//   const collection = db.collection(collectionName);

//   const result = await collection.insertOne({ text: text });
//   res.json({ _id: result.insertedId, text: text });
// }

// export const deletedata_SkinProfile = async (req, res) => {
//   const {type} = req.query
//   const collectionName = getcollectionname(type)

//   const db = await connection();
//   const collection = db.collection(collectionName);

//   await collection.deleteOne({ _id: new ObjectId(req.params.id) });
//   res.json({ success: true });
// }