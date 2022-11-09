import React, { useState } from "react";
import AddTodo from "./AddTodo";
import TodoItem from "./TodoItem";

export default function TodoList({ filter }) {
  const [todos, setTodos] = useState(initialItems);

  const handleAdd = (newTodo) => {
    setTodos([...todos, newTodo]);
  };

  const handleStatusChange = (updated) => {
    setTodos(todos.map((todo) => (todo.id === updated.id ? updated : todo)));
  };

  const handelTodoDelete = (deleted) => {
    setTodos(todos.filter((todo) => todo.id !== deleted.id));
  };

  const filtered = getFilter(filter, todos);

  return (
    <>
      <ul>
        {filtered.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onStatusChange={handleStatusChange}
            onDelete={handelTodoDelete}
          />
        ))}
      </ul>
      <AddTodo onAdd={handleAdd} />
    </>
  );
}

const getFilter = (filter, todos) => {
  if (filter === "all") {
    return todos;
  }
  return todos.filter((todo) => todo.status === filter);
};

const initialItems = [
  {
    id: 1,
    title: "운동하기",
    status: "active",
  },
  {
    id: 2,
    title: "청소하기",
    status: "active",
  },
];
