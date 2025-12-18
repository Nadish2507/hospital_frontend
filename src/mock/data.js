export const mockDoctors = [
  { id: 1, name: "Dr. Adam", specialization: "Cardiology", experience: 10 },
  { id: 2, name: "Dr. Sofia", specialization: "Neurology", experience: 7 },
];

export const mockPatients = [
  { id: 1, name: "John Doe", age: 28, gender: "Male" },
  { id: 2, name: "Maria Lee", age: 34, gender: "Female" },
];

export const mockAppointments = [
  { id: 1, patientId: 1, doctorId: 2, time: "10:00 AM", status: "pending" },
  { id: 2, patientId: 2, doctorId: 1, time: "1:00 PM", status: "approved" },
];
