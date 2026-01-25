import express from "express"
import { ObjectId } from "mongodb"
import {connection} from "../config/db.js"

export const getdata = async (req, res) =>{
    const dbconnection = await connection()
    const collection = await dbconnection.collection('Daily-Planner')
    const data = await collection.find().toArray()
    res.json(data)
}

export const postdata = async(req, res)=> {
    const {Time, Task, Notes , Done} = req.body
    const dbconnection = await connection()
    const collection = await dbconnection.collection("Daily-Planner")
    const data = await collection.insertOne({Time : Time , Task : Task , Note : Notes , Done : Done})
    res.json({ id : data.insertedId ,
        Time : Time, 
        Task : Task, 
        Note : Notes,
        Done : Done
     })
}

export const putdata = async(req,res) =>{
    const {Time , Task , Notes, Done} = req.body
    const dbconnection = await connection()
    const collection = await dbconnection.collection("Daily-Planner")
    const data = await collection.updateOne({id : new ObjectId(req.params.id)},{$set: {Time, Task, Notes, Done }})
    res.json({
        _id : data.insertedId, 
        Time,
        Task,
        Notes,
        Done
    })
}

export const deletedata = async(req, res) =>{
    const dbconnection = await connection()
    const collection = await dbconnection.collection("Daily-Planner")
    const result = await collection.deleteOne({_id : new ObjectId(req.params.id)})
    res.json({success : true})
}