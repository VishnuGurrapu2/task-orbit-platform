
import React, { useState } from 'react';
import { TaskColumn } from './TaskColumn';
import { TaskFilters } from './TaskFilters';
import { Card } from '@/components/ui/card';
import { useTasks } from '@/hooks/useTasks';
import { Loader2 } from 'lucide-react';

export interface Task {
  _id: string;
  title: string;
  description: string;
  category: 'Bug' | 'Feature' | 'Improvement';
  priority: 'Low' | 'Medium' | 'High';
  status: 'To Do' | 'In Progress' | 'Done';
  dueDate?: string;
  assignedTo: string;
  createdAt: string;
  updatedAt: string;
}

// Mock data
const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Fix authentication bug',
    description: 'Users are unable to log in with their credentials',
    category: 'Bug',
    priority: 'High',
    status: 'Todo',
    dueDate: '2024-12-30',
    assignedTo: { id: '1', name: 'John Doe', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face' },
    createdAt: '2024-12-20',
    updatedAt: '2024-12-20'
  },
  {
    id: '2',
    title: 'Implement dark mode',
    description: 'Add dark mode toggle to user preferences',
    category: 'Feature',
    priority: 'Medium',
    status: 'In Progress',
    dueDate: '2024-12-28',
    assignedTo: { id: '2', name: 'Jane Smith', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b17c?w=32&h=32&fit=crop&crop=face' },
    createdAt: '2024-12-18',
    updatedAt: '2024-12-22'
  },
  {
    id: '3',
    title: 'Optimize database queries',
    description: 'Improve performance of task loading',
    category: 'Improvement',
    priority: 'Low',
    status: 'Completed',
    dueDate: '2024-12-25',
    assignedTo: { id: '3', name: 'Mike Johnson', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face' },
    createdAt: '2024-12-15',
    updatedAt: '2024-12-24'
  }
];

export function TaskBoard() {
  const { data: tasks = [], isLoading, error } = useTasks();
  const [filters, setFilters] = useState({
    category: 'All',
    priority: 'All',
    assignedTo: 'All'
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading tasks...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <Card className="p-6">
          <p className="text-red-600">Failed to load tasks. Please try again.</p>
        </Card>
      </div>
    );
  }

  const filteredTasks = tasks.filter((task: Task) => {
    if (filters.category !== 'All' && task.category !== filters.category) return false;
    if (filters.priority !== 'All' && task.priority !== filters.priority) return false;
    return true;
  });

  const getTasksByStatus = (status: Task['status']) => {
    return filteredTasks.filter((task: Task) => task.status === status);
  };

  return (
    <div className="space-y-6">
      <TaskFilters filters={filters} onFiltersChange={setFilters} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <TaskColumn
          title="To Do"
          status="To Do"
          tasks={getTasksByStatus('To Do')}
          className="bg-slate-50"
        />
        <TaskColumn
          title="In Progress"
          status="In Progress"
          tasks={getTasksByStatus('In Progress')}
          className="bg-blue-50"
        />
        <TaskColumn
          title="Done"
          status="Done"
          tasks={getTasksByStatus('Done')}
          className="bg-green-50"
        />
      </div>
    </div>
  );
}
