import { useEffect, useRef, useState } from "react";
import todo_icon from "../assets/todo_icon.png";
import TodoItems from "./TodoItems";

const Todo = () => {
  const [todoList, setTodoList] = useState(
    localStorage.getItem("todos")
      ? JSON.parse(localStorage.getItem("todos"))
      : []
  );
  const inputRef = useRef();

  const add = () => {
    const inputText = inputRef.current.value.trim();
    if (!inputText) {
      return null;
    }
    const newTodo = {
      id: Date.now(),
      task: inputText,
      isComplete: false,
    };
    setTodoList((prev) => [...prev, newTodo]);
    localStorage.setItem("todos", JSON.stringify(todoList));

    inputRef.current.value = "";
  };

  const remove = (id) => {
    setTodoList((prevTodo) => {
      return prevTodo.filter((prev) => prev.id !== id);
    });
  };

  const toggle = (id) => {
    setTodoList((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isComplete: !item.isComplete } : item
      )
    );
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoList));
  }, [todoList]);

  return (
    <div className=" mx-auto bg-white place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[550px] rounded-xl">
      <div className="flex items-center gap-3 mt-7 ">
        <img src={todo_icon} alt="" className=" max-w-8" />
        <h1 className="text-3xl font-semibold">To-do List</h1>
      </div>

      <div className="flex justify-between bg-gray-200 rounded-full item-center my-7">
        <input
          ref={inputRef}
          className="pl-6 pr-2 bg-transparent border-0 outline-none h-14 placeholder:text-slate-600"
          type="text"
          placeholder="Add your task"
        />
        <button
          onClick={add}
          className="w-32 font-medium text-white bg-orange-600 border-none rounded-full cursor-pointer h-14 text-large"
        >
          ADD +
        </button>
      </div>

      <div>
        {todoList.map((item, index) => (
          <TodoItems
            key={index}
            task={item.task}
            id={item.id}
            isComplete={item.isComplete}
            remove={remove}
            toggle={toggle}
          />
        ))}
      </div>
    </div>
  );
};

export default Todo;
