import { useEffect, useState } from "react";
import { patientsAPI } from "../../services/api";
import "./manage.css";

const ManagePatients = () => {
  const [patients, setPatients] = useState([]);
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [formData, setFormData] = useState({
    dateOfBirth: "",
    gender: "",
    bloodGroup: "",
    emergencyContact: {
      name: "",
      phone: "",
      relation: ""
    }
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPatients();
    fetchRegisteredUsers();
  }, []);

  const fetchPatients = async () => {
    try {
      const data = await patientsAPI.getAll();
      setPatients(data);
    } catch (error) {
      setError("Failed to fetch patients");
    }
  };

  const fetchRegisteredUsers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/users/patients', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.ok) {
        const users = await response.json();
        const existingPatientUserIds = patients.map(p => p.user?._id);
        const availableUsers = users.filter(u => !existingPatientUserIds.includes(u._id));
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
      await patientsAPI.create({
        user: selectedUser,
        dateOfBirth: formData.dateOfBirth,
        gender: formData.gender,
        bloodGroup: formData.bloodGroup,
        emergencyContact: formData.emergencyContact
      });

      setSelectedUser("");
      setFormData({
        dateOfBirth: "",
        gender: "",
        bloodGroup: "",
        emergencyContact: { name: "", phone: "", relation: "" }
      });
      
      fetchPatients();
      fetchRegisteredUsers();
    } catch (error) {
      setError("Failed to create patient profile");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (patientId) => {
    if (window.confirm("Are you sure you want to delete this patient?")) {
      try {
        await patientsAPI.delete(patientId);
        fetchPatients();
      } catch (error) {
        setError("Failed to delete patient");
      }
    }
  };

  return (
    <div className="manage-wrapper">
      <div className="manage-content">
        <h1 className="manage-title">Manage Patients</h1>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <div className="info-box">
          <p><strong>Note:</strong> You can only create patient profiles for users who have already registered with patient role.</p>
        </div>

        <form className="manage-form" onSubmit={handleSubmit}>
          <select
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            required
          >
            <option value="">Select Registered Patient</option>
            {registeredUsers.map((user) => (
              <option key={user._id} value={user._id}>
                {user.name} - {user.email}
              </option>
            ))}
          </select>
          
          <input
            type="date"
            placeholder="Date of Birth"
            value={formData.dateOfBirth}
            onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})}
            required
          />
          
          <select
            value={formData.gender}
            onChange={(e) => setFormData({...formData, gender: e.target.value})}
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          
          <input
            type="text"
            placeholder="Blood Group"
            value={formData.bloodGroup}
            onChange={(e) => setFormData({...formData, bloodGroup: e.target.value})}
          />
          
          <input
            type="text"
            placeholder="Emergency Contact Name"
            value={formData.emergencyContact.name}
            onChange={(e) => setFormData({
              ...formData, 
              emergencyContact: {...formData.emergencyContact, name: e.target.value}
            })}
          />
          
          <input
            type="tel"
            placeholder="Emergency Contact Phone"
            value={formData.emergencyContact.phone}
            onChange={(e) => setFormData({
              ...formData, 
              emergencyContact: {...formData.emergencyContact, phone: e.target.value}
            })}
          />
          
          <button type="submit" disabled={loading}>
            {loading ? "Creating Profile..." : "Create Patient Profile"}
          </button>
        </form>

        <div className="manage-list">
          {patients.map((patient) => (
            <div className="manage-item" key={patient._id}>
              <div>
                <span><strong>{patient.user?.name}</strong></span>
                <span> - {patient.gender}</span>
                <span> - {patient.bloodGroup}</span>
                <span> - {new Date(patient.dateOfBirth).toLocaleDateString()}</span>
              </div>
              <button
                className="delete-btn"
                onClick={() => handleDelete(patient._id)}
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

export default ManagePatients;