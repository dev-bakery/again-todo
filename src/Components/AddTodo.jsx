import React, { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid"; // 고유한 id값 생성해 줌

export default function AddTodo({ onAdd }) {
  const ref = useRef();
  const [valueText, setValueText] = useState("");
  const handleChange = (e) => setValueText(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();
    const newTodo = {
      id: uuidv4(),
      title: valueText,
      status: "active",
    };
    onAdd(newTodo);
    setValueText("");
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        ref={ref}
        type='text'
        placeholder='write to do..'
        value={valueText}
        onChange={handleChange}
      />
      <button>Add</button>
    </form>
  );
}
