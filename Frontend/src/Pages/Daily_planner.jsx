import React, { useContext, useState, useEffect } from 'react'
import Navbar from "../Components/Navbar"
import Footer from "../Components/footer"
import { ThemeContext } from '../context/ThemeContext'
import girlymode from "../assets/backgrounds/Daily-routine-girly.png"
import darkmode from "../assets/backgrounds/Daily-routine-dark.png"
import DailyCard from "../Components/DailyPlannercards"

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

  // Adding the const below the Daily-Planner
  const [cardsData, setCardsData] = useState({
    "Daily-Planner-Reminder": [],
    "Daily-Planner-MorningRitual": [],
    "Daily-Planner-EveningRitual": [],
    "Daily-Planner-Notes": [],
  })

  const [taskbelowDP, settaskbelowDP] = useState({
    Task_text: "",
    Done: false
  })

  const [Type, setType] = useState("")
  const [inputtextDP, setInputtextDP] = useState(false)

  useEffect(() => {
    fetch("http://localhost:3200/Daily_planner")
      .then(res => res.json())
      .then(data => setTask(data))
  }, [])

  // useeffect below the Daily-Planner 
  useEffect(() => {
    const types = [
      "Daily-Planner-Reminder",
      "Daily-Planner-MorningRitual",
      "Daily-Planner-EveningRitual",
      "Daily-Planner-Notes",
    ]

    types.forEach(async (t) => {
      const res = await fetch(`http://localhost:3200/Daily_planner/${t}`)
      const data = await res.json()

      setCardsData(prev => ({
        ...prev,
        [t]: data
      }))
    })
  }, [])



  // ALL OF THIS IS WORKING FOR THE DAILY PLANNER
  const addtask = () => {
    setinputtext(true)
  }

  const TaskDone = (id) => {
    setTask(prev =>
      prev.map(t => t._id === id ? { ...t, Done: !t.Done } : t)
    )
  }

  const Handlechange = (e) => {
    setnewtask({ ...newtask, [e.target.name]: e.target.value })
  }

  const reloadTasks = async () => {
  const res = await fetch("http://localhost:3200/Daily_planner");
  const data = await res.json();
  setTask(data);
};


  const Savetask = async () => {
    await fetch("http://localhost:3200/Daily_planner/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        Time: newtask.Time,
        Task: newtask.Task,
        Notes: newtask.Notes,
        Done: newtask.Done
      })
    })

    await reloadTasks();

    // const a = await res.json()
    // setTask(elements => [...elements, a])
    setnewtask({
      Time: "",
      Task: "",
      Notes: "",
      Done: false
    })

    setinputtext(false)
  }

  const EditData = (item) => {
    setnewtask({
      Time: item.Time,
      Task: item.Task,
      Notes: item.Notes,
      Done: item.Done
    })
    setEditingid(item._id)
  }

  const EditTask = async (Editingid) => {
    const res = await fetch(`http://localhost:3200/Daily_planner/${Editingid}`, {
      method: 'PUT',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        Time: newtask.Time,
        Task: newtask.Task,
        Notes: newtask.Notes,
        Done: false
      })
    })

    const saved = await res.json()
    setTask(prev =>
      prev.map((t) => t._id === Editingid ? saved : t)
    )
    setnewtask({
      Time: "",
      Task: "",
      Notes: "",
      Done: false
    })
    setEditingid(null)
  }

  const RemoveTask = async (id) => {
    await fetch(`http://localhost:3200/Daily_planner/${id}`, {
      method: "DELETE"
    })
    setTask(Task.filter((item) => item._id != id))
  }

  // THIS IS BELOW THE DAILY-PLANNER 
  const addtask_belowDP = (t) => {
    setType(t)
    setInputtextDP(true)
  }

  const HandlechangeDB = (e) => {
    settaskbelowDP({ ...taskbelowDP, [e.target.name]: e.target.value })
  }

  const SavetaskDB = async () => {
    const res = await fetch(`http://localhost:3200/Daily_planner/${Type}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        Task_text: taskbelowDP.Task_text,
        Done: taskbelowDP.Done
      })
    })

    const saved = await res.json()

    setCardsData(prev => ({
      ...prev,
      [Type]: [...prev[Type], saved]
    }))

    settaskbelowDP({ Task_text: "", Done: false })
    setInputtextDP(false)
    setType("")
  }


  const toggledoneDB = (type, id) => {
    setCardsData(prev => ({
      ...prev,
      [type]: prev[type].map(t =>
        t._id === id ? { ...t, Done: !t.Done } : t
      )
    }))
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


        {Task.map((items, index) => {
          return (

            <div key={items._id || index} className='flex flex-col md:flex-row 
             border border-black/20 rounded-xl md:rounded-none 
             md:border-r-2 md:border-l-2 md:border-b-2 
             my-2 md:my-0 p-2 md:p-0 gap-2 md:gap-0'>

              <div className="md:w-[15%] border md:border-2 text-center">
                <span className="md:hidden font-semibold">Time: </span>
                {Editingid === items._id
                  ? <input type="time" name="Time" value={newtask.Time} onChange={Handlechange} />
                  : items.Time}
              </div>

              <div className="md:w-[33%] border md:border-2 text-center">
                <span className="md:hidden font-semibold">Task: </span>
                {Editingid === items._id
                  ? <input type="text" name="Task" value={newtask.Task} onChange={Handlechange} />
                  : items.Task}
              </div>

              <div className="md:w-[32%] border md:border-2 text-center">
                <span className="md:hidden font-semibold">Notes: </span>
                {Editingid === items._id
                  ? <input type="text" name="Notes" value={newtask.Notes} onChange={Handlechange} />
                  : items.Note}
              </div>

              <div className="md:w-[20%] border md:border-2 text-center flex gap-4 justify-center">
                <button onClick={() => TaskDone(items._id)}>
                  {items.Done ? <i className="fa-solid fa-square-check"></i> : <i className="fa-regular fa-square"></i>}
                </button>
                <button onClick={() => RemoveTask(items._id)}>
                  <i className="fa-solid fa-trash"></i>
                </button>
                <button onClick={() => EditData(items)}>
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


          <button onClick={addtask} style={{ backgroundColor: mode === "girly" ? "#4C1D95" : "#18372d" }} className='px-4 text-white cursor-pointer'>Add Task</button>

          <button onClick={() => (Editingid ? EditTask(Editingid) : Savetask())} style={{ backgroundColor: mode === "girly" ? "#4C1D95" : "#18372d" }} className='px-4 text-white cursor-pointer'>Save your task </button>

        </div>
      </div>

      {/* Below the Daily Planner Here Starts the other task  */}
      <div className="mt-8 mx-1 flex flex-wrap gap-1 justify-center">

        {/* Reminder part starts from here  */}
        <DailyCard
          title="Reminders"
          type="Daily-Planner-Reminder"
          items={cardsData["Daily-Planner-Reminder"]}
          mode={mode}
          inputVisible={inputtextDP && Type === "Daily-Planner-Reminder"}
          onAdd={addtask_belowDP}
          onSave={SavetaskDB}
          onToggle={(id) => toggledoneDB("Daily-Planner-Reminder", id)}
          onChange={HandlechangeDB}
        />

        <DailyCard
          title="Notes"
          type="Daily-Planner-Notes"
          items={cardsData["Daily-Planner-Notes"]}
          mode={mode}
          inputVisible={inputtextDP && Type === "Daily-Planner-Notes"}
          onAdd={addtask_belowDP}
          onSave={SavetaskDB}
          onToggle={(id) => toggledoneDB("Daily-Planner-Notes", id)}
          onChange={HandlechangeDB}
        />

        <DailyCard
          title="Morning Ritual"
          type="Daily-Planner-MorningRitual"
          items={cardsData["Daily-Planner-MorningRitual"]}
          mode={mode}
          inputVisible={inputtextDP && Type === "Daily-Planner-MorningRitual"}
          onAdd={addtask_belowDP}
          onSave={SavetaskDB}
          onToggle={(id) => toggledoneDB("Daily-Planner-MorningRitual", id)}
          onChange={HandlechangeDB}
        />

        <DailyCard
          title="Evening Ritual"
          type="Daily-Planner-EveningRitual"
          items={cardsData["Daily-Planner-EveningRitual"]}
          mode={mode}
          inputVisible={inputtextDP && Type === "Daily-Planner-EveningRitual"}
          onAdd={addtask_belowDP}
          onSave={SavetaskDB}
          onToggle={(id) => toggledoneDB("Daily-Planner-EveningRitual", id)}
          onChange={HandlechangeDB}
        />


      </div>


      <Footer />
    </div>
  )
}

export default Daily_planner
