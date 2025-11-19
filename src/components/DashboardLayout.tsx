import { ReactNode } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  Calendar, 
  Upload, 
  TrendingUp,
  Settings,
  Building2,
  AlertTriangle,
  LogOut,
  Menu
} from 'lucide-react';
import { NavLink } from '@/components/NavLink';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface DashboardLayoutProps {
  children: ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const getNavigationItems = () => {
    switch (user?.role) {
      case 'student':
        return [
          { to: '/student/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
          { to: '/student/attendance', icon: Calendar, label: 'Log Attendance' },
          { to: '/student/documents', icon: Upload, label: 'Upload Documents' },
          { to: '/student/progress', icon: TrendingUp, label: 'Track Progress' },
          { to: '/student/incidents', icon: AlertTriangle, label: 'Report Incident' },
        ];
      case 'staff':
        return [
          { to: '/staff/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
          { to: '/staff/students', icon: Users, label: 'My Students' },
          { to: '/staff/documents', icon: FileText, label: 'Review Documents' },
          { to: '/staff/reports', icon: TrendingUp, label: 'Reports' },
        ];
      case 'admin':
        return [
          { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
          { to: '/admin/users', icon: Users, label: 'User Management' },
          { to: '/admin/facilities', icon: Building2, label: 'Facilities' },
          { to: '/admin/reports', icon: TrendingUp, label: 'Reports' },
          { to: '/admin/incidents', icon: AlertTriangle, label: 'Incidents' },
          { to: '/admin/settings', icon: Settings, label: 'Settings' },
        ];
      default:
        return [];
    }
  };

  const navItems = getNavigationItems();

  return (
    <div className="flex min-h-screen w-full bg-muted/30">
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-40 h-screen bg-card border-r border-border transition-all duration-300 ${
          sidebarOpen ? 'w-64' : 'w-0 md:w-16'
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex h-16 items-center justify-between border-b border-border px-4">
            {sidebarOpen && (
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-primary-foreground font-bold">
                  C
                </div>
                <span className="font-semibold text-foreground">CPUT Nursing</span>
              </div>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="h-8 w-8"
            >
              <Menu className="h-4 w-4" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 p-2 overflow-y-auto">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-accent hover:text-accent-foreground"
                activeClassName="bg-primary/10 text-primary font-medium"
              >
                <item.icon className={`h-5 w-5 ${sidebarOpen ? '' : 'md:mx-auto'}`} />
                {sidebarOpen && <span>{item.label}</span>}
              </NavLink>
            ))}
          </nav>

          {/* User Section */}
          <div className="border-t border-border p-4">
            {sidebarOpen && (
              <div className="mb-3">
                <p className="text-sm font-medium text-foreground">{user?.name}</p>
                <p className="text-xs text-muted-foreground capitalize">{user?.role}</p>
              </div>
            )}
            <Button
              variant="ghost"
              className="w-full justify-start text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
              onClick={logout}
            >
              <LogOut className={`h-4 w-4 ${sidebarOpen ? 'mr-2' : 'mx-auto'}`} />
              {sidebarOpen && 'Logout'}
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'md:ml-64' : 'md:ml-16'}`}>
        {/* Top Bar */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-card px-6">
          <h1 className="text-xl font-semibold text-foreground">
            {navItems.find(item => window.location.pathname === item.to)?.label || 'Dashboard'}
          </h1>
        </header>

        {/* Page Content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};
