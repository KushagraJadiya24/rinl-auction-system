// src/pages/AuctionDetailsPage.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import CompanyNavbar from "../components/Navbar/CompanyNavbar";
import AdminNavbar from "../components/Navbar/AdminNavbar";
import { useAuctions } from "../hooks/useAuctions";
import { format, intervalToDuration, isBefore } from 'date-fns'; // Formatting dates

export default function AuctionDetailsPage() {
  const { id } = useParams();
  const [auction, setAuction] = useState(null);
  const { userRole } = useAuctions();
  const [bids, setBids] = useState([]);
  const [showBidForm, setShowBidForm] = useState(false);
  const [bidAmount, setBidAmount] = useState("");
  const [timeLeft, setTimeLeft] = useState('');

  const fetchBids = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/bids/auction/${id}`, {
        withCredentials: true,
      });
      setBids(res.data);
    } catch (err) {
      console.error("Error fetching bids:", err);
    }
  };

  useEffect(() => {
    const fetchAuction = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/auctions/${id}`, {
          withCredentials: true,
        });
        setAuction(res.data);
      } catch (error) {
        console.error("Failed to fetch auction:", error);
      }
    };

    fetchAuction();
    fetchBids();
  }, [id]);

  // Countdown timer
  useEffect(() => {
    if (!auction || !auction.endTime) return;

    const endTime = new Date(auction.endTime);

    const updateTimer = () => {
      const now = new Date();

      if (isBefore(endTime, now)) {
        setTimeLeft("Auction ended");
        return;
      }

      const duration = intervalToDuration({ start: now, end: endTime });
      const formatted = `${duration.hours}h ${duration.minutes}m ${duration.seconds}s`;
      setTimeLeft(formatted);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [auction]);

  const isAuctionActive = () => {
    const now = new Date();
    return new Date(auction.startTime) <= now && now <= new Date(auction.endTime);
  };

  const handleBidSubmit = async () => {
    if (!bidAmount || bidAmount <= 0) {
      alert("Enter a valid bid amount");
      return;
    }

    try {
      const res = await axios.post(
        `http://localhost:8080/api/bids/auction/${id}`,
        { amount: bidAmount,
          companyId: localStorage.getItem("userId") // Assuming userId is stored in localStorage
        },
        { withCredentials: true }
      );
      alert("Bid placed successfully!");
      setBidAmount("");
      fetchBids();
    } catch (error) {
      console.error("Error placing bid:", error);
      alert(error.response?.data?.message || "Failed to place bid");
    }
  };

  const formatTime = (iso) => new Date(iso).toLocaleString();

  if (!auction) return <div className="text-center mt-5">Loading auction...</div>;

  return (
    <>
      {userRole === "admin" && <AdminNavbar />}
      {userRole === "company" && <CompanyNavbar />}

      <div className="container my-4">
      

        {/* Countdown Timer */}
        {timeLeft && (
          <div className="text-center mb-4">
            <h5 className="fw-bold text-danger">Time left: {timeLeft}</h5>
          </div>
        )}

        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title">{auction.item_name}</h5>
            <p className="card-text"><strong>Type:</strong> {auction.type} Bid</p>
            <p className="card-text"><strong>Quantity:</strong> {auction.quantity}</p>
            <p className="card-text"><strong>Starting Price:</strong> ₹{auction.startingPrice}</p>
            <p className="card-text"><strong>Current Bid:</strong> ₹{auction.currentBid}</p>
            <p className="card-text"><strong>Start Time:</strong> {formatTime(auction.startTime)}</p>
            <p className="card-text"><strong>End Time:</strong> {formatTime(auction.endTime)}</p>
          </div>
        </div>

        {/* Bids Table */}
        <h4>Current Bids</h4>
        <table className="table table-striped mb-5">
          <thead>
            <tr>
              <th>Company</th>
              <th>Bid Amount</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            
            {bids.map((bid, index) => (
              <tr key={index} className={bid.winner ? "table-success fw-bold" : ""}>
                <td>
                  {bid.companyName}
                  {bid.winner && (
                    <span className="badge bg-success ms-2">Winner</span>
                  )}
                </td>
                <td>₹{bid.amount}</td>
                <td>{format(new Date(bid.bidTime), 'dd MMM yyyy, hh:mm a')}</td>
              </tr>
            ))}
          </tbody>

        </table>

        {/* Place Bid */}
        {userRole === "company" && isAuctionActive() && (
          <div className="mt-4">
            {!showBidForm ? (
              <button className="btn btn-outline-primary" onClick={() => setShowBidForm(true)}>
                Place a Bid
              </button>
            ) : (
              <div className="card p-4 mt-3">
                <h5>Submit Your Bid</h5>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleBidSubmit();
                    setShowBidForm(false);
                  }}
                >
                  <div className="mb-3">
                    <label className="form-label">Bid Amount (₹)</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Enter your bid"
                      value={bidAmount}
                      onChange={(e) => setBidAmount(e.target.value)}
                      required
                    />
                  </div>
                  <div className="d-flex gap-2">
                    <button type="submit" className="btn btn-primary">Submit Bid</button>
                    <button type="button" className="btn btn-secondary" onClick={() => setShowBidForm(false)}>
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
