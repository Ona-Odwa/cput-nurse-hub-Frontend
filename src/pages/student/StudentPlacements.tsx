import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Phone, User, Building2, Calendar } from 'lucide-react';

export default function StudentPlacements() {
  // Mock data - will be replaced with API call
  const placement = {
    facility: {
      name: 'Groote Schuur Hospital',
      type: 'Hospital',
      location: 'Observatory, Cape Town',
      address: 'Main Road, Observatory, 7925',
      capacity: 250,
      supervisor: 'Sr. Jane Williams',
      contactNumber: '+27 21 404 9111',
    },
    startDate: '2024-02-01',
    endDate: '2024-05-31',
    department: 'Paediatrics',
    status: 'Active',
  };

  const otherFacilities = [
    {
      id: 1,
      name: 'Red Cross War Memorial Children\'s Hospital',
      type: 'Hospital',
      location: 'Rondebosch, Cape Town',
      capacity: 180,
    },
    {
      id: 2,
      name: 'Tygerberg Hospital',
      type: 'Hospital',
      location: 'Parow Valley, Cape Town',
      capacity: 300,
    },
    {
      id: 3,
      name: 'Mitchells Plain District Hospital',
      type: 'Hospital',
      location: 'Mitchells Plain, Cape Town',
      capacity: 150,
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">My Placements</h1>
          <p className="text-muted-foreground mt-2">
            View your assigned clinical facility and explore other available facilities
          </p>
        </div>

        {/* Current Placement */}
        <Card className="border-primary/20">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-2xl">{placement.facility.name}</CardTitle>
                <CardDescription className="mt-2">Current Active Placement</CardDescription>
              </div>
              <Badge className="bg-primary">{placement.status}</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Building2 className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Facility Type</p>
                    <p className="text-sm text-muted-foreground">{placement.facility.type}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-sm text-muted-foreground">{placement.facility.location}</p>
                    <p className="text-sm text-muted-foreground">{placement.facility.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <User className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Supervisor</p>
                    <p className="text-sm text-muted-foreground">{placement.facility.supervisor}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Contact Number</p>
                    <p className="text-sm text-muted-foreground">{placement.facility.contactNumber}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Placement Duration</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(placement.startDate).toLocaleDateString()} - {new Date(placement.endDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Building2 className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Department</p>
                    <p className="text-sm text-muted-foreground">{placement.department}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t">
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Capacity: <strong>{placement.facility.capacity}</strong> students
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Available Facilities */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Other Available Facilities</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {otherFacilities.map((facility) => (
              <Card key={facility.id} className="hover:border-primary/50 transition-colors">
                <CardHeader>
                  <CardTitle className="text-lg">{facility.name}</CardTitle>
                  <CardDescription>{facility.type}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{facility.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Capacity: {facility.capacity} students</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
