import express from 'express'
import cors from "cors"
import Daily_planner from "./Routes/DailyPlanner.routes.js"
import home from "./Routes/home.routes.js"
import Weekly_Planner from './Routes/Weekly_Planner.routes.js'

const app = express()

app.use(express.json())
app.use(cors())

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({ error: "Invalid JSON body" });
  }
  next();
});

app.use("/", home)
app.use("/Daily_planner", Daily_planner)
app.use("/Weekly_Planner" , Weekly_Planner)

app.listen(3200 , ()=>{
    console.log("Server is running at port 3200")
})