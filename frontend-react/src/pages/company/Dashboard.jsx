import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CompanyNavbar from "../../components/Navbar/CompanyNavbar";

function getCookie(name) {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? decodeURIComponent(match[2]) : null;
}

export default function CompanyDashboard() {
  const { id: paramId } = useParams();
  const companyId = paramId || getCookie("userId");

  const [companyName, setCompanyName] = useState("");

  useEffect(() => {
    const name = localStorage.getItem("companyName");
    setCompanyName(name || "Company");
  }, []);

  if (!companyId) return <p>Error: No Company ID found</p>;

  return (
    <>
      <CompanyNavbar />
      <div className="container py-4">
        <div className="card bg-light border-0 shadow-sm mb-4">
          <div className="card-body">
            <h4 className="card-title">Welcome, <strong>{companyName}</strong>! 🎉</h4>
            <p className="card-text">Ready to make your next winning bid?</p>
          </div>
        </div>

        <div className="row g-4">
          <div className="col-md-6">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h5 className="card-title">Ongoing Auctions</h5>
                <p className="card-text">Browse and bid on active RINL listings.</p>
                <a href="/auctions" className="btn btn-primary">
                  View Auctions
                </a>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h5 className="card-title">My Bids</h5>
                <p className="card-text">Track your bidding history and current offers.</p>
                <a href={`/company/${companyId}/my-bids`} className="btn btn-secondary">
                  View My Bids
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
