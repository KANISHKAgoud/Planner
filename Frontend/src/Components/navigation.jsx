import React, { useContext } from 'react'
import gNavigation from '../assets/Navigation/gNavigation.png'
import dNavigation from '../assets/Navigation/dNavigation.png'
import { Link } from 'react-router-dom'
import { ThemeContext } from '../context/ThemeContext'


const Navigation = () => {
    const {mode} = useContext(ThemeContext)
    return (
        <div>
            <div className='w-full h-72 bg-cover' style={{ backgroundImage: mode === "girly" ? `URL(${gNavigation})` : `URL(${dNavigation})` }}>

            </div>
            <div
                className="inline-block px-4 py-1 rounded text-sm text-center font-semibold mt-4"
                style={{
                    backgroundColor: mode === "girly" ? "#E9D5FF" : "#1F2A44",
                    color: mode === "girly" ? "#4C1D95" : "#E5E7EB",
                }}>
                Navigation
            </div>
            <div className='list-none flex flex-col gap-2 mt-4 mx-3'>
                <Link to="/">Home</Link>
                <Link to="/Journal">Journal</Link>
                <Link to="/Study">Study</Link>
                <Link to="/Sign_in">Sign_in</Link>

            </div>
        </div>
    )
}

export default Navigation
