import { Link } from "react-router-dom";
import "./adminSidebar.css";

const AdminSidebar = () => {
  return (
    <aside className="admin-sidebar">
      <h2 className="sidebar-title">Admin</h2>

      <ul className="sidebar-links">
        <li><Link to="/admin">Dashboard</Link></li>
        <li><Link to="/admin/doctors">Manage Doctors</Link></li>
        <li><Link to="/admin/patients">Manage Patients</Link></li>
        <li><Link to="/admin/pharmacy">Pharmacy</Link></li>
      </ul>
    </aside>
  );
};

export default AdminSidebar;
