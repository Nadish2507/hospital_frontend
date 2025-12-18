// INITIALIZE LOCALSTORAGE TABLES IF NOT EXIST
export const initDB = () => {
  if (!localStorage.getItem("users")) localStorage.setItem("users", "[]");
  if (!localStorage.getItem("doctors")) localStorage.setItem("doctors", "[]");
  if (!localStorage.getItem("patients")) localStorage.setItem("patients", "[]");
  if (!localStorage.getItem("appointments"))
    localStorage.setItem("appointments", "[]");
  if (!localStorage.getItem("pharmacy"))
    localStorage.setItem("pharmacy", "[]");
};

// GETTERS
export const getUsers = () => JSON.parse(localStorage.getItem("users"));
export const getDoctors = () => JSON.parse(localStorage.getItem("doctors"));
export const getPatients = () => JSON.parse(localStorage.getItem("patients"));
export const getAppointments = () =>
  JSON.parse(localStorage.getItem("appointments"));
export const getPharmacy = () => JSON.parse(localStorage.getItem("pharmacy"));

// SAVERS
export const saveUser = (user) => {
  const users = getUsers();
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
};

export const saveDoctor = (doctor) => {
  const doctors = getDoctors();
  doctors.push(doctor);
  localStorage.setItem("doctors", JSON.stringify(doctors));
};

export const savePatient = (patient) => {
  const patients = getPatients();
  patients.push(patient);
  localStorage.setItem("patients", JSON.stringify(patients));
};

export const saveAppointment = (appointment) => {
  const apps = getAppointments();
  apps.push(appointment);
  localStorage.setItem("appointments", JSON.stringify(apps));
};

export const saveMedicine = (medicine) => {
  const meds = getPharmacy();
  meds.push(medicine);
  localStorage.setItem("pharmacy", JSON.stringify(meds));
};
