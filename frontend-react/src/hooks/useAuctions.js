// hooks/useAuctions.js
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export function useAuctions() {
  const [userRole, setUserRole] = useState("");
  const [inventoryItems, setInventoryItems] = useState([]);
  const [auctions, setAuctions] = useState([]);

  useEffect(() => {
     const roleFromCookie = Cookies.get("role");
      setUserRole(roleFromCookie);

    fetchAuctions();

    if (roleFromCookie === "admin") {
      fetchInventory();
    }
  }, []);

  const fetchInventory = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/inventory", {
        withCredentials: true,
      });
      setInventoryItems(res.data);
    } catch (error) {
      console.error("Failed to fetch inventory:", error);
    }
  };

  const fetchAuctions = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/auctions/active", {
        withCredentials: true,
      });
      setAuctions(res.data);
    } catch (error) {
      console.error("Failed to fetch auctions:", error);
    }
  };

  return { userRole, inventoryItems, auctions, fetchAuctions ,getAuctionStatus };
}

  export function getAuctionStatus(startTime, endTime, isClosed) {
  const now = new Date();

  const start = new Date(startTime);
  const end = new Date(endTime);

  if (isClosed || now > end) return "CLOSED";
  if (now < start) return "UPCOMING";
  return "ACTIVE";
};
