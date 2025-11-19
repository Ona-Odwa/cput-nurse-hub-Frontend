import { DashboardLayout } from '@/components/DashboardLayout';
import { DashboardCard } from '@/components/DashboardCard';
import { Users, Building2, AlertTriangle, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();

  // TODO: Replace with real data from API
  const dashboardData = {
    totalUsers: 156,
    totalFacilities: 12,
    activeIncidents: 2,
    avgAttendance: 92,
  };

  const systemAlerts = [
    { id: '1', type: 'warning', message: 'Low attendance rate at Tygerberg Hospital', time: '1 hour ago' },
    { id: '2', type: 'info', message: '5 new student registrations pending approval', time: '3 hours ago' },
    { id: '3', type: 'error', message: 'Incident report requires immediate attention', time: '5 hours ago' },
  ];

  const facilityStats = [
    { name: 'Groote Schuur', students: 32, capacity: 40 },
    { name: 'Tygerberg Hospital', students: 28, capacity: 35 },
    { name: 'Victoria Hospital', students: 24, capacity: 30 },
    { name: 'New Somerset', students: 18, capacity: 25 },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <DashboardCard
            title="Total Users"
            value={dashboardData.totalUsers}
            description="Students + Staff + Admins"
            icon={Users}
            trend={{ value: 8, isPositive: true }}
          />
          <DashboardCard
            title="Facilities"
            value={dashboardData.totalFacilities}
            description="Active placement locations"
            icon={Building2}
          />
          <DashboardCard
            title="Active Incidents"
            value={dashboardData.activeIncidents}
            description="Require resolution"
            icon={AlertTriangle}
          />
          <DashboardCard
            title="Avg Attendance"
            value={`${dashboardData.avgAttendance}%`}
            description="System-wide average"
            icon={TrendingUp}
            trend={{ value: 2, isPositive: true }}
          />
        </div>

        {/* Facility Overview */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Facility Overview</CardTitle>
                <CardDescription>Student distribution across facilities</CardDescription>
              </div>
              <Button onClick={() => navigate('/admin/facilities')}>Manage Facilities</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {facilityStats.map((facility) => (
                <div key={facility.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-primary" />
                      <span className="font-medium text-foreground">{facility.name}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {facility.students}/{facility.capacity} students
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-primary to-primary/80 transition-all duration-500"
                      style={{ width: `${(facility.students / facility.capacity) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* System Alerts & Quick Actions */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>System Alerts</CardTitle>
              <CardDescription>Recent notifications and warnings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {systemAlerts.map((alert) => (
                  <div 
                    key={alert.id} 
                    className={`p-3 rounded-lg border ${
                      alert.type === 'error' ? 'border-destructive/50 bg-destructive/5' :
                      alert.type === 'warning' ? 'border-warning/50 bg-warning/5' :
                      'border-primary/50 bg-primary/5'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <AlertTriangle className={`h-4 w-4 mt-0.5 ${
                        alert.type === 'error' ? 'text-destructive' :
                        alert.type === 'warning' ? 'text-warning' :
                        'text-primary'
                      }`} />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{alert.message}</p>
                        <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common administrative tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate('/admin/users')}
                >
                  <Users className="mr-2 h-4 w-4" />
                  Manage Users
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate('/admin/facilities')}
                >
                  <Building2 className="mr-2 h-4 w-4" />
                  Manage Facilities
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate('/admin/reports')}
                >
                  <TrendingUp className="mr-2 h-4 w-4" />
                  View Reports
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate('/admin/incidents')}
                >
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  Manage Incidents
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
