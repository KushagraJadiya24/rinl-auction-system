import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/admin/Dashboard';
import InventoryPage from './pages/admin/Inventory';
import ListedItemsPage from './pages/admin/ListedItems';
import AdminNavbar from './components/Navbar/AdminNavbar';

function App() {
  // For now, just assume admin is always logged in
  const isLoggedIn = true;

  return (
    <Router>
      {isLoggedIn && <AdminNavbar />}

      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/inventory" element={<InventoryPage />} />
        <Route path="/listed-items" element={<ListedItemsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
