import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import "./navbar.css";

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);

  return (
    <nav className="nav">
      <h2 className="logo">HMS</h2>

      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>

        {!user && (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        )}

        {user?.role === "admin" && (
          <>
            <li><Link to="/admin">Dashboard</Link></li>
            <li><Link to="/admin/doctors">Doctors</Link></li>
            <li><Link to="/admin/patients">Patients</Link></li>
            <li><Link to="/admin/pharmacy">Pharmacy</Link></li>
          </>
        )}

        {user?.role === "doctor" && (
          <>
            <li><Link to="/doctor">Dashboard</Link></li>
            <li><Link to="/doctor/appointments">Appointments</Link></li>
            <li><Link to="/doctor/records">Records</Link></li>
          </>
        )}

        {user?.role === "patient" && (
          <>
            <li><Link to="/patient">Dashboard</Link></li>
            <li><Link to="/patient/book">Book</Link></li>
            <li><Link to="/patient/history">History</Link></li>
          </>
        )}

        {user && (
          <li
            className="logout"
            onClick={() => setUser(null)}
          >
            Logout
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
