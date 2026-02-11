import React, { useEffect, useState, useContext } from "react"
import Navbar from "../Components/Navbar"
import { ThemeContext } from "../context/ThemeContext"

const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]

const Meal_planner = () => {

  const { mode } = useContext(ThemeContext)
  const [mealsData, setMealsData] = useState({})
  const [selectedDate, setSelectedDate] = useState(null)
  const [formMeals, setFormMeals] = useState({
    breakfast:"",
    lunch:"",
    dinner:""
  })

  // load meals
  useEffect(()=>{
    fetch("http://localhost:3200/MealPlanner")
      .then(res=>res.json())
      .then(data=>{
        const mapped={}
        data.forEach(d=>{
          mapped[d.date]=d.meals
        })
        setMealsData(mapped)
      })
  },[])

  // generate calendar days
  const generateDays = ()=>{
    const arr=[]
    for(let i=1;i<=31;i++){
      arr.push(i)
    }
    return arr
  }

  // open meal edit
  const openMeal = (day)=>{
    const date = `2026-02-${day}`

    setSelectedDate(date)

    if(mealsData[date]){
      setFormMeals(mealsData[date])
    }else{
      setFormMeals({
        breakfast:"",
        lunch:"",
        dinner:""
      })
    }
  }

  // save meal
  const saveMeal = async ()=>{
    await fetch("http://localhost:3200/MealPlanner",{
      method:"POST",
      headers:{ "Content-Type":"application/json"},
      body:JSON.stringify({
        date:selectedDate,
        meals:formMeals
      })
    })

    setMealsData(prev=>({
      ...prev,
      [selectedDate]:formMeals
    }))

    setSelectedDate(null)
  }

  return (
    <div>
      <Navbar/>

      <div className="p-6">

        <h2 className="text-3xl font-bold mb-4">Meal Planner</h2>

        {/* CALENDAR GRID */}
        <div className="flex flex-wrap">

          {days.map(d=>(
            <div key={d} className="w-[14.28%] text-center font-semibold border py-2">
              {d}
            </div>
          ))}

          {generateDays().map(day=>{

            const date = `2026-02-${day}`
            const meal = mealsData[date]

            return(
              <div
                key={day}
                onClick={()=>openMeal(day)}
                className={`w-[14.28%] h-32 border cursor-pointer p-2 text-xs
                ${mode==="girly"
                  ? "bg-purple-50 hover:bg-purple-100"
                  : "bg-gray-900 hover:bg-gray-800 text-white"}
                `}
              >
                <div className="font-bold">{day}</div>

                {meal && (
                  <div className="mt-1 space-y-1">
                    <div>🍳 {meal.breakfast}</div>
                    <div>🍱 {meal.lunch}</div>
                    <div>🍽 {meal.dinner}</div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

      </div>

      {/* MODAL */}
      {selectedDate && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
          <div className={`p-6 rounded-xl w-[350px]
            ${mode==="girly" ? "bg-white" : "bg-gray-800 text-white"}
          `}>

            <h3 className="font-bold mb-3">Meals for {selectedDate}</h3>

            <input
              placeholder="Breakfast"
              className="w-full border p-2 mb-2"
              value={formMeals.breakfast}
              onChange={(e)=>setFormMeals({...formMeals, breakfast:e.target.value})}
            />

            <input
              placeholder="Lunch"
              className="w-full border p-2 mb-2"
              value={formMeals.lunch}
              onChange={(e)=>setFormMeals({...formMeals, lunch:e.target.value})}
            />

            <input
              placeholder="Dinner"
              className="w-full border p-2 mb-4"
              value={formMeals.dinner}
              onChange={(e)=>setFormMeals({...formMeals, dinner:e.target.value})}
            />

            <button
              onClick={saveMeal}
              className="w-full py-2 bg-purple-700 text-white rounded-lg"
            >
              Save Meals
            </button>

          </div>
        </div>
      )}

    </div>
  )
}

export default Meal_planner
