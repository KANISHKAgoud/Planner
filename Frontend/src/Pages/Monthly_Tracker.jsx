import React, { useContext, useState, useEffect } from 'react'
import Navbar from '../Components/Navbar'
import { ThemeContext } from '../context/ThemeContext'
import girly from "../assets/backgrounds/monthlyPlannergirly.png"
import dark from "../assets/backgrounds/monthlyPlannerdark.png"
import DailyCard from "../Components/DailyPlannercards"

const Monthly_Tracker = () => {

  const { mode } = useContext(ThemeContext)

  // Monthly collections
  const [cardsData, setCardsData] = useState({
    "Monthly-January": [],
    "Monthly-February": [],
    "Monthly-March": [],
    "Monthly-April": [],
    "Monthly-May": [],
    "Monthly-June": [],
    "Monthly-July": [],
    "Monthly-August": [],
    "Monthly-September": [],
    "Monthly-October": [],
    "Monthly-November": [],
    "Monthly-December": [],
  })

  const [taskbelowDP, settaskbelowDP] = useState({
    Task_text: "",
    Done: false
  })

  const [Type, setType] = useState("")
  const [inputtextDP, setInputtextDP] = useState(false)

  // FETCH monthly data
  useEffect(() => {
    const months = [
      "Monthly-January",
      "Monthly-February",
      "Monthly-March",
      "Monthly-April",
      "Monthly-May",
      "Monthly-June",
      "Monthly-July",
      "Monthly-August",
      "Monthly-September",
      "Monthly-October",
      "Monthly-November",
      "Monthly-December",
    ]

    months.forEach(async (t) => {
      const res = await fetch(`http://localhost:3200/Daily_planner/${t}`)
      const data = await res.json()

      setCardsData(prev => ({
        ...prev,
        [t]: data
      }))
    })
  }, [])

  // Add button click
  const addtask_belowDP = (t) => {
    setType(t)
    setInputtextDP(true)
  }

  // Input change
  const HandlechangeDB = (e) => {
    settaskbelowDP({ ...taskbelowDP, [e.target.name]: e.target.value })
  }

  // Save task
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

  // Toggle done
  const toggledoneDB = (type, id) => {
    setCardsData(prev => ({
      ...prev,
      [type]: prev[type].map(t =>
        t._id === id ? { ...t, Done: !t.Done } : t
      )
    }))
  }

  return (
    <div >
      <Navbar />

      {/* Background */}
      <div
        className='w-full h-72 bg-cover'
        style={{
          backgroundImage:
            mode === "girly"
              ? `URL(${girly})`
              : `URL(${dark})`,
        }}
      />

      {/* Heading */}
      <div className=' w-full mt-8 px-8'>
        <div className='w-[20%]'>
          <div
            className="inline-block px-4 py-1 rounded text-sm font-semibold"
            style={{
              backgroundColor: mode === "girly" ? "#E9D5FF" : "#1F2A44",
              color: mode === "girly" ? "#4C1D95" : "#E5E7EB",
            }}>
            Monthly Tracker
          </div>
        </div>

        {/* Monthly Cards */}
        <div className="mt-8 mx-1 flex flex-wrap gap-1 justify-center">

          <DailyCard title="January" type="Monthly-January" items={cardsData["Monthly-January"]} mode={mode}
            inputVisible={inputtextDP && Type === "Monthly-January"}
            onAdd={addtask_belowDP} onSave={SavetaskDB}
            onToggle={(id) => toggledoneDB("Monthly-January", id)}
            onChange={HandlechangeDB}
          />

          <DailyCard title="February" type="Monthly-February" items={cardsData["Monthly-February"]} mode={mode}
            inputVisible={inputtextDP && Type === "Monthly-February"}
            onAdd={addtask_belowDP} onSave={SavetaskDB}
            onToggle={(id) => toggledoneDB("Monthly-February", id)}
            onChange={HandlechangeDB}
          />

          <DailyCard title="March" type="Monthly-March" items={cardsData["Monthly-March"]} mode={mode}
            inputVisible={inputtextDP && Type === "Monthly-March"}
            onAdd={addtask_belowDP} onSave={SavetaskDB}
            onToggle={(id) => toggledoneDB("Monthly-March", id)}
            onChange={HandlechangeDB}
          />

          <DailyCard title="April" type="Monthly-April" items={cardsData["Monthly-April"]} mode={mode}
            inputVisible={inputtextDP && Type === "Monthly-April"}
            onAdd={addtask_belowDP} onSave={SavetaskDB}
            onToggle={(id) => toggledoneDB("Monthly-April", id)}
            onChange={HandlechangeDB}
          />

          <DailyCard title="May" type="Monthly-May" items={cardsData["Monthly-May"]} mode={mode}
            inputVisible={inputtextDP && Type === "Monthly-May"}
            onAdd={addtask_belowDP} onSave={SavetaskDB}
            onToggle={(id) => toggledoneDB("Monthly-May", id)}
            onChange={HandlechangeDB}
          />

          <DailyCard title="June" type="Monthly-June" items={cardsData["Monthly-June"]} mode={mode}
            inputVisible={inputtextDP && Type === "Monthly-June"}
            onAdd={addtask_belowDP} onSave={SavetaskDB}
            onToggle={(id) => toggledoneDB("Monthly-June", id)}
            onChange={HandlechangeDB}
          />

          <DailyCard title="July" type="Monthly-July" items={cardsData["Monthly-July"]} mode={mode}
            inputVisible={inputtextDP && Type === "Monthly-July"}
            onAdd={addtask_belowDP} onSave={SavetaskDB}
            onToggle={(id) => toggledoneDB("Monthly-July", id)}
            onChange={HandlechangeDB}
          />

          <DailyCard title="August" type="Monthly-August" items={cardsData["Monthly-August"]} mode={mode}
            inputVisible={inputtextDP && Type === "Monthly-August"}
            onAdd={addtask_belowDP} onSave={SavetaskDB}
            onToggle={(id) => toggledoneDB("Monthly-August", id)}
            onChange={HandlechangeDB}
          />

          <DailyCard title="September" type="Monthly-September" items={cardsData["Monthly-September"]} mode={mode}
            inputVisible={inputtextDP && Type === "Monthly-September"}
            onAdd={addtask_belowDP} onSave={SavetaskDB}
            onToggle={(id) => toggledoneDB("Monthly-September", id)}
            onChange={HandlechangeDB}
          />

          <DailyCard title="October" type="Monthly-October" items={cardsData["Monthly-October"]} mode={mode}
            inputVisible={inputtextDP && Type === "Monthly-October"}
            onAdd={addtask_belowDP} onSave={SavetaskDB}
            onToggle={(id) => toggledoneDB("Monthly-October", id)}
            onChange={HandlechangeDB}
          />

          <DailyCard title="November" type="Monthly-November" items={cardsData["Monthly-November"]} mode={mode}
            inputVisible={inputtextDP && Type === "Monthly-November"}
            onAdd={addtask_belowDP} onSave={SavetaskDB}
            onToggle={(id) => toggledoneDB("Monthly-November", id)}
            onChange={HandlechangeDB}
          />

          <DailyCard title="December" type="Monthly-December" items={cardsData["Monthly-December"]} mode={mode}
            inputVisible={inputtextDP && Type === "Monthly-December"}
            onAdd={addtask_belowDP} onSave={SavetaskDB}
            onToggle={(id) => toggledoneDB("Monthly-December", id)}
            onChange={HandlechangeDB}
          />

        </div>
      </div>
    </div>
  )
}

export default Monthly_Tracker
