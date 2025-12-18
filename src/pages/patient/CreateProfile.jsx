import { useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { patientsAPI } from "../../services/api";
import { useNavigate } from "react-router-dom";
import "./patient.css";

const CreateProfile = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await patientsAPI.create({
        user: user._id,
        dateOfBirth: formData.dateOfBirth,
        gender: formData.gender,
        bloodGroup: formData.bloodGroup,
        emergencyContact: formData.emergencyContact
      });

      alert("Profile created successfully!");
      navigate("/patient");
    } catch (error) {
      setError("Failed to create profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="patient-wrapper">
      <div className="patient-content">
        <h1 className="patient-title">Complete Your Profile</h1>
        <p>Please provide additional information to complete your patient profile.</p>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <form className="profile-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Date of Birth</label>
            <input
              type="date"
              value={formData.dateOfBirth}
              onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <label>Gender</label>
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
          </div>

          <div className="form-group">
            <label>Blood Group</label>
            <input
              type="text"
              placeholder="e.g., A+, B-, O+"
              value={formData.bloodGroup}
              onChange={(e) => setFormData({...formData, bloodGroup: e.target.value})}
            />
          </div>

          <h3>Emergency Contact</h3>
          
          <div className="form-group">
            <label>Contact Name</label>
            <input
              type="text"
              placeholder="Emergency contact name"
              value={formData.emergencyContact.name}
              onChange={(e) => setFormData({
                ...formData, 
                emergencyContact: {...formData.emergencyContact, name: e.target.value}
              })}
            />
          </div>

          <div className="form-group">
            <label>Contact Phone</label>
            <input
              type="tel"
              placeholder="Emergency contact phone"
              value={formData.emergencyContact.phone}
              onChange={(e) => setFormData({
                ...formData, 
                emergencyContact: {...formData.emergencyContact, phone: e.target.value}
              })}
            />
          </div>

          <div className="form-group">
            <label>Relation</label>
            <input
              type="text"
              placeholder="e.g., Spouse, Parent, Sibling"
              value={formData.emergencyContact.relation}
              onChange={(e) => setFormData({
                ...formData, 
                emergencyContact: {...formData.emergencyContact, relation: e.target.value}
              })}
            />
          </div>

          <button type="submit" disabled={loading} className="submit-btn">
            {loading ? "Creating Profile..." : "Create Profile"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProfile;