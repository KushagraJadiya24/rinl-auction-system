import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        { username, password },
        { withCredentials: true } // 👈 this is needed for cookies
      );

      const { role, id, name, message } = response.data;

      if (role === "admin") {
        localStorage.setItem(
        "user",
        JSON.stringify({ role: "admin", username: "rinladmin", userId: 1 })
      );
        navigate("/admin/dashboard");
      } else if (role === "company") {
        localStorage.setItem("role", role);
        localStorage.setItem("userId", id);
        localStorage.setItem("companyName", name); // 👈 name sent from backend
        console.log("Navigating to company dashboard with ID:", id);
        navigate(`/company/${id}/dashboard`);
      } else {
        alert("Login failed: " + message);
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Server error during login.");
    }
  };

  return (
    <div className="position-relative" style={{ minHeight: "100vh" }}>
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          backgroundImage: 'url("/bg.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.7,
          zIndex: 0,
        }}
      ></div>

      <div
        className="d-flex justify-content-center align-items-center vh-100 position-relative"
        style={{ zIndex: 1 }}
      >
        <div
          className="card shadow p-4"
          style={{
            width: "100%",
            maxWidth: "400px",
            backgroundColor: "rgba(255, 255, 255, 0.85)",
          }}
        >
          <div className="text-center mb-3">
            <img
              src={logo}
              alt="RINL Logo"
              style={{ width: "80px", height: "80px", objectFit: "contain" }}
            />
          </div>

          <h4 className="text-center mb-4">RINL Auction Portal</h4>

          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="form-label">Username or Email</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Login
            </button>

            <div className="d-flex justify-content-between mt-3">
              <span>New Company?</span>
              <button
                type="button"
                className="btn btn-outline-primary btn-sm"
                onClick={() => navigate("/register")}
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
