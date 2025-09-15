import React, { useState, useEffect } from "react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../styles/Appointments.css';

const API_URL = import.meta.env.VITE_API_URL;

function getAvailableTimes(date) {
  // Hardcoded rules: weekdays 9am-5pm, weekends 10am-2pm
  const weekdayTimes = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"];
  const weekendTimes = ["10:00", "11:00", "12:00", "13:00", "14:00"];
  const day = date.getDay();
  return (day === 0 || day === 6) ? weekendTimes : weekdayTimes;
}

export default function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedTime, setSelectedTime] = useState("");
  const [client, setClient] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function fetchAppointments() {
      try {
        const response = await fetch(`${API_URL}/appointments?date=${selectedDate.toISOString().split('T')[0]}`);
        const data = await response.json();
        setAppointments(data);
        // Filter out booked times
        const bookedTimes = data.map(appt => appt.time);
        const openTimes = getAvailableTimes(selectedDate).filter(time => !bookedTimes.includes(time));
        setAvailableTimes(openTimes);
      } catch (error) {
        setAvailableTimes(getAvailableTimes(selectedDate));
      }
    }
    fetchAppointments();
  }, [selectedDate]);

  const handleBook = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const response = await fetch(`${API_URL}/appointments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ client, phone, service, date: selectedDate.toISOString().split('T')[0], time: selectedTime }),
      });
      if (response.ok) {
        setMessage("Appointment requested! You'll be notified if accepted.");
        setClient(""); setPhone(""); setService(""); setSelectedTime("");
      } else {
        setMessage("Could not request appointment. Please try another time.");
      }
    } catch {
      setMessage("Error connecting to server.");
    }
  };

  return (
    <div className="appointments-container">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Book an Appointment</h2>
      <Calendar
        onChange={setSelectedDate}
        value={selectedDate}
        tileDisabled={({ date }) => date < new Date()}
      />
      <div className="selected-date">
        {selectedDate.toDateString()}
      </div>
      <form className="appointment-form" onSubmit={handleBook}>
        <select
          value={selectedTime}
          onChange={e => setSelectedTime(e.target.value)}
          required
        >
          <option value="">Select a time</option>
          {availableTimes.map(time => (
            <option key={time} value={time}>{time}</option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Client Name"
          value={client}
          onChange={e => setClient(e.target.value)}
          required
        />
        <input
          type="tel"
          placeholder="Phone Number"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Service (e.g. Haircut, Color)"
          value={service}
          onChange={e => setService(e.target.value)}
          required
        />
        <button type="submit">Book Appointment</button>
      </form>
      {message && <div style={{ color: '#fff', marginTop: '1rem' }}>{message}</div>}
    </div>
  );
}
