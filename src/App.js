import { useState } from "react";
import "./App.css";
import Header from "./Components/Header/Header";
import TodoList from "./Components/TodoList/TodoList";
import { ViewModeProvider } from "./context/ViewModeContext";

const filters = ["all", "active", "complete"];
function App() {
  const [filter, setfilter] = useState("all");
  const handleUpdate = (item) => {
    setfilter(item);
  };
  return (
    <ViewModeProvider>
      <div className='App'>
        <Header filters={filters} filter={filter} onUpdate={handleUpdate} />
        <TodoList filter={filter} />
      </div>
    </ViewModeProvider>
  );
}

export default App;
