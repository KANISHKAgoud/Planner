import React, { useEffect, useState, useContext } from "react"
import Navbar from "../Components/Navbar"
import { ThemeContext } from "../context/ThemeContext"

const Study = () => {

  const { mode } = useContext(ThemeContext)

  const [subject, setSubject] = useState("")
  const [topics, setTopics] = useState([{ text:"", done:false }])
  const [important, setImportant] = useState([""])
  const [tasks, setTasks] = useState([""])
  const [notes, setNotes] = useState("")

  // LOAD
  useEffect(()=>{
    fetch("http://localhost:3200/StudyPlanner")
      .then(res=>res.json())
      .then(data=>{
        if(!data) return

        setSubject(data.subject || "")
        setTopics(data.topics || [{ text:"", done:false }])
        setImportant(data.important || [""])
        setTasks(data.tasks || [""])
        setNotes(data.notes || "")
      })
  },[])

  // SAVE
  const saveStudy = async ()=>{
    await fetch("http://localhost:3200/StudyPlanner",{
      method:"POST",
      headers:{ "Content-Type":"application/json"},
      body:JSON.stringify({
        subject,
        topics,
        important,
        tasks,
        notes
      })
    })
  }

  const updateTopic = (i,val)=>{
    const arr=[...topics]
    arr[i].text=val
    setTopics(arr)
  }

  const toggleTopic = (i)=>{
    const arr=[...topics]
    arr[i].done=!arr[i].done
    setTopics(arr)
  }

  return (
    <div>
      <Navbar/>

      <div className="p-6">

        <h1 className="text-4xl font-bold mb-4">Study Planner</h1>

        {/* SUBJECT */}
        <input
          placeholder="Subject"
          value={subject}
          onChange={(e)=>setSubject(e.target.value)}
          className="w-full border-b p-2 mb-6 outline-none"
        />

        <div className="flex flex-wrap gap-6">

          {/* LEFT */}
          <div className="w-full md:w-[45%]">

            <h3 className="font-semibold mb-2">Topics / Chapters</h3>

            {topics.map((t,i)=>(
              <div key={i} className="flex items-center gap-2 mb-2">
                <input
                  type="checkbox"
                  checked={t.done}
                  onChange={()=>toggleTopic(i)}
                />
                <input
                  value={t.text}
                  onChange={(e)=>updateTopic(i,e.target.value)}
                  className="flex-1 p-2 rounded-md border"
                />
              </div>
            ))}

            <button
              onClick={()=>setTopics([...topics,{text:"",done:false}])}
              className="mt-2 text-sm text-purple-600"
            >
              + Add topic
            </button>
          </div>

          {/* RIGHT */}
          <div className="w-full md:w-[45%]">

            <h3 className="font-semibold mb-2">Important</h3>

            {important.map((t,i)=>(
              <input
                key={i}
                value={t}
                onChange={(e)=>{
                  const arr=[...important]
                  arr[i]=e.target.value
                  setImportant(arr)
                }}
                className="w-full border-b p-2 mb-2"
              />
            ))}

            <button onClick={()=>setImportant([...important,""])} className="text-sm text-purple-600">
              + Add important
            </button>

            <h3 className="font-semibold mt-6 mb-2">Tasks</h3>

            {tasks.map((t,i)=>(
              <input
                key={i}
                value={t}
                onChange={(e)=>{
                  const arr=[...tasks]
                  arr[i]=e.target.value
                  setTasks(arr)
                }}
                className="w-full border-b p-2 mb-2"
              />
            ))}

            <button onClick={()=>setTasks([...tasks,""])} className="text-sm text-purple-600">
              + Add task
            </button>
          </div>

        </div>

        {/* NOTES */}
        <div className="mt-8">
          <h3 className="font-semibold mb-2">Notes</h3>
          <textarea
            value={notes}
            onChange={(e)=>setNotes(e.target.value)}
            className="w-full min-h-[150px] border rounded-xl p-3"
          />
        </div>

        <button
          onClick={saveStudy}
          className="mt-6 px-6 py-2 rounded-lg text-white"
          style={{
            backgroundColor: mode==="girly" ? "#4C1D95" : "#1F2937"
          }}
        >
          Save Study Plan
        </button>

      </div>
    </div>
  )
}

export default Study
