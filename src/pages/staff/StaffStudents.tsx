import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Eye, MessageSquare, Mail } from 'lucide-react';

const StaffStudents = () => {
  const students = [
    { 
      id: '1', 
      name: 'Thabo Mkhize', 
      studentNo: 'S2024001', 
      facility: 'Groote Schuur Hospital',
      hoursCompleted: 345,
      status: 'active',
      compliance: 'good'
    },
    { 
      id: '2', 
      name: 'Zanele Dlamini', 
      studentNo: 'S2024002', 
      facility: 'Red Cross Hospital',
      hoursCompleted: 298,
      status: 'active',
      compliance: 'warning'
    },
    { 
      id: '3', 
      name: 'Sipho Ndlovu', 
      studentNo: 'S2024003', 
      facility: 'Tygerberg Hospital',
      hoursCompleted: 412,
      status: 'active',
      compliance: 'good'
    },
    { 
      id: '4', 
      name: 'Nomvula Khumalo', 
      studentNo: 'S2024004', 
      facility: 'Groote Schuur Hospital',
      hoursCompleted: 156,
      status: 'on-leave',
      compliance: 'good'
    },
  ];

  const getComplianceBadge = (compliance: string) => {
    if (compliance === 'good') {
      return <Badge className="bg-green-500/10 text-green-700 dark:text-green-400">Good</Badge>;
    }
    return <Badge className="bg-yellow-500/10 text-yellow-700 dark:text-yellow-400">Warning</Badge>;
  };

  const getStatusBadge = (status: string) => {
    if (status === 'active') {
      return <Badge className="bg-blue-500/10 text-blue-700 dark:text-blue-400">Active</Badge>;
    }
    return <Badge variant="secondary">On Leave</Badge>;
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Assigned Students</h1>
          <p className="text-muted-foreground">Monitor and manage your assigned nursing students</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Student List</CardTitle>
            <CardDescription>Students currently under your supervision</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search by name or student number..." className="pl-10" />
              </div>
              <Select>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Filter by facility" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Facilities</SelectItem>
                  <SelectItem value="groote-schuur">Groote Schuur</SelectItem>
                  <SelectItem value="red-cross">Red Cross</SelectItem>
                  <SelectItem value="tygerberg">Tygerberg</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="on-leave">On Leave</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student Name</TableHead>
                    <TableHead>Student No.</TableHead>
                    <TableHead>Facility</TableHead>
                    <TableHead>Hours</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Compliance</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">{student.name}</TableCell>
                      <TableCell>{student.studentNo}</TableCell>
                      <TableCell>{student.facility}</TableCell>
                      <TableCell>{student.hoursCompleted}h</TableCell>
                      <TableCell>{getStatusBadge(student.status)}</TableCell>
                      <TableCell>{getComplianceBadge(student.compliance)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button size="sm" variant="ghost">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <MessageSquare className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Mail className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default StaffStudents;
