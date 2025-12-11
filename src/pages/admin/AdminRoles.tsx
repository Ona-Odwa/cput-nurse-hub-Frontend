import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Shield, User, UserCog } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface Permission {
  manageUsers: boolean;
  manageFacilities: boolean;
  viewReports: boolean;
  manageIncidents: boolean;
  systemSettings: boolean;
  manageRoles: boolean;
}

interface Role {
  id: string;
  name: string;
  icon: typeof Shield;
  description: string;
  permissions: Permission;
  locked: boolean;
}

const AdminRoles = () => {
  const [roles, setRoles] = useState<Role[]>([
    {
      id: 'admin',
      name: 'Administrator',
      icon: Shield,
      description: 'Full system access (permissions cannot be modified)',
      permissions: {
        manageUsers: true,
        manageFacilities: true,
        viewReports: true,
        manageIncidents: true,
        systemSettings: true,
        manageRoles: true,
      },
      locked: true,
    },
    {
      id: 'staff',
      name: 'Staff Member',
      icon: UserCog,
      description: 'Supervise students and review documents',
      permissions: {
        manageUsers: false,
        manageFacilities: false,
        viewReports: true,
        manageIncidents: true,
        systemSettings: false,
        manageRoles: false,
      },
      locked: false,
    },
    {
      id: 'student',
      name: 'Student',
      icon: User,
      description: 'Access to personal dashboard and submissions',
      permissions: {
        manageUsers: false,
        manageFacilities: false,
        viewReports: false,
        manageIncidents: false,
        systemSettings: false,
        manageRoles: false,
      },
      locked: false,
    },
  ]);

  const permissionLabels: Record<keyof Permission, { label: string; description: string }> = {
    manageUsers: { label: 'Manage Users', description: 'Create, edit, and delete user accounts' },
    manageFacilities: { label: 'Manage Facilities', description: 'Add and manage placement facilities' },
    viewReports: { label: 'View Reports', description: 'Access system reports and analytics' },
    manageIncidents: { label: 'Manage Incidents', description: 'View and resolve incident reports' },
    systemSettings: { label: 'System Settings', description: 'Modify system configuration' },
    manageRoles: { label: 'Manage Roles', description: 'Configure role permissions' },
  };

  const handlePermissionChange = (roleId: string, permission: keyof Permission, value: boolean) => {
    setRoles(prevRoles => 
      prevRoles.map(role => {
        if (role.id === roleId && !role.locked) {
          return {
            ...role,
            permissions: {
              ...role.permissions,
              [permission]: value,
            },
          };
        }
        return role;
      })
    );

    const role = roles.find(r => r.id === roleId);
    const permLabel = permissionLabels[permission].label;
    toast.success(`${role?.name}: ${permLabel} ${value ? 'enabled' : 'disabled'}`);
  };

  const getActivePermissionsCount = (permissions: Permission) => {
    return Object.values(permissions).filter(Boolean).length;
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Roles & Permissions</h1>
          <p className="text-muted-foreground">Configure access control for different user types</p>
        </div>

        <div className="grid gap-6">
          {roles.map((role) => (
            <Card key={role.id} className={role.locked ? 'border-primary/20 bg-primary/5' : ''}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${role.locked ? 'bg-primary/20' : 'bg-primary/10'}`}>
                      <role.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {role.name}
                        {role.locked && (
                          <span className="text-xs font-normal bg-primary/10 text-primary px-2 py-0.5 rounded">
                            Locked
                          </span>
                        )}
                      </CardTitle>
                      <CardDescription>{role.description}</CardDescription>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {getActivePermissionsCount(role.permissions)} of {Object.keys(role.permissions).length} permissions
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {Object.entries(role.permissions).map(([key, value]) => {
                    const permKey = key as keyof Permission;
                    return (
                      <div 
                        key={key} 
                        className={`flex items-center justify-between space-x-2 border rounded-lg p-4 transition-colors ${
                          value ? 'border-primary/30 bg-primary/5' : 'border-border'
                        } ${role.locked ? 'opacity-60' : 'hover:border-primary/50'}`}
                      >
                        <div className="space-y-1">
                          <Label 
                            htmlFor={`${role.id}-${key}`} 
                            className={`text-sm font-medium leading-none ${role.locked ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                          >
                            {permissionLabels[permKey].label}
                          </Label>
                          <p className="text-xs text-muted-foreground">
                            {permissionLabels[permKey].description}
                          </p>
                        </div>
                        <Switch
                          id={`${role.id}-${key}`}
                          checked={value}
                          onCheckedChange={(checked) => handlePermissionChange(role.id, permKey, checked)}
                          disabled={role.locked}
                        />
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-10 text-center">
            <p className="text-muted-foreground mb-2">
              Note: Changes are stored in local state and will reset on page refresh.
            </p>
            <p className="text-sm text-muted-foreground">
              Enable Lovable Cloud for persistent role management with database storage.
            </p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminRoles;
