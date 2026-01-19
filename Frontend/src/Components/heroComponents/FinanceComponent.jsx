import React from 'react'
import { useState , useEffect } from 'react'


const FinanceComponent = () => {
    const [newText, setNewText] = useState("")
                const [textList, setTextList] = useState([
                    "🏦 Bank Account"
                ])
                const [Entry, setEntry] = useState(false)

                useEffect(() => {
                  fetch("http://localhost:3200/?type=Finance")
                    .then(res => res.json())
                    .then(data => setTextList(data))

                }, [])
                
            
                const NewEntry = () => {
                    setEntry(true)
                }
            
                const addEntry = (e) => {
                    setNewText(e.target.value)
                }
            
                const saveEntry = async () => {
                    const res = await fetch("http://localhost:3200/" , {
                        method : 'POST',
                        headers : {"Content-Type" : "application/json"},
                        body : JSON.stringify({
                            text : newText,
                            type : "Finance"
                        })
                    })

                    const saved = await res.json()

                    setTextList([...textList, saved])
                    setNewText("")
                    setEntry(false)
                }
            
                const RemoveText = (id) => {
                    fetch(`http://localhost:3200/${id}?type=Finance`)
                    setTextList(textList.filter((item) => item._id !== id))
                }
  return (
    <div>
      <div className=''>
                Finance
            </div>
            <div>
                {Entry && <input type='text' value={newText} placeholder='type key points' onChange={addEntry} className='border-2 opacity-35 rounded-xl px-1'>
                </input>}
            </div>

            <div>
                {textList.map((item, index) => {
                    return (
                        <div key={item._id || index}>
                            <div className='border-2 opacity-35 w-44 rounded-xl px-1 mt-1 flex justify-between items-center'>

                                <span className="truncate">{item.text}</span>

                                <i className="fa-solid fa-xmark cursor-pointer text-sm opacity-70 hover:opacity-100" onClick={() => RemoveText(item._id)}></i>
                            </div>
                        </div>
                    )
                })}
            </div>

            <button className='border-2 opacity-35 rounded-xl px-1 mt-2' onClick={NewEntry} >
                <i className="fa-solid fa-pen-to-square"></i> New Entry</button>

            <button className='mx-7 ' onClick={saveEntry}><i className="fa-solid fa-bookmark"></i></button>


    </div>
  )
}

export default FinanceComponent
