import React from 'react';
import AdminNavbar from '../../components/Navbar/AdminNavbar';
export default function AdminDashboard() {
  return (
    <>
    <AdminNavbar/>
    <div className="container mt-5 pt-5">
      <div className="row justify-content-center">
        <div className="col-md-10">
          <div className="card shadow-sm p-4 border-0">
            <h2 className="mb-3">🏢 Welcome to RINL Auction Dashboard</h2>
            <p className="text-muted fs-5">
              Manage steel tenders, view auctions, and monitor bidding activity in real time.
            </p>
            {/* Add buttons or quick links here if you like */}
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

