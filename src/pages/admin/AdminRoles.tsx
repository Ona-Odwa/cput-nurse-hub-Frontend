import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Shield, User, UserCog, Users } from 'lucide-react';

const AdminRoles = () => {
  const roles = [
    {
      id: 'admin',
      name: 'Administrator',
      icon: Shield,
      description: 'Full system access',
      permissions: {
        manageUsers: true,
        manageFacilities: true,
        viewReports: true,
        manageIncidents: true,
        systemSettings: true,
        manageRoles: true,
      },
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
    },
    {
      id: 'student',
      name: 'Student',
      icon: User,
      description: 'Access to personal dashboard',
      permissions: {
        manageUsers: false,
        manageFacilities: false,
        viewReports: false,
        manageIncidents: false,
        systemSettings: false,
        manageRoles: false,
      },
    },
  ];

  const permissionLabels = {
    manageUsers: 'Manage Users',
    manageFacilities: 'Manage Facilities',
    viewReports: 'View Reports',
    manageIncidents: 'Manage Incidents',
    systemSettings: 'System Settings',
    manageRoles: 'Manage Roles',
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
            <Card key={role.id}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <role.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle>{role.name}</CardTitle>
                    <CardDescription>{role.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {Object.entries(role.permissions).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between space-x-2 border rounded-lg p-4">
                      <Label htmlFor={`${role.id}-${key}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        {permissionLabels[key as keyof typeof permissionLabels]}
                      </Label>
                      <Switch
                        id={`${role.id}-${key}`}
                        checked={value}
                        disabled={role.id === 'admin'}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminRoles;
