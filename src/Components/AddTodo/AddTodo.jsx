import React, { useRef, useState } from "react";
import styles from "./AddTodo.module.css";
import { v4 as uuidv4 } from "uuid"; // 고유한 id값 생성해 줌

export default function AddTodo({ onAdd }) {
  const ref = useRef();
  const [valueText, setValueText] = useState("");
  const handleChange = (e) => setValueText(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();
    const now = new Date().toISOString();
    console.log(typeof now);
    const newTodo = {
      id: uuidv4(),
      title: valueText,
      status: "active",
      date: now,
    };
    onAdd(newTodo);
    setValueText("");
  };
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        ref={ref}
        type='text'
        placeholder='write to do..'
        value={valueText}
        onChange={handleChange}
        className={styles.input}
      />
      <button className={styles.button}>Add</button>
    </form>
  );
}
