import { Routes, Route, Navigate } from "react-router-dom"
import DashboardHome from "../features/dashboard/DashboardHome"
import Login from "../features/auth/Login"
import StudentsList from "../features/students/StudentsList"
import AttendanceTracking from "../features/attendance/AttendanceTracking"
import MarksEntry from "../features/marks/MarksEntry"
import ReportGeneration from "../features/reports/ReportGeneration"
import UserManagement from "../features/users/UserManagement"
import ProtectedRoute from "./ProtectedRoute.jsx"

export default function AppRouter() {
  // For demo purposes, we're considering the user as authenticated
  const isAuthenticated = true;

  return (
    <Routes>
      <Route path="/login" element={
        isAuthenticated ? <Navigate to="/" replace /> : <Login />
      } />
      
      <Route path="/" element={
        <ProtectedRoute isAuthenticated={isAuthenticated}>
          <DashboardHome />
        </ProtectedRoute>
      } />
      
      <Route path="/students" element={
        <ProtectedRoute isAuthenticated={isAuthenticated}>
          <StudentsList />
        </ProtectedRoute>
      } />
      
      <Route path="/attendance" element={
        <ProtectedRoute isAuthenticated={isAuthenticated}>
          <AttendanceTracking />
        </ProtectedRoute>
      } />
      
      <Route path="/marks" element={
        <ProtectedRoute isAuthenticated={isAuthenticated}>
          <MarksEntry />
        </ProtectedRoute>
      } />
      
      <Route path="/reports" element={
        <ProtectedRoute isAuthenticated={isAuthenticated}>
          <ReportGeneration />
        </ProtectedRoute>
      } />
      
      <Route path="/users" element={
        <ProtectedRoute isAuthenticated={isAuthenticated}>
          <UserManagement />
        </ProtectedRoute>
      } />
      
      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
