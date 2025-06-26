import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AdminDashboard from "./pages/admin/Dashboard";
import CompanyDashboard from "./pages/company/Dashboard";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/company/:id/dashboard" element={<CompanyDashboard />} />
            </Routes>
        </Router>
    );
}

export default App;
