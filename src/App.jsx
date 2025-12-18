import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import { UserProvider } from "./context/UserContext";
import { HospitalProvider } from "./context/HospitalContext";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

// ADMIN
import DashboardAdmin from "./pages/admin/DashboardAdmin";
import ManageDoctors from "./pages/admin/ManageDoctors";
import ManagePatients from "./pages/admin/ManagePatients";
import ManagePharmacy from "./pages/admin/ManagePharmacy";

// DOCTOR
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import AppointmentList from "./pages/doctor/AppointmentList";
import PatientRecords from "./pages/doctor/PatientRecords";

// PATIENT
import PatientDashboard from "./pages/patient/PatientDashboard";
import BookAppointment from "./pages/patient/BookAppointment";
import MedicalHistory from "./pages/patient/MedicalHistory";

import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <UserProvider>
      <HospitalProvider>
        <BrowserRouter>
          <Navbar />

          <Routes>
            {/* PUBLIC */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* ADMIN */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute allowed={["admin"]}>
                  <DashboardAdmin />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/doctors"
              element={
                <ProtectedRoute allowed={["admin"]}>
                  <ManageDoctors />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/patients"
              element={
                <ProtectedRoute allowed={["admin"]}>
                  <ManagePatients />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/pharmacy"
              element={
                <ProtectedRoute allowed={["admin"]}>
                  <ManagePharmacy />
                </ProtectedRoute>
              }
            />

            {/* DOCTOR */}
            <Route
              path="/doctor"
              element={
                <ProtectedRoute allowed={["doctor"]}>
                  <DoctorDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/doctor/appointments"
              element={
                <ProtectedRoute allowed={["doctor"]}>
                  <AppointmentList />
                </ProtectedRoute>
              }
            />

            <Route
              path="/doctor/records"
              element={
                <ProtectedRoute allowed={["doctor"]}>
                  <PatientRecords />
                </ProtectedRoute>
              }
            />

            {/* PATIENT */}
            <Route
              path="/patient"
              element={
                <ProtectedRoute allowed={["patient"]}>
                  <PatientDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/patient/book"
              element={
                <ProtectedRoute allowed={["patient"]}>
                  <BookAppointment />
                </ProtectedRoute>
              }
            />

            <Route
              path="/patient/history"
              element={
                <ProtectedRoute allowed={["patient"]}>
                  <MedicalHistory />
                </ProtectedRoute>
              }
            />

            {/* NOT FOUND */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </HospitalProvider>
    </UserProvider>
  );
}

export default App;
