import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/admin.png"; // Adjust the path as needed

export default function AdminNavbar() {
  const handleLogout = () => {
    console.log("Logout clicked");
    localStorage.clear();

    document.cookie.split(";").forEach((cookie) => {
      const [name] = cookie.split("=");
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
    });

    window.location.href = "/"; // ← More reliable than navigate
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      {/* Brand logo */}
      <Link className="navbar-brand d-flex align-items-center me-4" to="/admin/dashboard">
        <img src={logo} alt="RINL Logo" height="35" className="me-2" />
      </Link>

      {/* Toggler for mobile */}
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#adminNavbar"
        aria-controls="adminNavbar"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      {/* Collapsible content */}
      <div className="collapse navbar-collapse" id="adminNavbar">
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink
              to="/admin/dashboard"
              className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
            >
              Dashboard
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/admin/inventory"
              className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
            >
              Inventory
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/auctions"
              className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
            >
              Listed Items
            </NavLink>
          </li>
        </ul>

        {/* Logout button aligned to right */}
        <div className="ms-auto">
          <button onClick={handleLogout} className="btn btn-danger">Logout</button>
        </div>
      </div>
    </nav>
  );
}
