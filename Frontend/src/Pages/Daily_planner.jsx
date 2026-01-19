import React,{useContext} from 'react'
import Navbar from "../Components/Navbar"
import { ThemeContext } from '../context/ThemeContext'
import girlymode from "../assets/backgrounds/Daily-routine-girly.png"
import darkmode from "../assets/backgrounds/Daily-routine-dark.png"

const Daily_planner = () => {
  const {mode} = useContext(ThemeContext)

  return (
    <div>
      <Navbar/>
      <div
  className="w-full h-72 bg-cover"
  style={{
    backgroundImage:
      mode === "girly"
        ? `url(${girlymode})`
        : `url(${darkmode})`,
  }}
/>

      hi i am daily planner
    </div>
  )
}

export default Daily_planner
