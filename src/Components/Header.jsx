import React from "react";

export default function Header({ filter, filters, onUpdate }) {
  const handleUpdateFilter = (item) => {
    onUpdate(item);
  };
  return (
    <ul>
      {filters.map((item, i) => (
        <li key={i} className={filter === item ? "active" : ""}>
          <button type='button' onClick={() => handleUpdateFilter(item)}>
            {item}
          </button>
        </li>
      ))}
    </ul>
  );
}
