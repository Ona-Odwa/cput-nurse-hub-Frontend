import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertCircle, CheckCircle, Eye } from 'lucide-react';
import { useState } from 'react';

const AdminIncidents = () => {
  const [filterStatus, setFilterStatus] = useState('all');

  const incidents = [
    { id: '1', reportedBy: 'Sarah Johnson', date: '2025-11-18', type: 'Safety Concern', status: 'unresolved', description: 'Inadequate PPE availability in ward' },
    { id: '2', reportedBy: 'John Doe', date: '2025-11-17', type: 'Equipment Issue', status: 'resolved', description: 'Blood pressure monitor malfunction' },
    { id: '3', reportedBy: 'Jane Smith', date: '2025-11-15', type: 'Workplace Harassment', status: 'unresolved', description: 'Verbal altercation with senior staff' },
    { id: '4', reportedBy: 'Mike Wilson', date: '2025-11-12', type: 'Protocol Violation', status: 'resolved', description: 'Incorrect medication administration procedure observed' },
  ];

  const filteredIncidents = incidents.filter(incident => 
    filterStatus === 'all' || incident.status === filterStatus
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Incident Management</h1>
            <p className="text-muted-foreground">Review and resolve reported incidents</p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Incidents</CardTitle>
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{incidents.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Unresolved</CardTitle>
              <AlertCircle className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">
                {incidents.filter(i => i.status === 'unresolved').length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Resolved</CardTitle>
              <CheckCircle className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">
                {incidents.filter(i => i.status === 'resolved').length}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>All Incidents</CardTitle>
                <CardDescription>Review and manage incident reports</CardDescription>
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="unresolved">Unresolved</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Reported By</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredIncidents.map((incident) => (
                  <TableRow key={incident.id}>
                    <TableCell className="font-medium">{incident.reportedBy}</TableCell>
                    <TableCell>{incident.date}</TableCell>
                    <TableCell>{incident.type}</TableCell>
                    <TableCell className="max-w-xs truncate">{incident.description}</TableCell>
                    <TableCell>
                      <Badge variant={incident.status === 'resolved' ? 'default' : 'destructive'}>
                        {incident.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="sm" className="gap-2">
                              <Eye className="h-4 w-4" />
                              View
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Incident Details</DialogTitle>
                              <DialogDescription>Full incident report</DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <p className="text-sm font-medium">Reported By</p>
                                  <p className="text-sm text-muted-foreground">{incident.reportedBy}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium">Date</p>
                                  <p className="text-sm text-muted-foreground">{incident.date}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium">Type</p>
                                  <p className="text-sm text-muted-foreground">{incident.type}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium">Status</p>
                                  <Badge variant={incident.status === 'resolved' ? 'default' : 'destructive'}>
                                    {incident.status}
                                  </Badge>
                                </div>
                              </div>
                              <div>
                                <p className="text-sm font-medium mb-2">Description</p>
                                <p className="text-sm text-muted-foreground">{incident.description}</p>
                              </div>
                              {incident.status === 'unresolved' && (
                                <Button className="w-full gap-2">
                                  <CheckCircle className="h-4 w-4" />
                                  Mark as Resolved
                                </Button>
                              )}
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminIncidents;
