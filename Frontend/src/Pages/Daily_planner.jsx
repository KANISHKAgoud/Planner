import React, { useContext } from 'react'
import Navbar from "../Components/Navbar"
import { ThemeContext } from '../context/ThemeContext'
import girlymode from "../assets/backgrounds/Daily-routine-girly.png"
import darkmode from "../assets/backgrounds/Daily-routine-dark.png"

const Daily_planner = () => {
  const { mode } = useContext(ThemeContext)

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

      </div>
    </div>
  )
}

export default Daily_planner
