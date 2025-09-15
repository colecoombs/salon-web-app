import React, { useState } from "react";
import '../styles/Admin.css';

const API_URL = import.meta.env.VITE_API_URL;

export default function Admin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (response.ok && data.token) {
        setToken(data.token);
        fetchAppointments(data.token);
      } else {
        setError("Invalid credentials");
      }
    } catch {
      setError("Server error");
    }
  };

  const fetchAppointments = async (jwt) => {
    try {
      const response = await fetch(`${API_URL}/appointments`, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      const data = await response.json();
      if (response.ok) {
        setAppointments(data);
      } else {
        setError("Failed to fetch appointments");
      }
    } catch {
      setError("Server error");
    }
  };

  if (!token) {
    return (
      <div className="admin-login-container">
        <h2>Admin Login</h2>
        <form onSubmit={handleLogin} className="admin-login-form">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
        {error && <div className="admin-error">{error}</div>}
      </div>
    );
  }

  return (
    <div className="admin-appointments-container">
      <h2>All Scheduled Appointments</h2>
      <table className="admin-appointments-table">
        <thead>
          <tr>
            <th>Client</th>
            <th>Phone</th>
            <th>Service</th>
            <th>Date</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map(appt => (
            <tr key={appt.id}>
              <td>{appt.client}</td>
              <td>{appt.phone}</td>
              <td>{appt.service}</td>
              <td>{appt.date}</td>
              <td>{appt.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {error && <div className="admin-error">{error}</div>}
    </div>
  );
}
