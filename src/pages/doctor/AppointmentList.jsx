import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import {
  getAppointments,
  getDoctors,
  getPatients,
} from "../../services/dbService";
import "./doctor.css";

const AppointmentList = () => {
  const { user } = useContext(UserContext);
  const [list, setList] = useState([]);

  useEffect(() => {
    if (!user) return;

    const doctors = getDoctors();
    const appointments = getAppointments();
    const patients = getPatients();

    const currentDoctor = doctors.find(
      (d) => d.name === user.name
    );

    if (!currentDoctor) return;

    const assigned = appointments
      .filter((a) => a.doctorId === currentDoctor.id)
      .map((a) => ({
        ...a,
        patient: patients.find((p) => p.id === a.patientId),
      }));

    setList(assigned);
  }, [user]);

  return (
    <div className="doctor-wrapper">
      <div className="doctor-content">
        <h1 className="doctor-title">My Appointments</h1>

        {list.length === 0 && <p>No appointments found.</p>}

        {list.map((a) => (
          <div className="doctor-card" key={a.id}>
            <p><strong>Patient:</strong> {a.patient?.name || "Unknown"}</p>
            <p><strong>Time:</strong> {a.time}</p>
            <p><strong>Status:</strong> {a.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppointmentList;
