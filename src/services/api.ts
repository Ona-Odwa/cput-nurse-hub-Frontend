import axios from 'axios';
import { UserRole } from '@/contexts/AuthContext';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const apiService = {
  setAuthToken: (token: string | null) => {
    if (token) {
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete apiClient.defaults.headers.common['Authorization'];
    }
  },

  // Auth endpoints
  login: async (email: string, password: string, role: UserRole) => {
    const response = await apiClient.post('/auth/login', { email, password, role });
    return response.data;
  },

  // Student endpoints
  getStudentDashboard: async () => {
    const response = await apiClient.get('/student/dashboard');
    return response.data;
  },

  logAttendance: async (data: any) => {
    const response = await apiClient.post('/student/attendance', data);
    return response.data;
  },

  uploadDocument: async (formData: FormData) => {
    const response = await apiClient.post('/student/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  getStudentProgress: async () => {
    const response = await apiClient.get('/student/progress');
    return response.data;
  },

  submitIncident: async (data: any) => {
    const response = await apiClient.post('/student/incident', data);
    return response.data;
  },

  // Staff endpoints
  getStaffStudents: async () => {
    const response = await apiClient.get('/staff/students');
    return response.data;
  },

  reviewDocument: async (data: any) => {
    const response = await apiClient.post('/staff/review-document', data);
    return response.data;
  },

  getStaffReports: async () => {
    const response = await apiClient.get('/staff/reports');
    return response.data;
  },

  // Admin endpoints
  createUser: async (data: any) => {
    const response = await apiClient.post('/admin/create-user', data);
    return response.data;
  },

  updateUser: async (id: string, data: any) => {
    const response = await apiClient.put(`/admin/update-user/${id}`, data);
    return response.data;
  },

  deleteUser: async (id: string) => {
    const response = await apiClient.delete(`/admin/delete-user/${id}`);
    return response.data;
  },

  getFacilities: async () => {
    const response = await apiClient.get('/admin/facilities');
    return response.data;
  },

  assignStudent: async (data: any) => {
    const response = await apiClient.post('/admin/assign-student', data);
    return response.data;
  },

  getAdminReports: async () => {
    const response = await apiClient.get('/admin/reports');
    return response.data;
  },

  getIncidents: async () => {
    const response = await apiClient.get('/admin/incidents');
    return response.data;
  },

  resolveIncident: async (id: string) => {
    const response = await apiClient.put(`/admin/resolve-incident/${id}`);
    return response.data;
  },
};
