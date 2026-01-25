import dotenv from "dotenv"
import { MongoClient } from "mongodb"

dotenv.config({ path: "./.env" });

const dbname = "PlannerDB"
const client = new MongoClient(process.env.MONGO_URI)
// export const collectionName = "Journaldata"
export const connection =async ()=>{
    const connect = await client.connect()
    return await connect.db(dbname)
}