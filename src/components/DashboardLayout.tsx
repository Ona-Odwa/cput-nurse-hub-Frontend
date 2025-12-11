import { useAuth } from '@/contexts/AuthContext';
import { NavLink } from './NavLink';
import { Button } from './ui/button';
import { useEffect } from 'react';
import cputLogo from '@/assets/cput-logo.png';
import { 
  LayoutDashboard, 
  Users, 
  Building2, 
  FileText, 
  AlertCircle, 
  Settings,
  LogOut,
  Calendar,
  Upload,
  TrendingUp,
  ClipboardList,
  Shield,
  MapPin,
  MessageSquare
} from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { user, logout } = useAuth();

  useEffect(() => {
    if (user?.role) {
      document.documentElement.setAttribute('data-role', user.role);
    }
    return () => {
      document.documentElement.removeAttribute('data-role');
    };
  }, [user?.role]);

  const studentNav = [
    { to: '/student/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/student/attendance', icon: Calendar, label: 'Log Attendance' },
    { to: '/student/placements', icon: MapPin, label: 'Placements' },
    { to: '/student/documents', icon: Upload, label: 'Documents' },
    { to: '/student/progress', icon: TrendingUp, label: 'Progress' },
    { to: '/student/incidents', icon: AlertCircle, label: 'Report Incident' },
    { to: '/student/messages', icon: MessageSquare, label: 'Messages' },
    { to: '/student/settings', icon: Settings, label: 'Settings' },
  ];

  const staffNav = [
    { to: '/staff/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/staff/students', icon: Users, label: 'Students' },
    { to: '/staff/documents', icon: FileText, label: 'Review Documents' },
    { to: '/staff/notes', icon: ClipboardList, label: 'Notes & Feedback' },
    { to: '/staff/reports', icon: FileText, label: 'Reports' },
    { to: '/staff/messages', icon: MessageSquare, label: 'Messages' },
    { to: '/staff/settings', icon: Settings, label: 'Settings' },
  ];

  const adminNav = [
    { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/admin/users', icon: Users, label: 'User Management' },
    { to: '/admin/facilities', icon: Building2, label: 'Facilities' },
    { to: '/admin/reports', icon: FileText, label: 'Reports' },
    { to: '/admin/incidents', icon: AlertCircle, label: 'Incidents' },
    { to: '/admin/settings', icon: Settings, label: 'System Settings' },
    { to: '/admin/roles', icon: Shield, label: 'Roles & Permissions' },
    { to: '/admin/messages', icon: MessageSquare, label: 'Messages' },
  ];

  const navItems = user?.role === 'student' ? studentNav : user?.role === 'staff' ? staffNav : adminNav;

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-card shadow-sm flex flex-col">
        <div className="flex h-16 items-center justify-between border-b px-6">
          <h1 className="text-lg font-bold text-primary">CPUT Nursing</h1>
        </div>
        <nav className="flex flex-col gap-1 p-4 flex-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className="flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              activeClassName="bg-primary/10 text-primary"
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </NavLink>
          ))}
          <Button 
            variant="ghost" 
            onClick={logout} 
            className="flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground justify-start mt-1"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </Button>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1">
        <header className="flex h-16 items-center justify-between border-b bg-card px-6 shadow-sm">
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              Welcome, {user?.name}
            </h2>
            <p className="text-sm text-muted-foreground capitalize">{user?.role} Portal</p>
          </div>
          <div className="flex items-center gap-4">
            <img src={cputLogo} alt="CPUT Logo" className="h-12 w-auto" />
          </div>
        </header>
        <main className="p-6 bg-muted/30">{children}</main>
      </div>
    </div>
  );
};
