"use client";
import React, { useEffect, useState } from "react";

type Task = {
  id: number;
  title: string;
  completed: boolean;
};
export default function Home() {
  const [task, setTask] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
console.log("get_data-->",task)
  const fetchTasks = async () => {
    const res = await fetch("api/task");
    setTask(await res.json());
  };
  useEffect(() => {
    fetchTasks();
  },[]);

  const addTask = async () => {
    await fetch("api/task", {
      method: "POST",
      body: JSON.stringify({ title: newTask }),
      headers: { "content-type": "application/json" },
    });
    setNewTask("");
    fetchTasks();
  };
  const toggleTask = async (id: number, completed: boolean) => {
    console.log(id, completed);
    await fetch(`api/task/${id}`, {
      method: "PUT",
      body: JSON.stringify({ completed: !completed }),
      headers: { "content-type": "application/json" },
    });
    fetchTasks();
  };

  const editTask = async (id: number,title:string) => {
    console.log(id);
    await fetch(`api/task/${id}`, {
      method: "PUT",
      body: JSON.stringify({ title: title }),
      headers: { "content-type": "application/json" },
    });
    fetchTasks();
  };

  const deleteTask = async (id: number) => {
    console.log(id);
    await fetch(`api/task/${id}`, {
      method: "DELETE",
    });
    fetchTasks();
  };
  return (
    <main className="p-4 max-w-xl mx-auto">
      <h1 className="text-2l font-bold mb-4">Task Manager</h1>
      <div className="flex gap-2 mb-4">
        <input
          className="border px-2 py-1 w-full"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
        />
        <button
          className="bg-blue-500 text-white px-4 py-1 rounded"
          onClick={addTask}
        >
          Add Task
        </button>
      </div>

      <ul>
        {task.map((task) => (
          <li
            key={task.id}
            className="flex items-center justify-between border-b py-2"
          >
            <span
              className={`cursor-pointer ${
                task.completed ? "line-through text-gray-500" : ""
              }`}
              onClick={() => toggleTask(task.id, task.completed)}
            >
              {task.title}
            </span>
            <button
              className="text-red-500"
              onClick={() => editTask(task.id,task.title)}
            >
              Edit
            </button>
            <button
              className="text-red-500"
              onClick={() => deleteTask(task.id)}
            >
              X
            </button>
          </li>
        ))}
      </ul>
   
    </main>
  );
}
