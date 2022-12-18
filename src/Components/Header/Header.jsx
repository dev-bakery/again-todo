import React, { useEffect, useState } from "react";
import { HiMoon, HiSun } from "react-icons/hi";
import { login, logout, onUserStateChange } from "../../api/firebase";
import { useViewMode } from "../../context/ViewModeContext";
import styles from "./Header.module.css";

export default function Header({ filter, filters, onUpdate }) {
  const [user, setUser] = useState();
  const { darkMode, toggleMode } = useViewMode();
  const handleUpdateFilter = (item) => {
    onUpdate(item);
  };
  useEffect(() => {
    onUserStateChange((user) => setUser(user));
  }, []);
  return (
    <header className={styles.header}>
      <button type='button' onClick={toggleMode} className={styles.toggle}>
        {darkMode ? <HiMoon /> : <HiSun />}
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
      {!user && (
        <button type='button' className={styles.login} onClick={login}>
          Login
        </button>
      )}
      {user && (
        <button type='button' className={styles.login} onClick={logout}>
          Logout
        </button>
      )}
    </header>
  );
}
