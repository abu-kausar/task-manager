'use client';

import React, { useState } from 'react';
import { Todo } from '@/types/todo';
import LottieOverlay from '@/components/LottieOverlay';
import TodoColumn from '@/components/TodoComponent';

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [showLottie, setShowLottie] = useState(false);

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6 flex flex-col md:flex-row gap-6">
      {showLottie && (
        <LottieOverlay onComplete={() => setShowLottie(false)} />
      )}
      <TodoColumn status="New" todos={todos} setTodos={setTodos} setShowLottie={setShowLottie} />
      <TodoColumn status="Ongoing" todos={todos} setTodos={setTodos} setShowLottie={setShowLottie} />
      <TodoColumn status="Done" todos={todos} setTodos={setTodos} setShowLottie={setShowLottie} />
    </main>
  );
}
