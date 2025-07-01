
import React, { useState, useEffect } from "react";
import InventoryCard from "../../components/InventoryCard"; // ✅ Import reusable card
import axios from "axios";
import AdminNavbar from "../../components/Navbar/AdminNavbar";

function AdminInventory() {
  const [inventory, setInventory] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newItem, setNewItem] = useState({
    item_name: "",
    description: "",
    image_url: "",
    quantity: ""
  });
  

  // Fetch inventory from backend
  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/inventory");
      setInventory(res.data);
    } catch (err) {
      console.error("Error fetching inventory", err);
    }
  };

  // Add new item to inventory
  const handleAddItem = async () => {
  
    try {
      const adminId = localStorage.getItem("userId");
        const payload = {
        ...newItem,
        quantity: parseInt(newItem.quantity),           // ✅ ensure quantity is number
         created_by_admin_id: parseInt(adminId)          // ✅ required for backend FK
      };

    await axios.post("http://localhost:8080/api/inventory", payload, {
        withCredentials: true                           // ✅ include if using cookies
      });
      fetchInventory(); // Refresh list
      setShowForm(false); // Hide modal
      setNewItem({ item_name: "", description: "", image_url: "", quantity: ""});
    } catch (err) {
      console.error("Error adding item", err);
    }
  };

  return (
    <>
    <AdminNavbar />
    <div className="container mt-4 p-4 rounded bg-light shadow-sm">

      {/* Add Button */}
      <button className="btn btn-primary mb-3" onClick={() => setShowForm(true)}>
        + Add New Item
      </button>

      {/* Card List */}
      <div className="row">
        {inventory.map((item) => (
          <InventoryCard key={item.item_id} item={item} />
        ))}
      </div>

      {/* Popup Form */}
      {showForm && (
        <div className="modal d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">

              <div className="modal-header">
                <h5 className="modal-title">Add New Item</h5>
                <button type="button" className="close" onClick={() => setShowForm(false)}>
                  <span>&times;</span>
                </button>
              </div>

              <div className="modal-body">
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Item Name"
                  value={newItem.item_name}
                  onChange={(e) => setNewItem({ ...newItem, item_name: e.target.value })}
                />
                <textarea
                  className="form-control mb-2"
                  placeholder="Description"
                  value={newItem.description}
                  onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                />
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Image URL"
                  value={newItem.image_url}
                  onChange={(e) => setNewItem({ ...newItem, image_url: e.target.value })}
                />
                <input
                  type="number"
                  className="form-control mb-2"
                  placeholder="Quantity"
                  value={newItem.quantity}
                  onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
                />
              </div>

              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowForm(false)}>
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={handleAddItem}>
                  Add Item
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  </>
  );  
}

export default AdminInventory;
