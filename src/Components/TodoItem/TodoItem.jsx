import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { FaTrashAlt } from "react-icons/fa";
import styles from "./TodoItem.module.css";

export default function TodoItem({ todo, onStatusChange, onDelete, index }) {
  const { id, title, status, date } = todo;
  const handleChange = (e) => {
    const status = e.target.checked ? "complete" : "active";
    onStatusChange({ ...todo, status });
  };
  const handleDelete = () => {
    onDelete(todo);
  };
  return (
    <Draggable key={todo.id} draggableId={todo.id} index={index}>
      {(provided) => (
        <li
          className={styles.todo}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}>
          <input
            type='checkbox'
            id={`checkbox${id}`}
            onChange={handleChange}
            checked={status === "complete"}
            className={styles.checkbox}
          />
          <label htmlFor={`checkbox${id}`} className={styles.text}>
            {title}
          </label>
          <span className={styles.date}>{date}</span>
          <span className={styles.icon}>
            <button onClick={handleDelete} className={styles.button}>
              <FaTrashAlt />
            </button>
          </span>
        </li>
      )}
    </Draggable>
  );
}
