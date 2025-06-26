import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post("http://localhost:8080/api/auth/login", {
      username,
      password
    });

    const { role, id, message } = response.data;

    if (role === "admin") {
      // Save to localStorage
      localStorage.setItem("role", role);
      localStorage.setItem("userId", id);
      
      navigate("/admin/dashboard");
    } else if (role === "company") {
      // Save to localStorage
      localStorage.setItem("role", role);
      localStorage.setItem("userId", id);
      
      navigate(`/company/${id}/dashboard`);
    } else {
      alert("Login failed: " + message);
    }

  } catch (error) {
    console.error("Login error:", error);
    alert("Server error during login.");
  }
};

  return (
    <form onSubmit={handleLogin}>
      <input
        type="text"
        placeholder="Email or Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
}
