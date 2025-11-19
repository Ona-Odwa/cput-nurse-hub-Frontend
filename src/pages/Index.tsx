import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect } from 'react';
import { GraduationCap, Calendar, FileCheck } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    if (isAuthenticated && user) {
      navigate(`/${user.role}/dashboard`);
    }
  }, [isAuthenticated, user, navigate]);

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-primary-foreground font-bold">
              C
            </div>
            <span className="font-semibold text-foreground">CPUT Nursing</span>
          </div>
          <Button onClick={() => navigate('/login')}>Sign In</Button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="bg-gradient-to-br from-primary/5 via-background to-accent/5 py-20">
          <div className="container mx-auto px-6 text-center">
            <div className="mx-auto max-w-3xl space-y-6">
              <h1 className="text-5xl font-bold text-foreground">
                CPUT Nursing Scheduling & Attendance System
              </h1>
              <p className="text-xl text-muted-foreground">
                Streamline student placements, track attendance, and manage nursing program administration efficiently
              </p>
              <div className="flex gap-4 justify-center pt-4">
                <Button size="lg" onClick={() => navigate('/login')}>
                  Get Started
                </Button>
                <Button size="lg" variant="outline" onClick={() => navigate('/login')}>
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-3">Key Features</h2>
              <p className="text-muted-foreground">Everything you need to manage nursing placements</p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
              <div className="text-center space-y-3">
                <div className="mx-auto h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Calendar className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Attendance Tracking</h3>
                <p className="text-muted-foreground">
                  Log and monitor student attendance across all placement facilities in real-time
                </p>
              </div>

              <div className="text-center space-y-3">
                <div className="mx-auto h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <FileCheck className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Document Management</h3>
                <p className="text-muted-foreground">
                  Upload, review, and manage student documents with streamlined approval workflows
                </p>
              </div>

              <div className="text-center space-y-3">
                <div className="mx-auto h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <GraduationCap className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Progress Monitoring</h3>
                <p className="text-muted-foreground">
                  Track student hours, placement progress, and compliance requirements effortlessly
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 Cape Peninsula University of Technology. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
