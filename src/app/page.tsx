'use client';

import React, { useState, useEffect } from 'react';
import { Todo } from '@/types/todo';
import TodoColumn from '@/components/TodoComponent';

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);

  // Optional: Check for overdue tasks
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      todos.forEach((todo) => {
        if (todo.status === 'Ongoing' && todo.dueDate && now > new Date(todo.dueDate)) {
          alert(`Task "${todo.title}" is overdue!`);
        }
      });
    }, 60000); // check every minute

    return () => clearInterval(interval);
  }, [todos]);

  return (
    <main className="flex flex-col md:flex-row gap-4 p-4">
      <TodoColumn status="New" todos={todos} setTodos={setTodos} />
      <TodoColumn status="Ongoing" todos={todos} setTodos={setTodos} />
      <TodoColumn status="Done" todos={todos} setTodos={setTodos} />
    </main>
  );
}
