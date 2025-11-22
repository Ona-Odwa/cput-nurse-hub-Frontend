import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText, CheckCircle, XCircle, Eye } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const StaffDocuments = () => {
  const { toast } = useToast();
  const [selectedDoc, setSelectedDoc] = useState<any>(null);

  const documents = [
    { 
      id: '1', 
      student: 'Thabo Mkhize', 
      type: 'Medical Certificate',
      date: '2025-11-20',
      status: 'pending'
    },
    { 
      id: '2', 
      student: 'Zanele Dlamini', 
      type: 'Attendance Log',
      date: '2025-11-19',
      status: 'pending'
    },
    { 
      id: '3', 
      student: 'Sipho Ndlovu', 
      type: 'Affidavit',
      date: '2025-11-18',
      status: 'approved'
    },
  ];

  const handleApprove = (docId: string) => {
    toast({ title: 'Success', description: 'Document approved successfully' });
    setSelectedDoc(null);
  };

  const handleReject = (docId: string) => {
    toast({ title: 'Success', description: 'Document rejected. Student will be notified.' });
    setSelectedDoc(null);
  };

  const getStatusBadge = (status: string) => {
    if (status === 'approved') {
      return <Badge className="bg-green-500/10 text-green-700 dark:text-green-400">Approved</Badge>;
    }
    if (status === 'rejected') {
      return <Badge className="bg-red-500/10 text-red-700 dark:text-red-400">Rejected</Badge>;
    }
    return <Badge className="bg-yellow-500/10 text-yellow-700 dark:text-yellow-400">Pending</Badge>;
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Review Documents</h1>
          <p className="text-muted-foreground">Approve or reject student submissions</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Pending Documents</CardTitle>
              <CardDescription>Documents awaiting your review</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by document type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="medical">Medical Certificates</SelectItem>
                    <SelectItem value="attendance">Attendance Logs</SelectItem>
                    <SelectItem value="affidavit">Affidavits</SelectItem>
                  </SelectContent>
                </Select>

                <div className="border rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {documents.map((doc) => (
                        <TableRow key={doc.id}>
                          <TableCell className="font-medium">{doc.student}</TableCell>
                          <TableCell>{doc.type}</TableCell>
                          <TableCell>{doc.date}</TableCell>
                          <TableCell>{getStatusBadge(doc.status)}</TableCell>
                          <TableCell>
                            <Button 
                              size="sm" 
                              variant="ghost"
                              onClick={() => setSelectedDoc(doc)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Document Viewer</CardTitle>
              <CardDescription>
                {selectedDoc ? `Reviewing: ${selectedDoc.type}` : 'Select a document to review'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {selectedDoc ? (
                <div className="space-y-4">
                  <div className="border rounded-lg p-6 bg-muted/30 min-h-[300px] flex items-center justify-center">
                    <div className="text-center space-y-2">
                      <FileText className="h-16 w-16 mx-auto text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        Document preview: {selectedDoc.type}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Submitted by {selectedDoc.student}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Comments</label>
                    <Textarea 
                      placeholder="Add comments or feedback for the student..." 
                      rows={4}
                    />
                  </div>

                  <div className="flex gap-3">
                    <Button 
                      className="flex-1" 
                      onClick={() => handleApprove(selectedDoc.id)}
                    >
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Approve
                    </Button>
                    <Button 
                      variant="destructive" 
                      className="flex-1"
                      onClick={() => handleReject(selectedDoc.id)}
                    >
                      <XCircle className="mr-2 h-4 w-4" />
                      Reject
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="min-h-[300px] flex items-center justify-center text-muted-foreground">
                  <p>No document selected</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StaffDocuments;
