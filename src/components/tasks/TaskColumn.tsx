
import React from 'react';
import { TaskCard } from './TaskCard';
import { Task } from './TaskBoard';
import { cn } from '@/lib/utils';

interface TaskColumnProps {
  title: string;
  status: Task['status'];
  tasks: Task[];
  className?: string;
}

export function TaskColumn({ title, status, tasks, className }: TaskColumnProps) {
  return (
    <div className={cn("rounded-lg p-4 min-h-[400px]", className)}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-lg">{title}</h3>
        <span className="bg-white px-2 py-1 rounded-full text-sm font-medium">
          {tasks.length}
        </span>
      </div>
      
      <div className="space-y-3">
        {tasks.map(task => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}
