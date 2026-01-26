import React from 'react'

const skin_Profile = () => {
    const [newText, setNewText] = useState("")
    const [textList, setTextList] = useState([])
    const [Entry, setEntry] = useState(false)

    useEffect(() => {
        fetch("http://localhost:3200/Weekly_Planner/?type=WeeklyPlanner-SkinProfile")
            .then(res => res.json())
            .then(data => setTextList(data));
        // .catch(err => console.error(err));
    }, []);


    const NewEntry = () => {
        setEntry(true)
    }

    const addEntry = (e) => {
        setNewText(e.target.value)
    }

    const saveEntry = async () => {
        if (!newText.trim()) return;

        const res = await fetch(`http://localhost:3200/Weekly_Planner`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                text: newText,
                type: "WeeklyPlanner-SkinProfile"
            }),
        });

        const saved = await res.json();
        setTextList([...textList, saved]);
        setNewText("");
        setEntry(false);
    };

    const RemoveText = async (id) => {
        await fetch(`http://localhost:3200/Weekly_Planner/${id}?type=WeeklyPlanner-SkinProfile`, {
            method: "DELETE"
        })
        setTextList(textList.filter((item) => item._id !== id))
    }
    return (
        <div>
            <div className='font-semibold'>
                Skin Profile
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

            <button className='border-2 opacity-35 rounded-xl px-1 mt-2' onClick={NewEntry} ><i className="fa-solid fa-pen-to-square"></i> New Entry</button>

            <button className='mx-2 ' onClick={saveEntry}><i className="fa-solid fa-bookmark"></i></button>

        </div>
    )
}

export default skin_Profile
