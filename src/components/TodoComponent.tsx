"use client";

import React, { useState } from "react";
import { Todo } from "@/types/todo";
import TodoItem from "./TodoItem";
import AddTaskModal from "./AddTaskModal";
import { v4 as uuidv4 } from "uuid";

interface Props {
  status: "New" | "Ongoing" | "Done";
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

export default function TodoColumn({ status, todos, setTodos }: Props) {
  const [showModal, setShowModal] = useState(false);
  const [isOver, setIsOver] = useState(false);

  const columnTodos = todos.filter((todo) => todo.status === status);

  const handleAdd = (task: {
    title: string;
    description: string;
    deadline: Date;
  }) => {
    setTodos((prev) => [
      {
        id: uuidv4(),
        title: task.title,
        description: task.description,
        status: "New",
        createdAt: new Date(),
        dueDate: task.deadline,
      },
      ...prev,
    ]);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDragEnter = () => {
    setIsOver(true);
  };

  const handleDragLeave = () => {
    setIsOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("text/plain");
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, status } : todo))
    );
    setIsOver(false);
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`flex-1 bg-white border border-gray-200 rounded-xl shadow-md p-4 min-h-[400px] flex flex-col gap-4 transition ${
        isOver ? "bg-blue-50" : ""
      }`}
    >
      <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
        <span
          className={`w-3 h-3 rounded-full ${
            status === "New"
              ? "bg-blue-500"
              : status === "Ongoing"
              ? "bg-orange-500"
              : "bg-green-500"
          }`}
        ></span>
        {status}
      </h2>
      {status === "New" && (
        <>
          <button
            onClick={() => setShowModal(true)}
            className="mb-2 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition cursor-pointer"
          >
            + Add Task
          </button>
          {showModal && (
            <AddTaskModal
              onAdd={handleAdd}
              onClose={() => setShowModal(false)}
            />
          )}
        </>
      )}
      <div className="flex flex-col gap-2">
        {columnTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            todos={todos}
            setTodos={setTodos}
          />
        ))}
      </div>
    </div>
  );
}
