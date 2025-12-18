import React from "react";

const DoctorCard = ({ doctor }) => {
  return (
    <div>
      <h3>{doctor.name}</h3>
      <p>Specialization: {doctor.specialization}</p>
      <p>Experience: {doctor.experience} years</p>
      <p>Availability: {doctor.availability}</p>
    </div>
  );
};

export default DoctorCard;
