import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './Components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Sign_in from './Pages/Sign_in'


function App() {

  return (
    <>
      {/* <Navbar/> */}
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/Sign_in' element={<Sign_in />} />

      </Routes>

    </>
  )
}

export default App
