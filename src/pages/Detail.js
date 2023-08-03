// pages/Detail.js
import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"; // Link 컴포넌트 임포트
import { useRecoilState } from "recoil";
import { todoListState } from "../atoms/todoListState";

function Detail() {
  const [todoList, setTodoList] = useRecoilState(todoListState);
  const navigate = useNavigate();
  const { id } = useParams();
  const todo = todoList.find((todo) => todo.id === Number(id));
  const [isEditing, setIsEditing] = useState(false); // 수정 모드 상태

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedTodo = { ...todo, [name]: value };
    if (name === "time") {
      updatedTodo.time = new Date(value);
    }
    setTodoList(
      todoList.map((todo) => (todo.id === Number(id) ? updatedTodo : todo))
    );
  };

  const handleDelete = () => {
    setTodoList(todoList.filter((todo) => todo.id !== Number(id)));
    navigate("/");
  };

  const handleEdit = () => {
    setIsEditing(true); // 수정 모드로 전환
  };

  const handleSave = () => {
    // 서버에 변경된 내용 전송하는 로직
    // ...
    setIsEditing(false); // 수정 모드 종료
  };

  return (
    <div className="detail">
      <h1>To-Do Detail</h1>
      {todo ? (
        <>
          <div className="item">
            <label>ID:</label>
            <input
              type="number"
              name="id"
              value={todo.id}
              onChange={handleChange}
              disabled={!isEditing} // 수정 모드가 아니면 비활성화
            />
          </div>
          <div className="item">
            <label>Task:</label>
            <input
              type="text"
              name="task"
              value={todo.task}
              onChange={handleChange}
              disabled={!isEditing} // 수정 모드가 아니면 비활성화
            />
          </div>
          <div className="item">
            <label>Time:</label>
            <input
              type="datetime-local"
              name="time"
              value={todo.time.toISOString().slice(0, -1)}
              onChange={handleChange}
              disabled={!isEditing} // 수정 모드가 아니면 비활성화
            />
          </div>
          {isEditing ? ( // 수정 모드일 때 저장 버튼 보여주기
            <button onClick={handleSave}>Save</button>
          ) : (
            // 수정 모드가 아닐 때 수정 버튼과 삭제 버튼 보여주기
            <>
              <button onClick={handleEdit}>Edit</button>
              <button onClick={handleDelete}>Delete</button>
            </>
          )}
        </>
      ) : (
        <p>Not Found</p>
      )}
      <Link to="/">Back to Home</Link>
    </div>
  );
}

export default Detail;
