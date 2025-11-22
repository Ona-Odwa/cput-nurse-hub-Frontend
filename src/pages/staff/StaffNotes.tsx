import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { FileText, Plus } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const StaffNotes = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const existingNotes = [
    {
      id: '1',
      student: 'Thabo Mkhize',
      date: '2025-11-18',
      type: 'Performance',
      note: 'Excellent bedside manner. Shows great empathy with patients.',
      author: 'Dr. Smith'
    },
    {
      id: '2',
      student: 'Zanele Dlamini',
      date: '2025-11-15',
      type: 'Concern',
      note: 'Needs improvement in documentation accuracy. Follow-up scheduled.',
      author: 'Nurse Johnson'
    },
    {
      id: '3',
      student: 'Sipho Ndlovu',
      date: '2025-11-12',
      type: 'Achievement',
      note: 'Successfully completed advanced catheterization training.',
      author: 'Dr. Smith'
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({ title: 'Success', description: 'Note saved successfully' });
    }, 1000);
  };

  const getNoteTypeBadge = (type: string) => {
    if (type === 'Performance') {
      return <Badge className="bg-blue-500/10 text-blue-700 dark:text-blue-400">Performance</Badge>;
    }
    if (type === 'Achievement') {
      return <Badge className="bg-green-500/10 text-green-700 dark:text-green-400">Achievement</Badge>;
    }
    return <Badge className="bg-yellow-500/10 text-yellow-700 dark:text-yellow-400">Concern</Badge>;
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Notes & Feedback</h1>
          <p className="text-muted-foreground">Add notes and track feedback for students</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Add New Note
              </CardTitle>
              <CardDescription>Record observations and feedback</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="student">Student</Label>
                  <Select required>
                    <SelectTrigger id="student">
                      <SelectValue placeholder="Select student" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="s1">Thabo Mkhize</SelectItem>
                      <SelectItem value="s2">Zanele Dlamini</SelectItem>
                      <SelectItem value="s3">Sipho Ndlovu</SelectItem>
                      <SelectItem value="s4">Nomvula Khumalo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="note-type">Note Type</Label>
                  <Select required>
                    <SelectTrigger id="note-type">
                      <SelectValue placeholder="Select note type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="performance">Performance</SelectItem>
                      <SelectItem value="achievement">Achievement</SelectItem>
                      <SelectItem value="concern">Concern</SelectItem>
                      <SelectItem value="general">General</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="note-content">Note</Label>
                  <Textarea 
                    id="note-content"
                    placeholder="Enter your observations, feedback, or concerns..." 
                    rows={6}
                    required
                  />
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Saving...' : 'Save Note'}
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Recent Notes
              </CardTitle>
              <CardDescription>View your previously recorded notes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {existingNotes.map((note) => (
                  <div key={note.id} className="border rounded-lg p-4 space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium">{note.student}</p>
                        <p className="text-sm text-muted-foreground">{note.date}</p>
                      </div>
                      {getNoteTypeBadge(note.type)}
                    </div>
                    <p className="text-sm">{note.note}</p>
                    <p className="text-xs text-muted-foreground">By: {note.author}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StaffNotes;
