import React, { useState, useEffect, useContext } from 'react'
import Navbar from '../Components/Navbar'
import { ThemeContext } from '../context/ThemeContext'

const Journal = () => {

  const { mode } = useContext(ThemeContext)

  const [journals, setJournals] = useState([])
  const [text, setText] = useState("")
  const [editingId, setEditingId] = useState(null)

  // load all journals
  useEffect(() => {
    fetch("http://localhost:3200/Journal")
      .then(res => res.json())
      .then(data => setJournals(data))
  }, [])

  // SAVE
  const saveJournal = async () => {
    if (!text.trim()) return

    // EDIT MODE
    if (editingId) {
      const res = await fetch(`http://localhost:3200/Journal/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text })
      })

      const updated = await res.json()

      setJournals(prev =>
        prev.map(j => j._id === editingId ? updated : j)
      )

      setEditingId(null)
      setText("")
      return
    }

    // CREATE
    const res = await fetch("http://localhost:3200/Journal", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text })
    })

    const saved = await res.json()
    setJournals(prev => [saved, ...prev])
    setText("")
  }

  // DELETE
  const deleteJournal = async (id) => {
    await fetch(`http://localhost:3200/Journal/${id}`, {
      method: "DELETE"
    })

    setJournals(prev => prev.filter(j => j._id !== id))
  }

  // EDIT CLICK
  const editJournal = (item) => {
    setText(item.text)
    setEditingId(item._id)
  }

  return (
    <div>
      <Navbar />

      <div className="mt-6 mx-6">
        <h2 className="text-2xl font-bold mb-4">My Journal</h2>

        {/* TEXTAREA */}
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write your thoughts..."
          className="w-full min-h-[120px] border rounded-xl p-3 outline-none"
        />

        <div className="mt-3">
          <button
            onClick={saveJournal}
            className="px-6 py-2 rounded-xl text-white"
            style={{
              backgroundColor: mode === "girly" ? "#4C1D95" : "#1F2937"
            }}
          >
            {editingId ? "Update Journal" : "Save Journal"}
          </button>
        </div>

        {/* SAVED JOURNALS */}
        <div className="mt-8 space-y-4">
          {journals.map((item) => (
            <div
              key={item._id}
              className="border rounded-xl p-4 shadow-sm"
            >
              <p className="mb-3 whitespace-pre-line">{item.text}</p>

              <div className="flex gap-4">
                <button
                  onClick={() => editJournal(item)}
                  className="text-blue-600"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteJournal(item._id)}
                  className="text-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default Journal
