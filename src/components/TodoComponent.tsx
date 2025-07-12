"use client";

import React, { useState } from "react";
import { Todo } from "@/types/todo";
import TodoItem from "./TodoItem";
import AddTaskModal from "./AddTaskModal";

interface Props {
  status: "New" | "Ongoing" | "Done";
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

export default function TodoColumn({ status, todos, setTodos }: Props) {
  const [showModal, setShowModal] = useState(false);

  const columnTodos = todos.filter((todo) => todo.status === status);

  const handleAdd = (task: {
    title: string;
    description: string;
    deadline: Date;
  }) => {
    setTodos((prev) => [
      {
        id: crypto.randomUUID(),
        title: task.title,
        description: task.description,
        status: "New",
        createdAt: new Date(),
        dueDate: task.deadline,
      },
      ...prev,
    ]);
  };

  return (
    <div className="flex-1 bg-white border border-gray-200 rounded-xl shadow-md p-4 min-h-[400px] flex flex-col gap-4">
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
        <button
          onClick={() => setShowModal(true)}
          className="mb-4 bg-blue-500 text-white px-2 py-1 rounded"
        >
          + Add Task
        </button>
      )}
      {showModal && (
        <AddTaskModal onAdd={handleAdd} onClose={() => setShowModal(false)} />
      )}
      <div className="space-y-2">
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
