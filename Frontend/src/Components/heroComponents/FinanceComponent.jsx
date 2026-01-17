import React from 'react'
import { useState } from 'react'


const FinanceComponent = () => {
    const [newText, setNewText] = useState("")
                const [textList, setTextList] = useState([
                    "🏦 Bank Account"
                ])
                const [Entry, setEntry] = useState(false)
            
                const NewEntry = () => {
                    setEntry(true)
                }
            
                const addEntry = (e) => {
                    setNewText(e.target.value)
                }
            
                const saveEntry = () => {
                    setTextList([...textList, newText])
                    setNewText("")
                    setEntry(false)
                }
            
                const RemoveText = (index) => {
                    setTextList(textList.filter((_, i) => i !== index))
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
                {textList.map((text, index) => {
                    return (
                        <div key={index}>
                            <div className='border-2 opacity-35 w-44 rounded-xl px-1 mt-1 flex justify-between items-center'>

                                <span className="truncate">{text}</span>

                                <i className="fa-solid fa-xmark cursor-pointer text-sm opacity-70 hover:opacity-100" onClick={() => RemoveText(index)}></i>
                            </div>
                        </div>
                    )
                })}
            </div>

            <button className='border-2 opacity-35 rounded-xl px-1 mt-2' onClick={NewEntry} >
                <i class="fa-solid fa-pen-to-square"></i> New Entry</button>

            <button className='mx-7 ' onClick={saveEntry}><i class="fa-solid fa-bookmark"></i></button>


    </div>
  )
}

export default FinanceComponent
