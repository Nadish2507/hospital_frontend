import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { appointmentsAPI } from "../../services/api";
import "./patient.css";

const PatientDashboard = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [myAppointments, setMyAppointments] = useState([]);
  const [stats, setStats] = useState({ total: 0, upcoming: 0, completed: 0 });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchMyAppointments();
    }
  }, [user]);

  const fetchMyAppointments = async () => {
    try {
      setLoading(true);
      const appointments = await appointmentsAPI.getAll();
      // Filter by both patient._id and patient.user._id to handle different data structures
      const filtered = appointments.filter(app => 
        app.patient?._id === user._id || 
        app.patient?.user?._id === user._id ||
        app.patient === user._id
      );
      setMyAppointments(filtered);
      
      const upcoming = filtered.filter(app => app.status === 'scheduled').length;
      const completed = filtered.filter(app => app.status === 'completed').length;
      
      setStats({
        total: filtered.length,
        upcoming,
        completed
      });
    } catch (error) {
      console.error('Failed to fetch appointments:', error);
    } finally {
      setLoading(false);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      await appointmentsAPI.update(appointmentId, { status: 'cancelled' });
      fetchMyAppointments();
    } catch (error) {
      alert('Failed to cancel appointment');
    }
  };

  return (
    <div className="patient-wrapper">
      <div className="patient-content">
        <h1 className="patient-title">Welcome, {user?.name}!</h1>
        <p>Manage your health and appointments here.</p>

        <div className="stats-grid">
          <div className="stat-card">
            <h3>{stats.total}</h3>
            <p>Total Appointments</p>
          </div>
          <div className="stat-card">
            <h3>{stats.upcoming}</h3>
            <p>Upcoming</p>
          </div>
          <div className="stat-card">
            <h3>{stats.completed}</h3>
            <p>Completed</p>
          </div>
        </div>

        <div className="quick-actions">
          <h2 className="sub-title">Quick Actions</h2>
          <div className="action-buttons">
            <button 
              className="book-appointment-btn"
              onClick={() => navigate('/patient/book')}
            >
              📅 Book New Appointment
            </button>
            <button 
              className="view-history-btn"
              onClick={() => navigate('/patient/history')}
            >
              📋 View Medical History
            </button>
          </div>
        </div>

        <h2 className="sub-title">My Appointments</h2>
        
        {loading ? (
          <p>Loading appointments...</p>
        ) : myAppointments.length === 0 ? (
          <p>No appointments yet.</p>
        ) : (
          <div className="appointments-list">
            {myAppointments.map((app) => (
              <div className="appointment-card" key={app._id}>
                <div className="appointment-info">
                  <p><strong>Doctor:</strong> {app.doctor?.user?.name}</p>
                  <p><strong>Specialization:</strong> {app.doctor?.specialization}</p>
                  <p><strong>Date:</strong> {new Date(app.date).toLocaleDateString()}</p>
                  <p><strong>Time:</strong> {app.time}</p>
                  <p><strong>Reason:</strong> {app.reason}</p>
                  <span className={`status ${app.status}`}>{app.status}</span>
                </div>
                {app.status === 'scheduled' && (
                  <button 
                    className="cancel-btn"
                    onClick={() => cancelAppointment(app._id)}
                  >
                    Cancel
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientDashboard;
