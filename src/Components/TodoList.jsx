import React, { useRef, useState } from 'react';

const TodoList = () => {
  const inputRef = useRef(null);
  const [todoList, setTodoList] = useState(iniTialTodoList);
  const handleDelete = (title) => {
    setTodoList((todoList) => {
      const delTodo = todoList.filter(toDo => toDo.title !== title);
      console.log(title)
      return delTodo;
    })

  }
  const handleAdd = (e) => {
    e.preventDefault();
    const newTodo = ({
      id: Date.now(),
      title: inputRef.current.value
    })
    setTodoList((todoList) => [newTodo, ...todoList])
    inputRef.current.focus();
    inputRef.current.value = '';
  }
  return (
    <>
      <ul>
        {
          todoList.map((v, i) => {
            return <li key={i}>{v.title}<button onClick={() => handleDelete(v.title)}>삭제</button></li>
          })
        }
      </ul>
      <form action="handleAdd">
        <input type="text" ref={inputRef} name="" id="" />
        <button onClick={handleAdd}>추가</button>
      </form>
    </>
  );
};

const iniTialTodoList = [
  {
    id: 1,
    title: "밥먹기"
  },
  {
    id: 2,
    title: "운동하기"
  }
]

export default TodoList;