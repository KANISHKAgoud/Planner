import React, { useContext, useState, useEffect } from 'react'
import Navbar from "../Components/Navbar"
import Footer from "../Components/footer"
import { ThemeContext } from '../context/ThemeContext'
import girlymode from "../assets/backgrounds/Daily-routine-girly.png"
import darkmode from "../assets/backgrounds/Daily-routine-dark.png"

const Daily_planner = () => {
  const { mode } = useContext(ThemeContext)
  const [Task, setTask] = useState([])

  const [newtask, setnewtask] = useState({
    Time: "",
    Task: "",
    Notes: "",
    Done: false
  })
  const [inputtext, setinputtext] = useState(false)
  const [Editingid, setEditingid] = useState()

  useEffect(() => {
    fetch("http://localhost:3200/Daily_planner")
      .then(res => res.json())
      .then(data => setTask(data))
  }, [])


  const addtask = () => {
    setinputtext(true)
  }

  const TaskDone = (id) => {
    setTask(prev => 
    prev.map(t=> t._id === id ? {...t , Done : !t.Done } : t)
    )
  }

  const Handlechange = (e) => {
    setnewtask({ ...newtask, [e.target.name]: e.target.value })
    // setinputtext(false)
  }

  const Savetask = async () => {
    const res = await fetch("http://localhost:3200/Daily_planner", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body : JSON.stringify({
        Time: newtask.Time,
        Task: newtask.Task,
        Notes: newtask.Notes,
        Done : newtask.Done
      })
    })

    const a = await res.json()
    setTask (elements => [...elements , a])
    setnewtask({Time: "",
    Task: "",
    Notes: "",
    Done : false})
    
    setinputtext(false)
  }

  const EditData =(item)=>{
    setnewtask({
      Time : item.Time,
      Task : item.Task,
      Notes : item.Notes,
      Done: item.Done
    })
    setEditingid(item._id)
  }

  const EditTask = async(Editingid)=>{
    const res = await fetch(`http://localhost:3200/Daily_planner/${Editingid}`, {
      method : 'PUT',
      headers : {"Content-Type": "application/json"},
      body : JSON.stringify({
        Time : newtask.Time,
        Task : newtask.Task,
        Notes : newtask.Notes,
        Done : false
      })
    })

    const saved = await res.json()
    setTask(prev =>
      prev.map((t)=> t._id === Editingid ? saved : t)
    )
    setnewtask({Time: "",
    Task: "",
    Notes: "",
    Done : false})
    setEditingid(null)
  }

    const RemoveTask = async (id)=>{
      await fetch(`http://localhost:3200/Daily_planner/${id}`,{
        method : "DELETE"
      })
      setTask(Task.filter((item)=> item._id!=id))
    }

  return (
    <div>
      <Navbar />

      {/* Daily backgroud image url  */}
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

        {/* Today's Schedule task  */}
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


        {Task.map((items , index) => {
          return (

            <div key={items._id || index} className='flex border-r-2 border-l-2 border-b-2'>
              <div className='w-[15%] border-2 text-center'>{
                Editingid === items._id ? <input type='time' placeholder="time" name="Time" value={newtask.Time} className='' onChange={Handlechange}/> : items.Time
              }
              </div>
              <div className='w-[33%] border-2 text-center'>
                {Editingid === items._id ? <input type='text' placeholder="task" name="Task" value={newtask.Task} className='text-center' onChange={Handlechange}/> :items.Task}
              </div>

              <div className='w-[32%] border-2 text-center'>
                {Editingid === items._id ? <input type='text' placeholder="Notes" name="Notes" value={newtask.Notes} className='text-center' onChange={Handlechange}/>: items.Notes}
              </div>

              <div className='w-[20%] border-r-2 border-l-2 text-center flex gap-4 justify-center'>
                <button onClick={()=> TaskDone(items._id)}>
                  {items.Done ? <i className="fa-solid fa-square-check"></i> :
                    <i className="fa-regular fa-square"></i>
                  }
                </button>

                <button onClick={() => RemoveTask(items._id)}>
                  <i className="fa-solid fa-trash"></i>
                </button>

                <button onClick={()=>EditData(items)}>
                  <i className="fa-solid fa-pen-to-square"></i>
                </button>

              </div>
            </div>)
        }
        )
        }

        {inputtext && <div className='flex border-r-2 border-l-2 border-b-2'>
          <input type='time' placeholder="time" name="Time" value={newtask.Time} className='w-[15%] border-l-2 text-center bg-transparent px-2 py-1 focus:ring-0 focus:border-purple-500' onChange={Handlechange}>

          </input>
          <input type='text' placeholder="task" name="Task" value={newtask.Task} className='w-[33%] border-l-2 text-center' onChange={Handlechange}>

          </input>
          <input type='text' placeholder="Notes" name="Notes" value={newtask.Notes} className='w-[32%] border-l-2 text-center' onChange={Handlechange}>

          </input>
          <div className='w-[20%] border-r-2 border-l-2 text-center'>
          </div>
        </div>}


        <div className='mt-4 flex justify-center gap-4'>


          <button onClick={addtask} style={{ backgroundColor: mode === "girly" ? "#4C1D95" : "#E5E7EB" }} className='px-4 text-white cursor-pointer'>Add Task</button>

          <button onClick={() => (Editingid ? EditTask(Editingid) : Savetask())} style={{ backgroundColor: mode === "girly" ? "#4C1D95" : "#E5E7EB" }} className='px-4 text-white cursor-pointer'>Save your task </button>

        </div>
      </div>

      <div className='w-[25%] my-6 mx-4 border-2 rounded-2 flex justify-center align-center '>
        <div className='flex gap-2 justify-center align-center mt-2'>
          <i className="fa-solid fa-thumbtack"></i>
          <div className='font-semibold text-lg'>Reminders</div>
        </div>
        <div>
          <div className='bg-black opacity-30 h-1 w-[80%]'></div>

          <div>hey</div>
        </div>
      </div>


      <Footer/>
    </div>
  )
}

export default Daily_planner
