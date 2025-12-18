import { createContext, useState, useEffect } from "react";
import { patientsAPI, doctorsAPI, appointmentsAPI } from "../services/api";

export const HospitalContext = createContext();

export const HospitalProvider = ({ children }) => {
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [pharmacy, setPharmacy] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchPatients = async () => {
    try {
      setLoading(true);
      const data = await patientsAPI.getAll();
      setPatients(data);
    } catch (err) {
      setError("Failed to fetch patients");
    } finally {
      setLoading(false);
    }
  };

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const data = await doctorsAPI.getAll();
      setDoctors(data);
    } catch (err) {
      setError("Failed to fetch doctors");
    } finally {
      setLoading(false);
    }
  };

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const data = await appointmentsAPI.getAll();
      setAppointments(data);
    } catch (err) {
      setError("Failed to fetch appointments");
    } finally {
      setLoading(false);
    }
  };

  const refreshData = () => {
    fetchPatients();
    fetchDoctors();
    fetchAppointments();
  };

  return (
    <HospitalContext.Provider
      value={{ 
        patients, setPatients, fetchPatients,
        doctors, setDoctors, fetchDoctors,
        appointments, setAppointments, fetchAppointments,
        pharmacy, setPharmacy,
        loading, error, refreshData
      }}
    >
      {children}
    </HospitalContext.Provider>
  );
};
