import React from "react";

const AppointmentCard = ({ appointment }) => {
  return (
    <div>
      <h3>Appointment</h3>
      <p>Patient ID: {appointment.patientId}</p>
      <p>Doctor ID: {appointment.doctorId}</p>
      <p>Date: {appointment.date}</p>
      <p>Time: {appointment.time}</p>
      <p>Status: {appointment.status}</p>
    </div>
  );
};

export default AppointmentCard;
