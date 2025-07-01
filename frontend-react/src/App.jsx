import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AdminDashboard from "./pages/admin/Dashboard";
import CompanyDashboard from "./pages/company/Dashboard";
import AdminInventory from "./pages/admin/Inventory";
import MyBidsPage from "./pages/company/MyBids";
import AuctionsPage from "./pages/AuctionsPage";
import AuctionDetailsPage from "./pages/AuctionDetailsPage"; // you can create this later

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/inventory" element={<AdminInventory />} /> 
                <Route path="/company/:id/dashboard" element={<CompanyDashboard />} />
                <Route path="/auctions" element={<AuctionsPage />} />
                <Route path="/auction/:id" element={<AuctionDetailsPage />} />
                <Route path="/company/:id/my-bids"  element={<MyBidsPage />} />

            </Routes>
        </Router>
    );
}

export default App;
