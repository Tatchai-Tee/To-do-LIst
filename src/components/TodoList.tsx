import { useState } from "react";
import CheckBox from "./CheckBox";

export interface Task {
  id: number;
  content: string;
  completed: boolean;
}

function TodoList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskText, setNewTaskText] = useState<string>("");
  const [filterOption, setFilterOption] = useState<string>("All");
  const [nextId, setNextId] = useState<number>(1);

  function handleInputChange(e: any) {
    setNewTaskText(e.target.value);
  }


  function filteredTasks() {
    switch (filterOption) {
      case "Completed":
        return tasks.filter((t) => t.completed);
      case "To Do":
        return tasks.filter((t) => !t.completed);
      default:
        return tasks;
    }
  }

  function handleFilterChange(e: any) {
    setFilterOption(e.target.value);
  }

  function addTask() {
    if (newTaskText.trim() !== "") {
      const newTask: Task = {
        content: newTaskText,
        completed: false,
        id: nextId,
      };
      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);
      setNewTaskText("");
      setNextId(nextId + 1);
    }
  }

  function deleteTask(task: Task) {
    const updatedTasks = tasks.filter((t) => t !== task);
    setTasks(updatedTasks);
  }

  function handleCheck(task: Task) {
    //task.completed = !task.completed; don't do this, never directly change variables related to React state
    const updatedTasks = tasks.map((t) =>
      t.id === task.id ? { ...t, completed: !t.completed } : t
    );
    setTasks(updatedTasks);
  }

  return (
    <div className="text-center w-full">
      <h1 className="fixed top-0 text-center text-xl py-2 font-bold bg-gray-700 w-full text-white shadow-md shadow-gray-400">
        To-do List
      </h1>
      <div className="mt-16 flex justify-center items-center">
        <input
          type="text"
          className="w-1/2 h-8 p-2 mb-4 border-solid border-gray border-2 rounded-lg m-4"
          value={newTaskText}
          onChange={handleInputChange}
          placeholder="Add a new task..."
        />
        <button
          onClick={addTask}
          className="bg-green-500 text-white p-2 rounded-lg h-8 text-xs font-bold hover:bg-green-600 transition-colors"
        >
          Add Task
        </button>
        <select
          className="m-4 rounded-md border-gray-200 border-2"
          onChange={handleFilterChange}
        >
          {" "}
          {/*We don't wrap with arrow function here as e is automatically passed*/}
          <option value="All">All</option>
          <option value="Completed">Completed</option>
          <option value="To Do">To Do</option>
        </select>
      </div>
      <ol>
        {filteredTasks().map((task) => (
          <li className="flex justify-center items-center m-4 h-14 border-2 bg-white rounded-lg hover:h-16 hover:text-lg hover:m-[12px] transition-all duration-250">
            <span className="m-2 flex-1">{task.content}</span>
            <button
              onClick={() => deleteTask(task)}
              className="leading-none text-white m-4 bg-red-500 p-1 rounded-xl size-5 text-xs font-bold hover:bg-red-600 hover:rounded-lg hover:size-6 hover:m-[14px] transition-all ease-linear "
            >
              ⛌
            </button>
            <CheckBox task={task} onClick={() => handleCheck(task)} />
          </li>
        ))}
      </ol>
    </div>
  );
}

export default TodoList;
