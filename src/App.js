import { useState } from "react";
import "./App.css";
import Header from "./Components/Header";
import TodoList from "./Components/TodoList";

const filters = ["all", "active", "complete"];
function App() {
  const [filter, setfilter] = useState("all");
  const handleUpdate = (item) => {
    setfilter(item);
  };
  return (
    <div className='App'>
      <Header
        filters={filters}
        filter={filter}
        filtered={setfilter}
        onUpdate={handleUpdate}
      />
      <TodoList filter={filter} />
    </div>
  );
}

export default App;
