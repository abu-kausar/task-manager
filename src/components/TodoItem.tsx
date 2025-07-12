"use client";

import React, { useState } from "react";
import { Todo } from "@/types/todo";

interface Props {
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  setShowLottie: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function TodoItem({ todo, todos, setTodos, setShowLottie }: Props) {
  const [showMenu, setShowMenu] = useState(false);

  const moveTo = (newStatus: Todo['status']) => {
  const updated = todos.map((t) =>
    t.id === todo.id
      ? { ...t, status: newStatus }
      : t
  );
  setTodos(updated);
  if (newStatus === 'Done') {
    setShowLottie(true);
  }
  setShowMenu(false);
};

  const otherStatuses = ["New", "Ongoing", "Done"].filter(
    (s) => s !== todo.status
  );

  // Drag start
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData("text/plain", todo.id);
    e.dataTransfer.effectAllowed = "move";
  };

  const statusStyles = {
    New: {
      border: "border-blue-500",
      badge: "bg-blue-500 text-white",
      label: "ToDo",
    },
    Ongoing: {
      border: "border-orange-500",
      badge: "bg-orange-500 text-white",
      label: "Ongoing",
    },
    Done: {
      border: "border-green-500",
      badge: "bg-green-500 text-white",
      label: "Done",
    },
  };

  const { border, badge, label } = statusStyles[todo.status];

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onContextMenu={(e) => {
        e.preventDefault();
        setShowMenu(!showMenu);
      }}
      className={`relative p-4 border-l-4 ${border} bg-white rounded-xl shadow-md hover:shadow-lg transition duration-200 cursor-grab`}
    >
      {/* Status Badge */}
      <span
        className={`absolute top-2 right-2 px-2 py-0.5 text-xs rounded-full font-semibold ${badge}`}
      >
        {label}
      </span>

      <h3 className="font-bold text-lg mb-1">{todo.title}</h3>
      <p className="text-gray-700 mb-2">{todo.description}</p>
      {todo.dueDate && (
        <p className="text-xs text-gray-500">
          Deadline: {new Date(todo.dueDate).toLocaleString()}
        </p>
      )}

      {/* Context Menu */}
      {showMenu && (
        <div className="absolute right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
          {otherStatuses.map((status) => (
            <button
              key={status}
              onClick={() => moveTo(status as Todo["status"])}
              className="block px-3 py-2 hover:bg-gray-100 w-full text-left text-sm"
            >
              Move to {status}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
