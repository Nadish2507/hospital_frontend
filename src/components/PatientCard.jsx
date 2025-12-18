import React from "react";

const PatientCard = ({ patient }) => {
  return (
    <div>
      <h3>{patient.name}</h3>
      <p>Age: {patient.age}</p>
      <p>Gender: {patient.gender}</p>
      <p>Contact: {patient.contact}</p>
    </div>
  );
};

export default PatientCard;
