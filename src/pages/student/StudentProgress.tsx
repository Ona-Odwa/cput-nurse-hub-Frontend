import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Clock, CheckCircle, AlertCircle } from 'lucide-react';

const StudentProgress = () => {
  const specialties = [
    { name: 'Medical-Surgical', completed: 120, required: 200, status: 'in-progress' },
    { name: 'Pediatric Care', completed: 80, required: 150, status: 'in-progress' },
    { name: 'Maternity', completed: 100, required: 100, status: 'completed' },
    { name: 'Community Health', completed: 45, required: 120, status: 'in-progress' },
    { name: 'Mental Health', completed: 0, required: 80, status: 'not-started' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500/10 text-green-700 dark:text-green-400';
      case 'in-progress': return 'bg-blue-500/10 text-blue-700 dark:text-blue-400';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const totalCompleted = specialties.reduce((sum, s) => sum + s.completed, 0);
  const totalRequired = specialties.reduce((sum, s) => sum + s.required, 0);
  const overallProgress = (totalCompleted / totalRequired) * 100;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Progress Tracking</h1>
          <p className="text-muted-foreground">Monitor your clinical placement hours</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Hours</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalCompleted}</div>
              <p className="text-xs text-muted-foreground">of {totalRequired} required hours</p>
              <Progress value={overallProgress} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {specialties.filter(s => s.status === 'completed').length}
              </div>
              <p className="text-xs text-muted-foreground">specialties finished</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">In Progress</CardTitle>
              <AlertCircle className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {specialties.filter(s => s.status === 'in-progress').length}
              </div>
              <p className="text-xs text-muted-foreground">active specialties</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Progress by Specialty</CardTitle>
            <CardDescription>Breakdown of clinical hours per specialty area</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {specialties.map((specialty) => (
              <div key={specialty.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <h4 className="font-medium">{specialty.name}</h4>
                    <Badge className={getStatusColor(specialty.status)} variant="secondary">
                      {specialty.status.replace('-', ' ')}
                    </Badge>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {specialty.completed} / {specialty.required} hours
                  </span>
                </div>
                <Progress 
                  value={(specialty.completed / specialty.required) * 100} 
                  className="h-2"
                />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default StudentProgress;
