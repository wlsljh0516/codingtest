// pages/Main.js
import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { todoListState } from "../atoms/todoListState";

function Main() {
  const [todoList, setTodoList] = useRecoilState(todoListState);
  const inputRef = useRef();

  const handleCreate = () => {
    const newTodo = {
      id: todoList.length + 1,
      task: inputRef.current.value,
      time: new Date(),
    };
    setTodoList([...todoList, newTodo]);
    inputRef.current.value = "";
  };

  const handleFilter = (e) => {
    const filter = e.target.value;
    if (filter === "all") {
      setTodoList(todoList);
    } else if (filter === "asc") {
      setTodoList([...todoList].sort((a, b) => a.time - b.time));
    } else if (filter === "desc") {
      setTodoList([...todoList].sort((a, b) => b.time - a.time));
    }
  };

  return (
    <div className="main">
      <h1>To-Do List</h1>
      <div className="input">
        <input type="text" ref={inputRef} placeholder="Enter a task" />
        <button onClick={handleCreate}>Save</button>
      </div>
      <div className="filter">
        <select onChange={handleFilter}>
          <option value="all">All</option>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
      <ul className="list">
        {todoList.map((todo) => (
          <li key={todo.id}>
            <Link to={`/${todo.id}`}>
              | {todo.id} | {todo.task} | {todo.time.toLocaleString()} |
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Main;
