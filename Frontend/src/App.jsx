import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Sign_in from './Pages/Sign_in'
import Journal from './Pages/Journal'


function App() {

  return (
    <>
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/Sign_in' element={<Sign_in />} />
        <Route path="/Journal" element= {<Journal/>} />

      </Routes>

    </>
  )
}

export default App
