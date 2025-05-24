
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Calendar, User, MoreVertical } from 'lucide-react';
import { Task } from './TaskBoard';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: Task['category']) => {
    switch (category) {
      case 'Bug': return 'bg-red-100 text-red-800';
      case 'Feature': return 'bg-blue-100 text-blue-800';
      case 'Improvement': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const isOverdue = new Date(task.dueDate) < new Date() && task.status !== 'Completed';

  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <h4 className="font-medium text-sm leading-tight">{task.title}</h4>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <MoreVertical className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem>Assign</DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <p className="text-xs text-muted-foreground line-clamp-2">
          {task.description}
        </p>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-3">
          {/* Categories and Priority */}
          <div className="flex flex-wrap gap-1">
            <Badge 
              variant="secondary" 
              className={cn("text-xs", getCategoryColor(task.category))}
            >
              {task.category}
            </Badge>
            <Badge 
              variant="secondary" 
              className={cn("text-xs", getPriorityColor(task.priority))}
            >
              {task.priority}
            </Badge>
          </div>

          {/* Due Date */}
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            <span className={cn(isOverdue && "text-red-600 font-medium")}>
              {new Date(task.dueDate).toLocaleDateString()}
            </span>
            {isOverdue && <span className="text-red-600">(Overdue)</span>}
          </div>

          {/* Assigned User */}
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={task.assignedTo.avatar} />
              <AvatarFallback className="text-xs">
                {task.assignedTo.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <span className="text-xs text-muted-foreground">
              {task.assignedTo.name}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
