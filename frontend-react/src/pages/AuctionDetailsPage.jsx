// src/pages/AuctionDetails.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import getAuctionStatus from "../utils/getAuctionStatus";

export default function AuctionDetails() {
  const { id } = useParams();
  const [auction, setAuction] = useState(null);
  const [bidders, setBidders] = useState([]);
  const [bidAmount, setBidAmount] = useState("");

  const fetchAuctionDetails = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/auctions/${id}`, {
        withCredentials: true,
      });
      setAuction(res.data.auction);
      setBidders(res.data.bidders);
    } catch (error) {
      console.error("Failed to fetch auction details:", error);
    }
  };

  const handleBidSubmit = async () => {
    if (!bidAmount || isNaN(bidAmount)) return alert("Enter a valid amount");

    try {
      await axios.post(
        `http://localhost:8080/api/bids`,
        {
          auctionId: id,
          amount: bidAmount,
        },
        { withCredentials: true }
      );
      setBidAmount("");
      fetchAuctionDetails(); // refresh bidders
    } catch (error) {
      console.error("Error submitting bid:", error);
      alert("Failed to submit bid.");
    }
  };

  useEffect(() => {
    fetchAuctionDetails();
  }, [id]);

  if (!auction) return <div className="container mt-5">Loading...</div>;

  const status = getAuctionStatus(auction.startTime, auction.endTime, auction.isClosed);

  return (
    <div className="container mt-5">
      <h2 className="mb-3">{auction.item?.item_name || "Unnamed Item"}</h2>
      <p>Type: {auction.type} bid</p>
      <p>Quantity: {auction.quantity}</p>
      <p>Starting Price: ₹{auction.startingPrice}</p>
      <p>Status: <span className={`badge ${
        status === "ACTIVE" ? "bg-success" :
        status === "UPCOMING" ? "bg-info" : "bg-secondary"
      }`}>{status}</span></p>

      <hr />

      <h5>Current Bidders</h5>
      {bidders.length > 0 ? (
        <ul className="list-group mb-3">
          {bidders.map((bid) => (
            <li key={bid.id} className="list-group-item d-flex justify-content-between">
              <span>₹{bid.amount}</span>
              <span className="text-muted">{new Date(bid.timestamp).toLocaleString()}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>No bids yet.</p>
      )}

      {status === "ACTIVE" && (
        <>
          <div className="mb-3">
            <label className="form-label">Place Your Bid</label>
            <input
              type="number"
              className="form-control"
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
              placeholder="Enter your bid"
            />
          </div>
          <button onClick={handleBidSubmit} className="btn btn-primary">Submit Bid</button>
        </>
      )}
    </div>
  );
}
