import { DashboardLayout } from '@/components/DashboardLayout';
import { DashboardCard } from '@/components/DashboardCard';
import { Users, FileText, CheckCircle, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

const StaffDashboard = () => {
  const navigate = useNavigate();

  // TODO: Replace with real data from API
  const dashboardData = {
    totalStudents: 24,
    pendingReviews: 8,
    attendanceIssues: 3,
    completionRate: 87,
  };

  const recentStudents = [
    { id: '1', name: 'Sarah Johnson', studentNumber: '220123456', status: 'on-track', lastUpdate: '2 hours ago' },
    { id: '2', name: 'Michael Chen', studentNumber: '220123457', status: 'review-needed', lastUpdate: '5 hours ago' },
    { id: '3', name: 'Emily Brown', studentNumber: '220123458', status: 'on-track', lastUpdate: '1 day ago' },
    { id: '4', name: 'David Wilson', studentNumber: '220123459', status: 'attention', lastUpdate: '2 days ago' },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <DashboardCard
            title="My Students"
            value={dashboardData.totalStudents}
            description="Total assigned students"
            icon={Users}
          />
          <DashboardCard
            title="Pending Reviews"
            value={dashboardData.pendingReviews}
            description="Documents awaiting review"
            icon={FileText}
          />
          <DashboardCard
            title="Completion Rate"
            value={`${dashboardData.completionRate}%`}
            description="Students on track"
            icon={CheckCircle}
            trend={{ value: 5, isPositive: true }}
          />
          <DashboardCard
            title="Alerts"
            value={dashboardData.attendanceIssues}
            description="Require attention"
            icon={AlertTriangle}
          />
        </div>

        {/* Recent Students Activity */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Student Activity</CardTitle>
                <CardDescription>Students you're supervising</CardDescription>
              </div>
              <Button onClick={() => navigate('/staff/students')}>View All</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentStudents.map((student) => (
                <div key={student.id} className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-medium text-primary">{student.name.split(' ').map(n => n[0]).join('')}</span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{student.name}</p>
                      <p className="text-sm text-muted-foreground">{student.studentNumber}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-muted-foreground">{student.lastUpdate}</span>
                    <Badge variant={
                      student.status === 'on-track' ? 'default' : 
                      student.status === 'review-needed' ? 'secondary' : 
                      'destructive'
                    }>
                      {student.status === 'on-track' ? 'On Track' : 
                       student.status === 'review-needed' ? 'Review Needed' : 
                       'Needs Attention'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions & Pending Tasks */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Pending Document Reviews</CardTitle>
              <CardDescription>Documents requiring your approval</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div>
                    <p className="text-sm font-medium">Medical Certificates</p>
                    <p className="text-xs text-muted-foreground">4 pending</p>
                  </div>
                  <Button size="sm" variant="outline">Review</Button>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div>
                    <p className="text-sm font-medium">Attendance Logs</p>
                    <p className="text-xs text-muted-foreground">3 pending</p>
                  </div>
                  <Button size="sm" variant="outline">Review</Button>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div>
                    <p className="text-sm font-medium">Incident Reports</p>
                    <p className="text-xs text-muted-foreground">1 pending</p>
                  </div>
                  <Button size="sm" variant="outline">Review</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common supervisory tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate('/staff/documents')}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Review Documents
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate('/staff/students')}
                >
                  <Users className="mr-2 h-4 w-4" />
                  View All Students
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate('/staff/reports')}
                >
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Generate Reports
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StaffDashboard;
