import React from "react";

const DailyPlannercards = ({
  title,
  type,
  items,
  mode,
  inputVisible,
  onAdd,
  onSave,
  onToggle,
  onChange,
}) => {
  return (
    <div
      className="
        w-full 
        sm:w-[48%] 
        lg:w-[45%] 
        my-4 
        mx-auto 
        sm:mx-2 
        border-2 
        rounded-2xl 
        flex 
        flex-col
      "
    >
      {/* Header */}
      <div className="flex gap-2 justify-center items-center mt-3">
        <i className="fa-solid fa-thumbtack"></i>
        <div className="font-semibold text-lg">{title}</div>
      </div>

      <div className="flex flex-col items-center mt-2">
        <div className="bg-black/30 h-1 w-[80%] rounded-full"></div>

        {/* Items */}
        {items.map((item, index) => (
          <div
            key={item._id || index}
            className={`my-2 w-[95%] flex items-start gap-2 flex-wrap
              border rounded-2xl px-3 py-2 
              backdrop-blur-sm
              shadow-sm hover:shadow-md 
              transition-all duration-200
              ${
                mode === "girly"
                  ? "border-purple-300/40 bg-purple-100/40"
                  : "border-gray-400/30 bg-gray-800/20 text-white"
              }`}
          >
            <button
              className="mt-1"
              onClick={() => onToggle(item._id)}
            >
              {item.Done ? (
                <i className="fa-solid fa-square-check"></i>
              ) : (
                <i className="fa-regular fa-square"></i>
              )}
            </button>

            <div className="text-sm opacity-90 break-words leading-snug">
              {item.Task}
            </div>
          </div>
        ))}

        {/* Input */}
        {inputVisible && (
          <div className="m-2 w-[95%]">
            <input
              type="text"
              name="Task_text"
              placeholder={`Add ${title}`}
              onChange={onChange}
              className="w-full px-3 py-2 rounded-md outline-none border"
            />
          </div>
        )}

        {/* Buttons */}
        <div className="w-[90%] sm:w-[75%] m-4 flex justify-center gap-2">
          <button
            onClick={() => onAdd(type)}
            className="w-1/2 rounded-2xl text-white py-1"
            style={{
              backgroundColor: mode === "girly" ? "#4C1D95" : "#E5E7EB",
            }}
          >
            Add
          </button>

          <button
            onClick={onSave}
            className="w-1/3 rounded-2xl text-white py-1"
            style={{
              backgroundColor: mode === "girly" ? "#4C1D95" : "#E5E7EB",
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default DailyPlannercards;
