import { MongoClient } from "mongodb"
import dotenv from "dotenv"

dotenv.config({ path: "./.env" })

const dbname = "PlannerDB"
const client = new MongoClient(process.env.MONGO_URI)

export const connection = async()=> {
    const connect = await client.connect()
    return await connect.db(dbname)
}