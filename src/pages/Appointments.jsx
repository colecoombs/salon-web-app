import React, { useState, useEffect } from "react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../styles/Appointments.css';

const API_URL = import.meta.env.VITE_API_URL;

function getAvailableTimes(date) {
  // Set your time frames
  const weekdayStart = 9, weekdayEnd = 17; // 9am to 5pm
  const weekendStart = 10, weekendEnd = 14; // 10am to 2pm
  const day = date.getDay();
  const start = (day === 0 || day === 6) ? weekendStart : weekdayStart;
  const end = (day === 0 || day === 6) ? weekendEnd : weekdayEnd;
  const times = [];
  for (let h = start; h <= end; h++) {
    times.push(`${h.toString().padStart(2, '0')}:00`);
    if (h !== end) times.push(`${h.toString().padStart(2, '0')}:30`);
  }
  return times;
}

function formatTime12h(time) {
  // time is "HH:MM"
  let [hour, minute] = time.split(':').map(Number);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  hour = hour % 12 || 12;
  return `${hour}:${minute.toString().padStart(2, '0')} ${ampm}`;
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
        const response = await fetch(`${API_URL}/appointments/date/${selectedDate.toISOString().split('T')[0]}`);
        const data = await response.json();
        setAppointments(data);

        // Block out 2.5 hours after each booked time
        const allTimes = getAvailableTimes(selectedDate);
        let blocked = new Set();
        data.forEach(appt => {
          // Get index of booked time
          const bookedIdx = allTimes.findIndex(t => t === appt.time.slice(0,5));
          // Block this and next 4 slots (2.5 hours = 5 half-hours)
          for (let i = bookedIdx; i < bookedIdx + 5; i++) {
            if (allTimes[i]) blocked.add(allTimes[i]);
          }
        });
        const openTimes = allTimes.filter(time => !blocked.has(time));
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
            <option key={time} value={time}>{formatTime12h(time)}</option>
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
