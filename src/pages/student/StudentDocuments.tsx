import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, FileText, CheckCircle, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const StudentDocuments = () => {
  const documents = [
    { id: '1', name: 'Medical Certificate', status: 'approved', uploadedDate: '2025-11-10' },
    { id: '2', name: 'ID Copy', status: 'pending', uploadedDate: '2025-11-15' },
    { id: '3', name: 'Bank Details', status: 'rejected', uploadedDate: '2025-11-08' },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Documents</h1>
          <p className="text-muted-foreground">Upload and manage your documents</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Upload Document</CardTitle>
            <CardDescription>Submit required documents for verification</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="doc-type">Document Type</Label>
              <Select>
                <SelectTrigger id="doc-type">
                  <SelectValue placeholder="Select document type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="medical">Medical Certificate</SelectItem>
                  <SelectItem value="id">ID Copy</SelectItem>
                  <SelectItem value="bank">Bank Details</SelectItem>
                  <SelectItem value="affidavit">Affidavit</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="file">Choose File</Label>
              <Input id="file" type="file" accept=".pdf,.jpg,.png" />
            </div>
            <Button className="w-full gap-2">
              <Upload className="h-4 w-4" />
              Upload Document
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Uploaded Documents</CardTitle>
            <CardDescription>Track your document submission status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {documents.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between border rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">{doc.name}</p>
                      <p className="text-sm text-muted-foreground">Uploaded: {doc.uploadedDate}</p>
                    </div>
                  </div>
                  <Badge variant={doc.status === 'approved' ? 'default' : doc.status === 'pending' ? 'secondary' : 'destructive'}>
                    {doc.status === 'approved' ? <CheckCircle className="h-3 w-3 mr-1" /> : <Clock className="h-3 w-3 mr-1" />}
                    {doc.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default StudentDocuments;
