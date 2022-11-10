import { createContext, useContext, useEffect, useState } from "react";

const ViewModeContext = createContext();

export function ViewModeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false);
  const toggleMode = () => {
    setDarkMode(!darkMode);
    upDateVIewMode(!darkMode);
  };

  useEffect(() => {
    const isDark =
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark").matches);
    setDarkMode(isDark);
    upDateVIewMode(isDark);
  }, []);
  return (
    <ViewModeContext.Provider value={{ darkMode, toggleMode }}>
      {children}
    </ViewModeContext.Provider>
  );
}

function upDateVIewMode(darkMode) {
  if (darkMode) {
    document.documentElement.classList.add("dark");
    localStorage.theme = "dark";
  } else {
    document.documentElement.classList.remove("dark");
    localStorage.theme = "light";
  }
}
export const useViewMode = () => useContext(ViewModeContext);
