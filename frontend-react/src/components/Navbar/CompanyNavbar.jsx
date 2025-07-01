import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";

export default function CompanyNavbar() {
  const companyId = localStorage.getItem("userId");

  const handleLogout = () => {
    console.log("Logout clicked");
    localStorage.clear();

    document.cookie.split(";").forEach((cookie) => {
      const [name] = cookie.split("=");
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
    });

    window.location.href = "/";
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <Link
        className="navbar-brand d-flex align-items-center me-4"
        to={`/company/${companyId}/dashboard`}
      >
        <img src={logo} alt="RINL Logo" height="35" className="me-2" />
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#companyNavbar"
        aria-controls="companyNavbar"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="companyNavbar">
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink
              to={`/company/${companyId}/dashboard`}
              className={({ isActive }) =>
                isActive ? "nav-link active text-primary fw-bold" : "nav-link"
              }
            >
              Dashboard
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to={`/auctions`}
              className={({ isActive }) =>
                isActive ? "nav-link active text-primary fw-bold" : "nav-link"
              }
            >
              Auctions
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to={`/company/${companyId}/my-bids`}
              className={({ isActive }) =>
                isActive ? "nav-link active text-primary fw-bold" : "nav-link"
              }
            >
              My Bids
            </NavLink>
          </li>
        </ul>

        <div className="ms-auto">
          <button onClick={handleLogout} className="btn btn-danger ms-auto">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
