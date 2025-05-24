
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { ChevronDown, Building, Plus } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export function OrganizationSwitcher() {
  const { organization, organizations, switchOrganization } = useAuth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Building className="h-4 w-4" />
          <span className="max-w-[150px] truncate">
            {organization?.name || 'Select Organization'}
          </span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-64">
        <div className="p-2">
          <p className="text-sm font-medium">Organizations</p>
          <p className="text-xs text-muted-foreground">
            Switch between your organizations
          </p>
        </div>
        <DropdownMenuSeparator />
        {organizations.map((org) => (
          <DropdownMenuItem
            key={org.id}
            onClick={() => switchOrganization(org.id)}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <Building className="h-4 w-4" />
              <span>{org.name}</span>
            </div>
            {org.id === organization?.id && (
              <div className="h-2 w-2 bg-green-500 rounded-full" />
            )}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          <span>Create Organization</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
