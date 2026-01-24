import React, { useContext, useState } from 'react'
import Navbar from "../Components/Navbar"
import { ThemeContext } from '../context/ThemeContext'
import girlymode from "../assets/backgrounds/Daily-routine-girly.png"
import darkmode from "../assets/backgrounds/Daily-routine-dark.png"

const Daily_planner = () => {
  const { mode } = useContext(ThemeContext)

  const [task, settask] = useState([{
    time : "",
    task : "",
    Notes : ""
  }])
  const [inputtext, setinputtext] = useState(false)
  const [taskstatus, settaskstatus] = useState(false)

  const addtask = () => {
    setinputtext(true)
  }

  const TaskDone = () => {
    settaskstatus(true)
  }

  const Handlechange =(e)=>{
    settask({ ...task , [e.target.name] : e.target.value})
    setinputtext(false)
  }

  return (
    <div>
      <Navbar />
      <div
        className="w-full h-72 bg-cover"
        style={{
          backgroundImage:
            mode === "girly"
              ? `url(${girlymode})`
              : `url(${darkmode})`,
        }} />

      <div className='mt-4 mx-6 font-bold text-2xl'>
        Daily Planner
      </div>

      <div className='mt-6 mx-6'>
        <div className=' font-semibold text-lg'>
          Today's Schedule
        </div>
        <div className='flex mt-3 border-2'>
          <div className='w-[15%] border-2 text-center'>
            Time
          </div>
          <div className='w-[33%] border-2 text-center'>
            Task
          </div>
          <div className='w-[32%] border-2 text-center'>
            Notes
          </div>
          <div className='w-[20%] border-2 text-center'>
            Done
          </div>
        </div>

        {inputtext && <div className='flex border-r-2 border-l-2 border-b-2'>
          <input type='text' placeholder="time" name = "time" value={task.time} className='w-[15%] border-l-2  text-center' onChange = {Handlechange}>

          </input>
          <input type='text' placeholder="task" name = "task" value={task.task} className='w-[33%] border-l-2 text-center' onChange = {Handlechange}>

          </input>
          <input type='text' placeholder="Notes" name = "Notes" value={task.Notes} className='w-[32%] border-l-2 text-center' onChange = {Handlechange}>

          </input>
          <div className='w-[20%] border-r-2 border-l-2 text-center'>
            <button onClick={TaskDone}>
              {taskstatus ? <i className="fa-solid fa-square-check"></i> :
          <i className="fa-regular fa-square"></i>
          }
              </button>
          </div>
        </div>}

        <button onClick={addtask} style={{backgroundColor : mode === "girly" ? "#4C1D95" : "#E5E7EB"}} className='mt-4 '>Add Task</button>

      </div>
    </div>
  )
}

export default Daily_planner
