import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { tasksAPI } from '@/lib/api';
import { toast } from '@/hooks/use-toast';

export interface Task {
  _id: string;
  title: string;
  description: string;
  category: string;
  priority: 'Low' | 'Medium' | 'High';
  status: 'To Do' | 'In Progress' | 'Done';
  assignedTo: string;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}

// Get all tasks
export function useTasks() {
  return useQuery({
    queryKey: ['tasks'],
    queryFn: tasksAPI.getTasks,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Create task mutation
export function useCreateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: tasksAPI.createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      toast({
        title: 'Task created',
        description: 'Task has been created successfully.',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Failed to create task',
        description: error.response?.data?.error || 'An error occurred while creating the task.',
        variant: 'destructive',
      });
    },
  });
}

// Update task mutation
export function useUpdateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ taskId, taskData }: { taskId: string; taskData: any }) =>
      tasksAPI.updateTask(taskId, taskData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      toast({
        title: 'Task updated',
        description: 'Task has been updated successfully.',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Failed to update task',
        description: error.response?.data?.error || 'An error occurred while updating the task.',
        variant: 'destructive',
      });
    },
  });
}

// Delete task mutation
export function useDeleteTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: tasksAPI.deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      toast({
        title: 'Task deleted',
        description: 'Task has been deleted successfully.',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Failed to delete task',
        description: error.response?.data?.error || 'An error occurred while deleting the task.',
        variant: 'destructive',
      });
    },
  });
}
