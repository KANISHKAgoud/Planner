import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
// Bright Mode
import gDaily from '../assets/Mylife/girlyMylife/1st.png'
import gPlanner from '../assets/Mylife/girlyMylife/2nd.png'
import gTracker from '../assets/Mylife/girlyMylife/3rd.png'
import gStudy from '../assets/Mylife/girlyMylife/4th.png'
import gJournal from '../assets/Mylife/girlyMylife/5th.png'
import gMeal from '../assets/Mylife/girlyMylife/6th.png'

// Dark mode
import dDaily from '../assets/Mylife/darkMylife/1st.png'
import dPlanner from '../assets/Mylife/darkMylife/2nd.png'
import dTracker from '../assets/Mylife/darkMylife/3rd.png'
import dStudy from '../assets/Mylife/darkMylife/4th.png'
import dJournal from '../assets/Mylife/darkMylife/5th.png'
import dMeal from '../assets/Mylife/darkMylife/6th.png'

const Mylife = ({ mode }) => {
    const [Listcard, setListcard] = useState([
        {
            "title": "Daily Planner",
            "girly": gDaily,
            "dark": dDaily,
            "navigation" : "/Daily_planner"
        },
        {
            "title": "Weekly Planner",
            "girly": gPlanner,
            "dark": dPlanner,
            "navigation" : "/Weekly_Planner"

        },
        {
            "title": "Monthly Tracker",
            "girly": gTracker,
            "dark": dTracker,
            "navigation" : "/Monthly_Tracker"

        },
        {
            "title": "Study",
            "girly": gStudy,
            "dark": dStudy,
            "navigation" : "/Study"

        },
        {
            "title": "Journal",
            "girly": gJournal,
            "dark": dJournal,
            "navigation" : "/Journal"

        },
        {
            "title": "Meal Planner",
            "girly": gMeal,
            "dark": dMeal,
            "navigation" : "/Meal_planner"

        },
    ])
    return (
        <div>
            <div className="flex flex-wrap gap-4 mt-4">{Listcard.map((detail) => {
                return (
                    <div
                        key={detail.title}
                        className="rounded-xl overflow-hidden shadow-md border bg-white w-full sm:w-[48%] md:w-[30%]"
                    >
                        <div
                            className="w-full h-32 bg-cover bg-center"
                            style={{
                                backgroundImage:
                                    mode === "girly"
                                        ? `url(${detail.girly})`
                                        : `url(${detail.dark})`,
                            }}
                        ></div>
                        <div className="p-2 text-sm font-medium">

                            <Link to={detail.navigation}>{detail.title}</Link>
                        </div>

                    </div>
                )
            })}

            </div>
        </div>
    )
}

export default Mylife
