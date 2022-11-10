import React from "react";
import { HiMoon, HiSun } from "react-icons/hi";
import { useViewMode } from "../../context/ViewModeContext";
import styles from "./Header.module.css";

export default function Header({ filter, filters, onUpdate }) {
  const { mode, toggleMode } = useViewMode();
  const handleUpdateFilter = (item) => {
    onUpdate(item);
  };
  return (
    <header className={styles.header}>
      <button type='button' onClick={toggleMode} className={styles.toggle}>
        {mode ? <HiMoon /> : <HiSun />}
      </button>
      <ul className={styles.filters}>
        {filters.map((item, i) => (
          <li key={i}>
            <button
              type='button'
              className={`${styles.filter} ${
                filter === item && `${styles.selected}`
              }`}
              onClick={() => handleUpdateFilter(item)}>
              {item}
            </button>
          </li>
        ))}
      </ul>
    </header>
  );
}
