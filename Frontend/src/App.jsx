import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Sign_in from './Pages/Sign_in'
import Journal from './Pages/Journal'
import Study from './Pages/Study'
import Meal_planner from './Pages/Meal_planner'
import Monthly_Tracker from './Pages/Monthly_Tracker'
import Weekly_Planner from './Pages/Weekly_Planner'
import Daily_planner from './Pages/Daily_planner'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/Sign_in' element={<Sign_in />} />
        <Route path="/Journal" element= {<Journal/>} />
        <Route path="/Study" element= {<Study/>} />
        <Route path="/Daily_planner" element= {<Daily_planner/>} />
        <Route path="/Meal_planner" element= {<Meal_planner/>} />
        <Route path="/Monthly_Tracker" element= {<Monthly_Tracker/>} />
        <Route path="/Weekly_Planner" element= {<Weekly_Planner/>} />

      </Routes>

    </>
  )
}

export default App
