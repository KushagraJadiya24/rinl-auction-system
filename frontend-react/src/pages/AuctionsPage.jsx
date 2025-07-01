import { useNavigate } from "react-router-dom";
import AdminNavbar from "../components/Navbar/AdminNavbar";
import Card from "../components/ui/card";
import { useAuctions } from "../hooks/useAuctions";
import AuctionForm from "../components/AuctionForm/AuctionForm";
import { useState } from "react";
import Modal from "../components/ui/Modal";
import axios from "axios";
import getAuctionStatus from "../utils/getAuctionStatus";
import CompanyNavbar from "../components/Navbar/CompanyNavbar";

export default function AuctionsPage() {
  const navigate = useNavigate();
  const { userRole, inventoryItems, auctions, fetchAuctions } = useAuctions();

  const [selectedItemId, setSelectedItemId] = useState("");
  const [auctionType, setAuctionType] = useState("HIGHEST");
  const [startingPrice, setStartingPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [endTime, setEndTime] = useState("");
  const [startTime, setStartTime] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleAuctionSubmit = async () => {
    if (!selectedItemId || !startingPrice || !quantity || !endTime || !startTime) {
      alert("Please fill all fields");
      return;
    }

    const newAuction = {
      itemId: selectedItemId,
      type: auctionType,
      quantity,
      startingPrice,
      startTime,
      endTime,
    };

    try {
      const response = await axios.post("http://localhost:8080/api/auctions", newAuction, {
        withCredentials: true,
      });
      console.log("Auction created:", response.data);
      setShowModal(false);
      fetchAuctions();
    } catch (error) {
      console.error("Error creating auction:", error);
      alert("Failed to create auction.");
    }
  };

  const goToAuctionPage = (id) => navigate(`/auctions/${id}`);
  console.log("User Role:", userRole);
  return (
    <>
      {userRole === "admin" && <AdminNavbar />}
      {userRole === "company" && <CompanyNavbar />}

      <div className="container py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold">Auctions</h2>
          {userRole === "admin" && (
            <button className="btn btn-primary" onClick={() => setShowModal(true)}>
              + List New Auction
            </button>
          )}
        </div>

        {showModal && (
          <Modal title="List New Auction" onClose={() => setShowModal(false)}>
            <AuctionForm
              inventoryItems={inventoryItems}
              selectedItemId={selectedItemId}
              setSelectedItemId={setSelectedItemId}
              auctionType={auctionType}
              setAuctionType={setAuctionType}
              quantity={quantity}
              setQuantity={setQuantity}
              startingPrice={startingPrice}
              setStartingPrice={setStartingPrice}
              startTime={startTime}
              setStartTime={setStartTime}
              endTime={endTime}
              setEndTime={setEndTime}
              handleAuctionSubmit={handleAuctionSubmit}
            />
          </Modal>
        )}

        <div className="row">
          {auctions.map((auction) => {
            const status = getAuctionStatus(auction.startTime, auction.endTime, auction.isClosed);
            return (
              <div className="col-md-4 mb-4" key={auction.id}>
                <Card onClick={() => goToAuctionPage(auction.id)} className="h-100 cursor-pointer shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">{auction.item_name || "Unnamed Item"}</h5>
                    <p className="card-text">Type: {auction.type} bid</p>
                    <p className="card-text">Current Bid: ₹{auction.currentBid ?? auction.startingPrice}</p>
                    <span
                      className={`badge ${
                        status === "ACTIVE"
                          ? "bg-success"
                          : status === "UPCOMING"
                          ? "bg-info"
                          : "bg-secondary"
                      }`}
                    >
                      Status: {status}
                    </span>
                  </div>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
