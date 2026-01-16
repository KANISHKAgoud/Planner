
import React from 'react'
import { useState } from 'react'
import girly from '../assets/backgrounds/girly.png'
import dark from '../assets/backgrounds/dark.png'
import Navbar from '../Components/Navbar'
import { Link } from 'react-router-dom'


const Home = () => {
    const [mode, setmode] = useState("girly")


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

            <div className='flex justify-around mt-6'>
                {/* Quick adds starts from here  */}

                {/* Quick Adds */}

                <div className="px-4 w-2xs">
                    <div
                        className="inline-block px-4 py-1 rounded text-sm font-semibold"
                        style={{
                            backgroundColor: mode === "girly" ? "#E9D5FF" : "#1F2A44",
                            color: mode === "girly" ? "#4C1D95" : "#E5E7EB",
                        }}>
                        Quick Adds
                    </div>

                    <div className='bg-black opacity-30 h-1 mt-1.5'></div>


                    <Link to="/Journal" className=''>
                        <li className='list-none font-semibold'>Journal</li>
                    </Link>

                </div>

                {/* My life starts from here  */}

                <div className='w-3xl px-6 font-medium font-sans'> 
                    My Life
                </div>

                {/* navigation starts from here */}

                <div className='w-2xs px-4'>
                    hey
                </div>


            </div>


        </div>
    );
};

export default Home;
