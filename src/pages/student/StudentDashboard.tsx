import { DashboardLayout } from '@/components/DashboardLayout';
import { DashboardCard } from '@/components/DashboardCard';
import { Clock, MapPin, FileCheck, AlertCircle, Calendar, Upload } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const StudentDashboard = () => {
  const navigate = useNavigate();

  // TODO: Replace with real data from API
  const dashboardData = {
    hoursCompleted: 280,
    hoursRequired: 400,
    attendanceRate: 95,
    documentsUploaded: 4,
    placementLocation: 'Groote Schuur Hospital',
    nextShift: 'Tomorrow, 7:00 AM',
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <DashboardCard
            title="Hours Completed"
            value={dashboardData.hoursCompleted}
            description={`of ${dashboardData.hoursRequired} required`}
            icon={Clock}
            trend={{ value: 12, isPositive: true }}
          />
          <DashboardCard
            title="Attendance Rate"
            value={`${dashboardData.attendanceRate}%`}
            description="Last 30 days"
            icon={Calendar}
            trend={{ value: 3, isPositive: true }}
          />
          <DashboardCard
            title="Documents"
            value={dashboardData.documentsUploaded}
            description="Uploaded & verified"
            icon={FileCheck}
          />
          <DashboardCard
            title="Current Placement"
            value={dashboardData.placementLocation.split(' ')[0]}
            description={dashboardData.placementLocation}
            icon={MapPin}
          />
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
              <Button 
                variant="outline" 
                className="h-auto flex-col gap-2 py-4"
                onClick={() => navigate('/student/attendance')}
              >
                <Calendar className="h-5 w-5 text-primary" />
                <span className="text-sm">Log Attendance</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-auto flex-col gap-2 py-4"
                onClick={() => navigate('/student/documents')}
              >
                <Upload className="h-5 w-5 text-primary" />
                <span className="text-sm">Upload Documents</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-auto flex-col gap-2 py-4"
                onClick={() => navigate('/student/progress')}
              >
                <Clock className="h-5 w-5 text-primary" />
                <span className="text-sm">View Progress</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-auto flex-col gap-2 py-4"
                onClick={() => navigate('/student/incidents')}
              >
                <AlertCircle className="h-5 w-5 text-primary" />
                <span className="text-sm">Report Incident</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Progress Overview */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Hours Progress</CardTitle>
              <CardDescription>Track your placement hours</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Total Progress</span>
                    <span className="text-sm font-medium">{Math.round((dashboardData.hoursCompleted / dashboardData.hoursRequired) * 100)}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-primary to-primary/80 transition-all duration-500"
                      style={{ width: `${(dashboardData.hoursCompleted / dashboardData.hoursRequired) * 100}%` }}
                    />
                  </div>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Remaining</span>
                  <span className="font-medium">{dashboardData.hoursRequired - dashboardData.hoursCompleted} hours</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Next Shift</CardTitle>
              <CardDescription>Upcoming placement schedule</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">{dashboardData.nextShift}</p>
                    <p className="text-sm text-muted-foreground">{dashboardData.placementLocation}</p>
                  </div>
                </div>
                <Button variant="secondary" className="w-full">View Full Schedule</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Alerts */}
        <Card className="border-warning bg-warning/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-warning">
              <AlertCircle className="h-5 w-5" />
              Important Reminders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-warning">•</span>
                <span>Medical certificate required for missed shift on Jan 15</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-warning">•</span>
                <span>Complete hours target by March 31 to stay on track</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;
