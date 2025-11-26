import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Login from "./pages/Login";
import StudentDashboard from "./pages/student/StudentDashboard";
import StudentAttendance from "./pages/student/StudentAttendance";
import StudentDocuments from "./pages/student/StudentDocuments";
import StudentProgress from "./pages/student/StudentProgress";
import StudentIncidents from "./pages/student/StudentIncidents";
import StudentPlacements from "./pages/student/StudentPlacements";
import StaffDashboard from "./pages/staff/StaffDashboard";
import StaffStudents from "./pages/staff/StaffStudents";
import StaffDocuments from "./pages/staff/StaffDocuments";
import StaffNotes from "./pages/staff/StaffNotes";
import StaffReports from "./pages/staff/StaffReports";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminFacilities from "./pages/admin/AdminFacilities";
import AdminReports from "./pages/admin/AdminReports";
import AdminIncidents from "./pages/admin/AdminIncidents";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminRoles from "./pages/admin/AdminRoles";
import Messages from "./pages/Messages";
import Settings from "./pages/Settings";
import Unauthorized from "./pages/Unauthorized";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            
            {/* Student Routes */}
            <Route 
              path="/student/dashboard" 
              element={
                <ProtectedRoute allowedRoles={['student']}>
                  <StudentDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/student/attendance" 
              element={
                <ProtectedRoute allowedRoles={['student']}>
                  <StudentAttendance />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/student/documents" 
              element={
                <ProtectedRoute allowedRoles={['student']}>
                  <StudentDocuments />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/student/progress" 
              element={
                <ProtectedRoute allowedRoles={['student']}>
                  <StudentProgress />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/student/incidents" 
              element={
                <ProtectedRoute allowedRoles={['student']}>
                  <StudentIncidents />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/student/placements" 
              element={
                <ProtectedRoute allowedRoles={['student']}>
                  <StudentPlacements />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/student/messages" 
              element={
                <ProtectedRoute allowedRoles={['student']}>
                  <Messages />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/student/settings" 
              element={
                <ProtectedRoute allowedRoles={['student']}>
                  <Settings />
                </ProtectedRoute>
              } 
            />
            
            {/* Staff Routes */}
            <Route 
              path="/staff/dashboard" 
              element={
                <ProtectedRoute allowedRoles={['staff']}>
                  <StaffDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/staff/students" 
              element={
                <ProtectedRoute allowedRoles={['staff']}>
                  <StaffStudents />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/staff/documents" 
              element={
                <ProtectedRoute allowedRoles={['staff']}>
                  <StaffDocuments />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/staff/notes" 
              element={
                <ProtectedRoute allowedRoles={['staff']}>
                  <StaffNotes />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/staff/reports" 
              element={
                <ProtectedRoute allowedRoles={['staff']}>
                  <StaffReports />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/staff/messages" 
              element={
                <ProtectedRoute allowedRoles={['staff']}>
                  <Messages />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/staff/settings" 
              element={
                <ProtectedRoute allowedRoles={['staff']}>
                  <Settings />
                </ProtectedRoute>
              } 
            />
            
            {/* Admin Routes */}
            <Route 
              path="/admin/dashboard" 
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/users" 
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminUsers />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/facilities" 
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminFacilities />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/reports" 
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminReports />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/incidents" 
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminIncidents />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/settings" 
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminSettings />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/roles" 
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminRoles />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/messages" 
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <Messages />
                </ProtectedRoute>
              } 
            />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
