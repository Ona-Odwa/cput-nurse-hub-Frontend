import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const StudentIncidents = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({ 
        title: 'Success', 
        description: 'Incident report submitted successfully. You will be contacted by staff.' 
      });
    }, 1000);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Report Incident</h1>
          <p className="text-muted-foreground">Submit safety or compliance incidents</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-destructive" />
              Incident Report Form
            </CardTitle>
            <CardDescription>
              Please provide detailed information about the incident. All reports are confidential.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="incident-date">Date of Incident</Label>
                  <Input id="incident-date" type="date" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="incident-time">Time of Incident</Label>
                  <Input id="incident-time" type="time" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="facility">Facility</Label>
                <Select required>
                  <SelectTrigger id="facility">
                    <SelectValue placeholder="Select facility where incident occurred" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="groote-schuur">Groote Schuur Hospital</SelectItem>
                    <SelectItem value="red-cross">Red Cross Hospital</SelectItem>
                    <SelectItem value="tygerberg">Tygerberg Hospital</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="incident-type">Incident Type</Label>
                <Select required>
                  <SelectTrigger id="incident-type">
                    <SelectValue placeholder="Select type of incident" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="safety">Safety Concern</SelectItem>
                    <SelectItem value="equipment">Equipment Malfunction</SelectItem>
                    <SelectItem value="harassment">Harassment/Discrimination</SelectItem>
                    <SelectItem value="medical">Medical Error</SelectItem>
                    <SelectItem value="policy">Policy Violation</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  placeholder="Provide a detailed description of what happened..." 
                  rows={6}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="witnesses">Witnesses (Optional)</Label>
                <Textarea 
                  id="witnesses" 
                  placeholder="List any witnesses present during the incident..." 
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="actions-taken">Actions Taken (Optional)</Label>
                <Textarea 
                  id="actions-taken" 
                  placeholder="Describe any immediate actions you or others took..." 
                  rows={3}
                />
              </div>

              <div className="flex gap-3">
                <Button type="submit" disabled={loading} className="flex-1">
                  {loading ? 'Submitting...' : 'Submit Report'}
                </Button>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default StudentIncidents;
