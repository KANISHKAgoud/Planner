
import React from 'react'
import { useState } from 'react'
import girly from '../assets/backgrounds/girly.png'
import dark from '../assets/backgrounds/dark.png'
import Navbar from '../Components/Navbar'


const Home = () => {
    const [mode, setmode] = useState("girly")
    // const [bg, setbg] = useState(true)

    const background = () => {
        if (mode === "girly")
            return girly
        if (mode === "dark")
            return dark
        return ""
    }

    return (
        <div>
            <Navbar setmode={setmode} />

            <div className='w-{100%} h-44 md:h-52 bg-cover' style={{ backgroundImage: mode ? `URL(${background()})` : `URL(${background(girly)})` }}>
            </div>


            <div className=' text-amber-50 mt-3 ml-2 w-[14rem]' style={{ backgroundColor: mode === "girly" ? "#D0A2F7" : "#111F35" }}>
                Quick Adds
            </div>

            <div>
                <div>
                    Journal
                </div>
                <button onClick={addbox}>
                    New Entry
                </button>
            </div>
        </div>
    )
}

export default Home
