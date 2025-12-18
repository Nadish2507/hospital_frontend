import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { appointmentsAPI, doctorsAPI } from "../../services/api";
import "./doctor.css";

const DoctorDashboard = () => {
  const { user } = useContext(UserContext);
  const [appointments, setAppointments] = useState([]);
  const [doctorProfile, setDoctorProfile] = useState(null);
  const [stats, setStats] = useState({
    today: 0,
    upcoming: 0,
    completed: 0
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchDoctorData();
    }
  }, [user]);

  const fetchDoctorData = async () => {
    try {
      setLoading(true);
      const [appointmentsData, doctorsData] = await Promise.all([
        appointmentsAPI.getAll(),
        doctorsAPI.getAll()
      ]);

      // Find doctor profile
      const profile = doctorsData.find(doc => doc.user?._id === user._id);
      setDoctorProfile(profile);

      // Filter appointments for this doctor
      const myAppointments = appointmentsData.filter(
        app => app.doctor?._id === profile?._id
      );
      setAppointments(myAppointments);

      // Calculate stats
      const today = new Date().toDateString();
      const todayCount = myAppointments.filter(
        app => new Date(app.date).toDateString() === today && app.status === 'scheduled'
      ).length;
      
      const upcomingCount = myAppointments.filter(
        app => app.status === 'scheduled'
      ).length;
      
      const completedCount = myAppointments.filter(
        app => app.status === 'completed'
      ).length;

      setStats({
        today: todayCount,
        upcoming: upcomingCount,
        completed: completedCount
      });
    } catch (error) {
      console.error('Failed to fetch doctor data:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateAppointmentStatus = async (appointmentId, status) => {
    try {
      await appointmentsAPI.update(appointmentId, { status });
      fetchDoctorData();
    } catch (error) {
      alert('Failed to update appointment');
    }
  };

  return (
    <div className="doctor-wrapper">
      <div className="doctor-content">
        <h1 className="doctor-title">Welcome, Dr. {user?.name}!</h1>
        <p>Manage your appointments and patients here.</p>

        {loading ? (
          <p>Loading dashboard...</p>
        ) : (
          <>
            <div className="stats-grid">
              <div className="stat-card">
                <h3>{stats.today}</h3>
                <p>Today's Appointments</p>
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

            <h2 className="sub-title">Today's Appointments</h2>
            <div className="appointments-list">
              {appointments
                .filter(app => 
                  new Date(app.date).toDateString() === new Date().toDateString()
                )
                .map((app) => (
                  <div className="appointment-card" key={app._id}>
                    <div className="appointment-info">
                      <p><strong>Patient:</strong> {app.patient?.user?.name}</p>
                      <p><strong>Time:</strong> {app.time}</p>
                      <p><strong>Reason:</strong> {app.reason}</p>
                      <span className={`status ${app.status}`}>{app.status}</span>
                    </div>
                    <div className="appointment-actions">
                      {app.status === 'scheduled' && (
                        <>
                          <button
                            className="complete-btn"
                            onClick={() => updateAppointmentStatus(app._id, 'completed')}
                          >
                            Complete
                          </button>
                          <button
                            className="cancel-btn"
                            onClick={() => updateAppointmentStatus(app._id, 'cancelled')}
                          >
                            Cancel
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DoctorDashboard;