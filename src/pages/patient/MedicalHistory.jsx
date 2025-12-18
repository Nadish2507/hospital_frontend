import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { appointmentsAPI } from "../../services/api";
import "./patient.css";

const MedicalHistory = () => {
  const { user } = useContext(UserContext);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchMedicalHistory();
    }
  }, [user]);

  const fetchMedicalHistory = async () => {
    try {
      setLoading(true);
      const appointments = await appointmentsAPI.getAll();
      const completedAppointments = appointments.filter(
        app => (app.patient?._id === user._id || 
               app.patient?.user?._id === user._id ||
               app.patient === user._id) && 
               app.status === 'completed'
      );
      setHistory(completedAppointments);
    } catch (error) {
      console.error('Failed to fetch medical history:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="patient-wrapper">
      <div className="patient-content">
        <h1 className="patient-title">Medical History</h1>
        <p>View your past appointments and medical records.</p>

        {loading ? (
          <p>Loading medical history...</p>
        ) : history.length === 0 ? (
          <p>No medical history available.</p>
        ) : (
          <div className="history-list">
            {history.map((record) => (
              <div className="history-card" key={record._id}>
                <div className="history-header">
                  <h3>Dr. {record.doctor?.user?.name}</h3>
                  <span className="history-date">
                    {new Date(record.date).toLocaleDateString()}
                  </span>
                </div>
                <div className="history-details">
                  <p><strong>Specialization:</strong> {record.doctor?.specialization}</p>
                  <p><strong>Reason:</strong> {record.reason}</p>
                  <p><strong>Time:</strong> {record.time}</p>
                  {record.notes && (
                    <div className="history-notes">
                      <strong>Doctor's Notes:</strong>
                      <p>{record.notes}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MedicalHistory;