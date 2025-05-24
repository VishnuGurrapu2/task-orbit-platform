
import React, { useState } from 'react';
import { TaskBoard } from '@/components/tasks/TaskBoard';
import { OrganizationSwitcher } from '@/components/organization/OrganizationSwitcher';
import { TaskStats } from '@/components/dashboard/TaskStats';
import { CreateTaskDialog } from '@/components/tasks/CreateTaskDialog';
import { Button } from '@/components/ui/button';
import { Plus, Bell, Settings } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/hooks/use-toast';

const Dashboard = () => {
  const [createTaskOpen, setCreateTaskOpen] = useState(false);
  const { user, organization } = useAuth();

  if (!user || !organization) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Welcome to TaskOrbit</h2>
          <p className="text-muted-foreground">Please log in to continue</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold">TaskOrbit</h1>
              <OrganizationSwitcher />
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
              {(user.role === 'admin' || user.role === 'manager') && (
                <Button onClick={() => setCreateTaskOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Task
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <div className="space-y-6">
          {/* Stats Overview */}
          <TaskStats />
          
          {/* Task Board */}
          <TaskBoard />
        </div>
      </main>

      {/* Create Task Dialog */}
      <CreateTaskDialog 
        open={createTaskOpen} 
        onOpenChange={setCreateTaskOpen}
      />
    </div>
  );
};

export default Dashboard;
