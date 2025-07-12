'use client';
import React, { useState } from 'react';
import { Todo } from '@/types/todo';

interface Props {
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

export default function TodoItem({ todo, todos, setTodos }: Props) {
  const [showMenu, setShowMenu] = useState(false);

  const moveTo = (newStatus: Todo['status']) => {
    const updated = todos.map((t) =>
      t.id === todo.id
        ? {
            ...t,
            status: newStatus,
            dueDate:
              newStatus === 'Ongoing'
                ? new Date(prompt('Due date/time (e.g., 2025-07-12T17:00)?')!)
                : undefined,
          }
        : t
    );
    setTodos(updated);
    setShowMenu(false);
  };

  const otherStatuses = ['New', 'Ongoing', 'Done'].filter((s) => s !== todo.status);

  return (
    <div
      onContextMenu={(e) => {
        e.preventDefault();
        setShowMenu(!showMenu);
      }}
      className={`p-2 border rounded cursor-pointer relative
        ${
          todo.status === 'New'
            ? 'border-blue-500'
            : todo.status === 'Ongoing'
            ? 'border-orange-500'
            : 'border-green-500'
        }`}
    >
      <h3 className="font-bold">{todo.title}</h3>
      <p>{todo.description}</p>
      {todo.dueDate && (
        <p className="text-sm text-gray-500">Due: {new Date(todo.dueDate).toLocaleString()}</p>
      )}

      {showMenu && (
        <div className="absolute right-0 bg-white border rounded shadow z-10">
          {otherStatuses.map((status) => (
            <button
              key={status}
              onClick={() => moveTo(status as Todo['status'])}
              className="block px-2 py-1 hover:bg-gray-100 w-full text-left"
            >
              Move to {status}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
