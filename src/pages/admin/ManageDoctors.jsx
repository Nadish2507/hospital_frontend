import { useEffect, useState } from "react";
import { doctorsAPI, authAPI } from "../../services/api";
import "./manage.css";

const ManageDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [formData, setFormData] = useState({
    specialization: "",
    experience: "",
    qualification: "",
    consultationFee: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDoctors();
    fetchRegisteredUsers();
  }, []);

  const fetchDoctors = async () => {
    try {
      const data = await doctorsAPI.getAll();
      setDoctors(data);
    } catch (error) {
      setError("Failed to fetch doctors");
    }
  };

  const fetchRegisteredUsers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/users/doctors', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.ok) {
        const users = await response.json();
        // Filter out users who already have doctor profiles
        const existingDoctorUserIds = doctors.map(d => d.user?._id);
        const availableUsers = users.filter(u => !existingDoctorUserIds.includes(u._id));
        setRegisteredUsers(availableUsers);
      }
    } catch (error) {
      setError('Failed to fetch registered users');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedUser) {
      setError("Please select a registered user");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await doctorsAPI.create({
        user: selectedUser,
        specialization: formData.specialization,
        experience: parseInt(formData.experience),
        qualification: formData.qualification,
        consultationFee: parseFloat(formData.consultationFee)
      });

      setSelectedUser("");
      setFormData({
        specialization: "",
        experience: "",
        qualification: "",
        consultationFee: ""
      });
      
      fetchDoctors();
      fetchRegisteredUsers();
    } catch (error) {
      setError("Failed to create doctor profile");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (doctorId) => {
    if (window.confirm("Are you sure you want to delete this doctor?")) {
      try {
        await doctorsAPI.delete(doctorId);
        fetchDoctors();
      } catch (error) {
        setError("Failed to delete doctor");
      }
    }
  };

  return (
    <div className="manage-wrapper">
      <div className="manage-content">
        <h1 className="manage-title">Manage Doctors</h1>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <div className="info-box">
          <p><strong>Note:</strong> You can only create doctor profiles for users who have already registered with doctor role.</p>
        </div>

        <form className="manage-form" onSubmit={handleSubmit}>
          <select
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            required
          >
            <option value="">Select Registered Doctor</option>
            {registeredUsers.map((user) => (
              <option key={user._id} value={user._id}>
                {user.name} - {user.email}
              </option>
            ))}
          </select>
          
          <input
            type="text"
            placeholder="Specialization"
            value={formData.specialization}
            onChange={(e) => setFormData({...formData, specialization: e.target.value})}
            required
          />
          <input
            type="number"
            placeholder="Experience (years)"
            value={formData.experience}
            onChange={(e) => setFormData({...formData, experience: e.target.value})}
            required
          />
          <input
            type="text"
            placeholder="Qualification"
            value={formData.qualification}
            onChange={(e) => setFormData({...formData, qualification: e.target.value})}
            required
          />
          <input
            type="number"
            placeholder="Consultation Fee"
            value={formData.consultationFee}
            onChange={(e) => setFormData({...formData, consultationFee: e.target.value})}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Creating Profile..." : "Create Doctor Profile"}
          </button>
        </form>

        <div className="manage-list">
          {doctors.map((doctor) => (
            <div className="manage-item" key={doctor._id}>
              <div>
                <span><strong>{doctor.user?.name}</strong></span>
                <span> - {doctor.specialization}</span>
                <span> - {doctor.experience} years exp</span>
                <span> - ${doctor.consultationFee}</span>
              </div>
              <button
                className="delete-btn"
                onClick={() => handleDelete(doctor._id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageDoctors;