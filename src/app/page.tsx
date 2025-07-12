"use client";

import React, { useState, useEffect } from "react";
import { Todo } from "@/types/todo";
import TodoColumn from "@/components/TodoComponent";

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      todos.forEach((todo) => {
        if (
          todo.status === "Ongoing" &&
          todo.dueDate &&
          now > new Date(todo.dueDate)
        ) {
          alert(`Task "${todo.title}" is overdue!`);
        }
      });
    }, 60000);

    return () => clearInterval(interval);
  }, [todos]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6 flex flex-col md:flex-row gap-6">
      <TodoColumn status="New" todos={todos} setTodos={setTodos} />
      <TodoColumn status="Ongoing" todos={todos} setTodos={setTodos} />
      <TodoColumn status="Done" todos={todos} setTodos={setTodos} />
    </main>
  );
}
