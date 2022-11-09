import React from "react";

export default function TodoItem({ todo, onStatusChange, onDelete }) {
  const { id, title, status } = todo;
  const handleChange = (e) => {
    const status = e.target.checked ? "complete" : "active";
    onStatusChange({ ...todo, status });
  };
  const handelDelete = () => {
    onDelete(todo);
  };
  return (
    <li>
      <input
        type='checkbox'
        id={`checkbox${id}`}
        onChange={handleChange}
        checked={status === "complete"}
      />
      <label htmlFor={`checkbox${id}`}>{title}</label>
      <button type='button' onClick={handelDelete}>
        삭제
      </button>
    </li>
  );
}
