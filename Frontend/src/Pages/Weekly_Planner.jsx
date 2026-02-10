import React, { useContext, useState, useEffect } from 'react'
import { ThemeContext } from '../context/ThemeContext'
import Navbar from '../Components/Navbar'
import girly from "../assets/backgrounds/weeklyPlannergirly.png"
import dark from "../assets/backgrounds/weeklyPlannerdark.png"
import DailyCard from "../Components/DailyPlannercards"

const Weekly_Planner = () => {

  const { mode } = useContext(ThemeContext)

  // weekly cards state
  const [cardsData, setCardsData] = useState({
    "Weekly-Monday": [],
    "Weekly-Tuesday": [],
    "Weekly-Wednesday": [],
    "Weekly-Thursday": [],
    "Weekly-Friday": [],
    "Weekly-Saturday": [],
    "Weekly-Sunday": [],
  })

  const [taskbelowDP, settaskbelowDP] = useState({
    Task_text: "",
    Done: false
  })

  const [Type, setType] = useState("")
  const [inputtextDP, setInputtextDP] = useState(false)

  // FETCH weekly data
  useEffect(() => {
    const days = [
      "Weekly-Monday",
      "Weekly-Tuesday",
      "Weekly-Wednesday",
      "Weekly-Thursday",
      "Weekly-Friday",
      "Weekly-Saturday",
      "Weekly-Sunday",
    ]

    days.forEach(async (t) => {
      const res = await fetch(`http://localhost:3200/Daily_planner/${t}`)
      const data = await res.json()

      setCardsData(prev => ({
        ...prev,
        [t]: data
      }))
    })
  }, [])

  // ADD button click
  const addtask_belowDP = (t) => {
    setType(t)
    setInputtextDP(true)
  }

  // input change
  const HandlechangeDB = (e) => {
    settaskbelowDP({ ...taskbelowDP, [e.target.name]: e.target.value })
  }

  // SAVE task
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

  // toggle done
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

      {/* Background */}
      <div
        className='w-full h-72 bg-cover'
        style={{
          backgroundImage: mode === "girly"
            ? `URL(${girly})`
            : `URL(${dark})`
        }}
      />

      <div className=' w-full mt-8 px-8'>

        {/* Heading */}
        <div className='w-[20%]'>
          <div
            className="inline-block px-4 py-1 rounded text-sm font-semibold"
            style={{
              backgroundColor: mode === "girly" ? "#E9D5FF" : "#1F2A44",
              color: mode === "girly" ? "#4C1D95" : "#E5E7EB",
            }}>
            Weekly Planner
          </div>
        </div>

        {/* Weekly Cards */}
        <div className="mt-8 mx-1 flex flex-wrap gap-1 justify-center">

          <DailyCard
            title="Monday"
            type="Weekly-Monday"
            items={cardsData["Weekly-Monday"]}
            mode={mode}
            inputVisible={inputtextDP && Type === "Weekly-Monday"}
            onAdd={addtask_belowDP}
            onSave={SavetaskDB}
            onToggle={(id) => toggledoneDB("Weekly-Monday", id)}
            onChange={HandlechangeDB}
          />

          <DailyCard
            title="Tuesday"
            type="Weekly-Tuesday"
            items={cardsData["Weekly-Tuesday"]}
            mode={mode}
            inputVisible={inputtextDP && Type === "Weekly-Tuesday"}
            onAdd={addtask_belowDP}
            onSave={SavetaskDB}
            onToggle={(id) => toggledoneDB("Weekly-Tuesday", id)}
            onChange={HandlechangeDB}
          />

          <DailyCard
            title="Wednesday"
            type="Weekly-Wednesday"
            items={cardsData["Weekly-Wednesday"]}
            mode={mode}
            inputVisible={inputtextDP && Type === "Weekly-Wednesday"}
            onAdd={addtask_belowDP}
            onSave={SavetaskDB}
            onToggle={(id) => toggledoneDB("Weekly-Wednesday", id)}
            onChange={HandlechangeDB}
          />

          <DailyCard
            title="Thursday"
            type="Weekly-Thursday"
            items={cardsData["Weekly-Thursday"]}
            mode={mode}
            inputVisible={inputtextDP && Type === "Weekly-Thursday"}
            onAdd={addtask_belowDP}
            onSave={SavetaskDB}
            onToggle={(id) => toggledoneDB("Weekly-Thursday", id)}
            onChange={HandlechangeDB}
          />

          <DailyCard
            title="Friday"
            type="Weekly-Friday"
            items={cardsData["Weekly-Friday"]}
            mode={mode}
            inputVisible={inputtextDP && Type === "Weekly-Friday"}
            onAdd={addtask_belowDP}
            onSave={SavetaskDB}
            onToggle={(id) => toggledoneDB("Weekly-Friday", id)}
            onChange={HandlechangeDB}
          />

          <DailyCard
            title="Saturday"
            type="Weekly-Saturday"
            items={cardsData["Weekly-Saturday"]}
            mode={mode}
            inputVisible={inputtextDP && Type === "Weekly-Saturday"}
            onAdd={addtask_belowDP}
            onSave={SavetaskDB}
            onToggle={(id) => toggledoneDB("Weekly-Saturday", id)}
            onChange={HandlechangeDB}
          />

          <DailyCard
            title="Sunday"
            type="Weekly-Sunday"
            items={cardsData["Weekly-Sunday"]}
            mode={mode}
            inputVisible={inputtextDP && Type === "Weekly-Sunday"}
            onAdd={addtask_belowDP}
            onSave={SavetaskDB}
            onToggle={(id) => toggledoneDB("Weekly-Sunday", id)}
            onChange={HandlechangeDB}
          />

        </div>
      </div>
    </div>
  )
}

export default Weekly_Planner
