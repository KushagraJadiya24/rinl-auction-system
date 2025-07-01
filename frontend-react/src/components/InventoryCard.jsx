import React from "react";
import "./InventoryCard.css";

function InventoryCard({ item }) {
  return (
    <div className="col-md-4 mb-4">
      <div className="inventory-card">
        <img
          src={item.image_url}
          alt={item.item_name}
          className="inventory-image"
        />
        <div className="inventory-body">
          <h5 className="inventory-title">{item.item_name}</h5>
          <p className="inventory-description">{item.description}</p>
          <p className="inventory-quantity">Quantity: {item.quantity}</p>
        </div>
      </div>
    </div>
  );
}

export default InventoryCard;
