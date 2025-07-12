'use client';

import React from 'react';
import { Todo } from '@/types/todo';
import TodoItem from './TodoItem';

interface Props {
  status: 'New' | 'Ongoing' | 'Done';
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

export default function TodoColumn({ status, todos, setTodos }: Props) {
  const columnTodos = todos.filter((todo) => todo.status === status);

  return (
    <div className="flex-1 bg-gray-100 p-4 rounded">
      <h2 className="text-xl font-bold mb-4">{status}</h2>
      {status === 'New' && (
        <button
          onClick={() => {
            const title = prompt('Task title?');
            const description = prompt('Description?');
            if (title && description) {
              setTodos((prev) => [
                { id: crypto.randomUUID(), title, description, status: 'New', createdAt: new Date() },
                ...prev,
              ]);
            }
          }}
          className="mb-4 bg-blue-500 text-white px-2 py-1 rounded"
        >
          + Add Task
        </button>
      )}
      <div className="space-y-2">
        {columnTodos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} todos={todos} setTodos={setTodos} />
        ))}
      </div>
    </div>
  );
}