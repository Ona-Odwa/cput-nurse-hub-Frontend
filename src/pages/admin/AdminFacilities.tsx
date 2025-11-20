import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Building2, Edit, Trash2, Users } from 'lucide-react';

const AdminFacilities = () => {
  const facilities = [
    { id: '1', name: 'Groote Schuur Hospital', location: 'Observatory, Cape Town', capacity: 50, assigned: 35, type: 'General' },
    { id: '2', name: 'Red Cross Hospital', location: 'Rondebosch, Cape Town', capacity: 30, assigned: 28, type: 'Pediatric' },
    { id: '3', name: 'Tygerberg Hospital', location: 'Bellville, Cape Town', capacity: 40, assigned: 32, type: 'General' },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Facility Management</h1>
            <p className="text-muted-foreground">Manage clinical placement facilities</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Building2 className="h-4 w-4" />
                Add Facility
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Facility</DialogTitle>
                <DialogDescription>Register a new clinical placement facility</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="facility-name">Facility Name</Label>
                  <Input id="facility-name" placeholder="Hospital Name" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" placeholder="City, Address" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="capacity">Capacity</Label>
                  <Input id="capacity" type="number" placeholder="30" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="type">Type</Label>
                  <Input id="type" placeholder="General / Pediatric / etc." />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Add Facility</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Facilities</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{facilities.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Capacity</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{facilities.reduce((acc, f) => acc + f.capacity, 0)}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Assigned Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{facilities.reduce((acc, f) => acc + f.assigned, 0)}</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Facilities</CardTitle>
            <CardDescription>Manage all clinical placement locations</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Facility Name</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Capacity</TableHead>
                  <TableHead>Assigned</TableHead>
                  <TableHead>Available</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {facilities.map((facility) => (
                  <TableRow key={facility.id}>
                    <TableCell className="font-medium">{facility.name}</TableCell>
                    <TableCell>{facility.location}</TableCell>
                    <TableCell>{facility.type}</TableCell>
                    <TableCell>{facility.capacity}</TableCell>
                    <TableCell>{facility.assigned}</TableCell>
                    <TableCell>
                      <span className={facility.capacity - facility.assigned < 5 ? 'text-warning font-medium' : 'text-success'}>
                        {facility.capacity - facility.assigned}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
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

export default AdminFacilities;
