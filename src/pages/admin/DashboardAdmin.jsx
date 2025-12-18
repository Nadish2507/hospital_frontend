import { useContext, useEffect, useState } from "react";
import { HospitalContext } from "../../context/HospitalContext";
import { patientsAPI, doctorsAPI, appointmentsAPI } from "../../services/api";
import "./admin.css";

const DashboardAdmin = () => {
  const { patients, doctors, appointments } = useContext(HospitalContext);
  const [stats, setStats] = useState({
    totalPatients: 0,
    totalDoctors: 0,
    totalAppointments: 0,
    pendingAppointments: 0
  });
  const [recentAppointments, setRecentAppointments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      const [patientsData, doctorsData, appointmentsData] = await Promise.all([
        patientsAPI.getAll(),
        doctorsAPI.getAll(),
        appointmentsAPI.getAll()
      ]);

      setStats({
        totalPatients: patientsData.length,
        totalDoctors: doctorsData.length,
        totalAppointments: appointmentsData.length,
        pendingAppointments: appointmentsData.filter(app => app.status === 'scheduled').length
      });

      setRecentAppointments(
        appointmentsData
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 5)
      );
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-wrapper">
      <div className="admin-content">
        <h1 className="admin-title">Admin Dashboard</h1>
        <p>Overview of hospital management system</p>

        {loading ? (
          <p>Loading dashboard...</p>
        ) : (
          <>
            <div className="stats-grid">
              <div className="stat-card">
                <h3>{stats.totalPatients}</h3>
                <p>Total Patients</p>
              </div>
              <div className="stat-card">
                <h3>{stats.totalDoctors}</h3>
                <p>Total Doctors</p>
              </div>
              <div className="stat-card">
                <h3>{stats.totalAppointments}</h3>
                <p>Total Appointments</p>
              </div>
              <div className="stat-card">
                <h3>{stats.pendingAppointments}</h3>
                <p>Pending Appointments</p>
              </div>
            </div>

            <div className="recent-section">
              <h2 className="sub-title">Recent Appointments</h2>
              {recentAppointments.length === 0 ? (
                <p>No recent appointments.</p>
              ) : (
                <div className="recent-list">
                  {recentAppointments.map((app) => (
                    <div className="recent-item" key={app._id}>
                      <div>
                        <p><strong>Patient:</strong> {app.patient?.user?.name}</p>
                        <p><strong>Doctor:</strong> {app.doctor?.user?.name}</p>
                        <p><strong>Date:</strong> {new Date(app.date).toLocaleDateString()}</p>
                      </div>
                      <span className={`status ${app.status}`}>{app.status}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardAdmin;