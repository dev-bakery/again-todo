import React, { useEffect, useState } from "react";
import styles from "./TodoList.module.css";
import AddTodo from "../AddTodo/AddTodo";
import TodoItem from "../TodoItem/TodoItem";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

export default function TodoList({ filter }) {
  /**
  useState(readTodos()) <- 이렇게 사용하지 않고 useState(() => readTodos()) <- 이렇게 사용한 이유?!
  컴포넌트가 리랜더링 될때 마다 useState()가 실행된다.
  하지만 최초에 한번 실행 했을때 useState() 내부적으로 초기값을 저장하고 있으며 state가 업데이트 되더라도 내부에 저장된 값을 가지고 업데이트 한다.

  useState(readTodos()) 사용했을 경우 
  컴포넌트가 리랜더링 될때 마다 state가 변경되지 않아도 readTodos를 계속 호출하게 된다.

  useState(() => readTodos()) 콜백 형태로 사용했을 경우
  state초기값이 없을 경우 최초 한번만 readTodos를 호출한다. 

   */
  const [todos, setTodos] = useState(() => readTodos());

  const handleAdd = (newTodo) => {
    setTodos([newTodo, ...todos]);
  };

  const handleStatusChange = (updated) => {
    setTodos(todos.map((todo) => (todo.id === updated.id ? updated : todo)));
  };

  const handelTodoDelete = (deleted) => {
    setTodos(todos.filter((todo) => todo.id !== deleted.id));
  };

  const filtered = getFilter(filter, todos);

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const items = [...todos];
    console.log(items);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setTodos(items);
  };
  // todos가 업데이트 될떄 마다 로컬스토리지에 저장한다!
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);
  return (
    <div className={styles.container}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='todos'>
          {(provided) => (
            <ul
              className={styles.list}
              {...provided.droppableProps}
              ref={provided.innerRef}>
              {filtered.map((todo, index) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  index={index}
                  onStatusChange={handleStatusChange}
                  onDelete={handelTodoDelete}
                />
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
      <AddTodo onAdd={handleAdd} />
    </div>
  );
}

const getFilter = (filter, todos) => {
  if (filter === "all") {
    return todos;
  }
  return todos.filter((todo) => todo.status === filter);
};

const readTodos = () => {
  const todos = localStorage.getItem("todos"); //setItem 할때 입력했던 키값 'todos'
  return todos ? JSON.parse(todos) : [];
};
