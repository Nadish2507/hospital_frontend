import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { doctorsAPI, appointmentsAPI, patientsAPI } from "../../services/api";
import "./patient.css";

const BookAppointment = () => {
  const { user } = useContext(UserContext);
  const [doctors, setDoctors] = useState([]);
  const [doctorId, setDoctorId] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [reason, setReason] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const doctorsData = await doctorsAPI.getAll();
      // Only show doctors with complete profiles
      const activeDoctors = doctorsData.filter(doctor => 
        doctor.user && doctor.specialization && doctor.consultationFee
      );
      setDoctors(activeDoctors);
    } catch (error) {
      setError("Failed to load doctors");
    }
  };

  const handleBook = async (e) => {
    e.preventDefault();
    if (!doctorId || !date || !time || !reason) {
      setError("Please fill all fields");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // First check if patient profile exists, if not create basic one
      let patientProfile;
      try {
        const patients = await patientsAPI.getAll();
        patientProfile = patients.find(p => p.user?._id === user._id);
        
        if (!patientProfile) {
          // Create basic patient profile
          patientProfile = await patientsAPI.create({
            user: user._id,
            dateOfBirth: "1990-01-01",
            gender: "other",
            bloodGroup: "Unknown"
          });
        }
      } catch (profileError) {
        console.error('Patient profile error:', profileError);
      }

      const appointmentData = {
        doctor: doctorId,
        patient: patientProfile?._id || user._id,
        date,
        time,
        reason,
        status: "scheduled"
      };

      await appointmentsAPI.create(appointmentData);
      
      setDoctorId("");
      setDate("");
      setTime("");
      setReason("");
      setSuccess(true);
      
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error('Booking error:', error);
      setError(`Failed to book appointment: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="patient-wrapper">
      <div className="patient-content">
        <h1 className="patient-title">Book Appointment</h1>

        {error && <p style={{ color: "red", marginBottom: "15px" }}>{error}</p>}
        {success && <p style={{ color: "green", marginBottom: "15px" }}>Appointment booked successfully!</p>}

        <form className="patient-form" onSubmit={handleBook}>
          <select
            value={doctorId}
            onChange={(e) => setDoctorId(e.target.value)}
            required
          >
            <option value="">Select Doctor</option>
            {doctors.map((doctor) => (
              <option key={doctor._id} value={doctor._id}>
                {doctor.user?.name} — {doctor.specialization} — ${doctor.consultationFee}
              </option>
            ))}
          </select>

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            required
          />

          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Reason for visit"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
          />

          <button disabled={loading}>
            {loading ? "Booking..." : "Book Appointment"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookAppointment;
