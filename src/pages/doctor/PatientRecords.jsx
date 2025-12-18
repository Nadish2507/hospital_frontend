import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import {
  getAppointments,
  getDoctors,
  getPatients,
} from "../../services/dbService";
import "./doctor.css";

const PatientRecords = () => {
  const { user } = useContext(UserContext);
  const [records, setRecords] = useState([]);

  useEffect(() => {
    if (!user) return;

    const doctors = getDoctors();
    const appointments = getAppointments();
    const patients = getPatients();

    const currentDoctor = doctors.find(
      (d) => d.name === user.name
    );

    if (!currentDoctor) return;

    const assignedAppointments = appointments.filter(
      (a) => a.doctorId === currentDoctor.id
    );

    const assignedPatients = patients.filter((p) =>
      assignedAppointments.some((a) => a.patientId === p.id)
    );

    setRecords(assignedPatients);
  }, [user]);

  return (
    <div className="doctor-wrapper">
      <div className="doctor-content">
        <h1 className="doctor-title">Patient Records</h1>

        {records.length === 0 && <p>No patients found.</p>}

        {records.map((p) => (
          <div className="doctor-card" key={p.id}>
            <p><strong>Name:</strong> {p.name}</p>
            <p><strong>Age:</strong> {p.age}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientRecords;
