import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './AdminNavbar.css';

export default function AdminNavbar() {
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark custom-navbar">
      <div className="container-fluid">
        <NavLink to="/dashboard" className="navbar-brand fw-bold">
          🏭 RINL Auctions
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#adminNavbar"
          aria-controls="adminNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="adminNavbar">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink to="/inventory" className="nav-link">
                Inventory
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/listed-items" className="nav-link">
                Listed Items
              </NavLink>
            </li>
          </ul>
          <button className="btn btn-outline-light">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
