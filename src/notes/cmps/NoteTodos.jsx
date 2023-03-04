import { faSquare } from "@fortawesome/free-regular-svg-icons";
import {
  faAdd,
  faCheckSquare,
  faRemove,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { noteService } from "../service/notes.service";
import React, { useContext, useEffect, useRef, useState } from "react";
import { noteContext } from "./noteContext";

export function NoteTodos({ note }) {
  const [todos, setTodos] = useState(null);
  // const { updateNotes } = useContext(noteContext);
  const addTodoRef = useRef(null);

  async function toggleIsDone(todoId, note) {
    let todoIdx = note.info.todos.findIndex((todo) => todo.todoId === todoId);
    let todo = note.info.todos[todoIdx];
    todo.isDone = !todo.isDone;
    await noteService.update(note);
    setTodos([...note.info.todos]);
  }

  const getIsDoneIcon = (isDone) => {
    return isDone ? (
      <FontAwesomeIcon icon={faCheckSquare} />
    ) : (
      <FontAwesomeIcon icon={faSquare} />
    );
  };

  async function addTodo(todoVal, note) {
    if (!todoVal) return;
    console.log("🚀 ~ file: NoteTodos.jsx:35 ~ NoteTodos ~ todoVal:", todoVal);
    let newTodo = noteService.createTodo(todoVal);
    note.info.todos.push(newTodo);
    await noteService.update(note);
    console.log("🚀 ~ file: NoteTodos.jsx:39 ~ NoteTodos ~ note:", note);
    addTodoRef.current.value = "";
    setTodos([...note.info.todos]);
  }

  const removeTodo = async (todoId) => {
    let todoIdx = todos.findIndex((todo) => todo.todoId === todoId);
    note.info.todos.splice(todoIdx, 1);
    let todosCopy = [...note.info.todos];
    setTodos(todosCopy);
    noteService.update(note);
  };

  useEffect(() => {
    setTodos(note.info.todos);
  }, []);

  return (
    todos && (
      <div className="note-todos">
        <h1 className="note-title">{note.title}</h1>

        <div className="TODO-add-wrapper">
          <input
            type="text"
            placeholder="Need to do something?"
            ref={addTodoRef}
            className="todo-add-input"
          />
          <button
            onClick={() => addTodo(addTodoRef.current.value, note)}
            className="add-btn"
          >
            <FontAwesomeIcon icon={faAdd} />
          </button>
        </div>

        <div className="todos-list">
          {todos.map((todo) => (
            <div key={todo.todoId} className="todo">
              <span
                onClick={() => toggleIsDone(todo.todoId, note)}
                className="check-btn"
              >
                {getIsDoneIcon(todo.isDone)}
              </span>
              <p
                className={todo.isDone ? "todo-done todo-title" : "todo-title"}
              >
                {todo.txt}
              </p>
              <span
                onClick={() => removeTodo(todo.todoId)}
                className="remove-btn"
              >
                <FontAwesomeIcon icon={faRemove} />
              </span>
            </div>
          ))}
        </div>
      </div>
    )
  );
}
