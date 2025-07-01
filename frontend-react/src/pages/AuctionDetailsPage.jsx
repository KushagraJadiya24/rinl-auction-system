import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, Table, Form, Button } from 'react-bootstrap';
import { useAuctions } from "../hooks/useAuctions";
import CompanyNavbar from "../components/Navbar/CompanyNavbar";
import AdminNavbar from "../components/Navbar/AdminNavbar";

const AuctionDetails = () => {
  const { id } = useParams();
  const { userRole } = useAuctions();
  // Demo auction detail (replace with API data later)
  const auction = {
    id,
    itemName: 'Steel Rods',
    description: 'High quality TMT steel rods',
    type: 'HIGHEST_BID',
    basePrice: 45000,
    quantity: 100,
    imageUrl: 'https://via.placeholder.com/150',
    startTime: '2025-07-01T10:00:00',
    endTime: '2025-07-03T10:00:00'
  };

  // Demo bids (later from backend)
  const bids = [
    { name: 'Company A', amount: 47000, time: '2025-07-01 11:00' },
    { name: 'Company B', amount: 48000, time: '2025-07-01 12:00' },
  ];

  const calculateTimeRemaining = () => {
    const end = new Date(auction.endTime);
    const now = new Date();
    const diff = end - now;

    if (diff <= 0) return 'Auction closed';
    const hrs = Math.floor(diff / 1000 / 60 / 60);
    const mins = Math.floor((diff / 1000 / 60) % 60);
    return `${hrs}h ${mins}m remaining`;
  };

  return (
    <>
    {userRole === "admin" && <AdminNavbar />}
    {userRole === "company" && <CompanyNavbar />}
    <div className="container mt-5">
      <Card>
        <Card.Body>
          <div className="d-flex">
            <img src={auction.imageUrl} alt="Item" width={200} className="me-4" />
            <div>
              <h3>{auction.itemName}</h3>
              <p>{auction.description}</p>
              <p><strong>Type:</strong> {auction.type}</p>
              <p><strong>Base Price:</strong> ₹{auction.basePrice}</p>
              <p><strong>Quantity:</strong> {auction.quantity}</p>
              <p><strong>Time Remaining:</strong> {calculateTimeRemaining()}</p>
            </div>
          </div>
        </Card.Body>
      </Card>

      <h4 className="mt-5">Current Bids</h4>
      <Table striped bordered className="mt-3">
        <thead>
          <tr>
            <th>Bidder</th>
            <th>Amount</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {bids.map((bid, index) => (
            <tr key={index}>
              <td>{bid.name}</td>
              <td>₹{bid.amount}</td>
              <td>{bid.time}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <h5 className="mt-5">Place Your Bid</h5>
      <Form className="mt-3">
        <Form.Group controlId="bidAmount">
          <Form.Label>Bid Amount</Form.Label>
          <Form.Control type="number" placeholder="Enter your bid" />
        </Form.Group>
        <Button variant="primary" className="mt-3">Submit Bid</Button>
      </Form>
    </div>
    </>
  );
};

export default AuctionDetails;
