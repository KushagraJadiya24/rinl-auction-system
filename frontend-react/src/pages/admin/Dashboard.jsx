import AdminNavbar from "../../components/Navbar/AdminNavbar";

export default function AdminDashboard() {
  return (
    <>
      <AdminNavbar />
      <div className="container py-4">
        <h2 className="mb-4 text-center fw-bold">Welcome to Admin Dashboard</h2>

        <div className="row">
          <div className="col-md-6 mb-4">
            <div className="card shadow border-0">
              <div className="card-body">
                <h5 className="card-title fw-semibold">Inventory Management</h5>
                <p className="card-text">
                  Add, view, and manage product inventory.
                </p>
                <a href="/admin/inventory" className="btn btn-dark">
                  Go to Inventory
                </a>
              </div>
            </div>
          </div>

          {/* Add more cards here for Auction Management, Company Requests etc. */}
        </div>
      </div>
    </>
  );
}
