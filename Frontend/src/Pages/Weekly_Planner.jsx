import { React, useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'
import Navbar from '../Components/Navbar'
import girly from "../assets/backgrounds/weeklyPlannergirly.png"
import dark from "../assets/backgrounds/weeklyPlannerdark.png"
// import skin_Profile from '../Components/weekly-Planner-components/skin_Profile'

const Weekly_Planner = () => {
  const { mode } = useContext(ThemeContext)
  return (
    <div>
      <Navbar />
      {/* {mode} */}
      <div className='w-full h-72 bg-cover' style={{ backgroundImage: mode === "girly" ? `URL(${girly})` : `URL(${dark})` }}>
      </div>

      <div className=' w-full flex mt-8 gap-8'>
        <div className='w-[20%] mx-8'>

          <div
            className="inline-block px-4 py-1 rounded text-sm font-semibold"
            style={{
              backgroundColor: mode === "girly" ? "#E9D5FF" : "#1F2A44",
              color: mode === "girly" ? "#4C1D95" : "#E5E7EB",
            }}>
            Weekly Planner
          </div>

          {/* <div className='bg-black opacity-30 h-1 mt-6'></div>
            <skin_Profile/> */}

        </div>

        <div className='w-[65%] border-2'>
          week days are here
        </div>

      </div>
    </div>
  )
}

export default Weekly_Planner
