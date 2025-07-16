import '../styles/Appointments.css';
import React, { useState, useEffect } from "react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedTime, setSelectedTime] = useState("");
  const [client, setClient] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    // Fetch all appointments for the selected date
    async function fetchAppointments() {
      try {
        const response = await fetch(`${API_URL}?date=${selectedDate.toISOString().split('T')[0]}`);
        if (!response.ok) throw new Error("Failed to fetch appointments");
        const data = await response.json();
        setAppointments(data);

        // Example: All possible times
        const allTimes = [
          "09:00", "10:00", "11:00", "12:00",
          "13:00", "14:00", "15:00", "16:00"
        ];
        // Remove times that are already booked
        const bookedTimes = data.map(appt => appt.time);
        setAvailableTimes(allTimes.filter(time => !bookedTimes.includes(time)));
      } catch (error) {
        console.error("Error fetching appointments:", error.message);
      }
    }
    fetchAppointments();
  }, [selectedDate]);

  const handleBook = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          client,
          phone,
          service,
          date: selectedDate.toISOString().split('T')[0],
          time: selectedTime
        }),
      });
      if (!response.ok) throw new Error("Failed to add appointment");
      setClient("");
      setPhone("");
      setService("");
      setSelectedTime("");
      // Refresh available times
      const data = await response.json();
      setAppointments([...appointments, data]);
    } catch (error) {
      console.error("Error adding appointment:", error.message);
    }
  };

return (
  <div className="appointments-container">
    <h1 className="page-title">Book an Appointment</h1>

    <div className="calendar-wrapper">
      <Calendar
        onChange={setSelectedDate}
        value={selectedDate}
        tileDisabled={({ date }) => date < new Date()}
        tileClassName={({ date }) => {
          if (appointments.find(appt => appt.date === date.toISOString().split('T')[0])) {
            return 'highlight-day';
          }
          return null;
        }}
      />
    </div>

    <div className="form-wrapper">
      <h3 className="selected-date">{selectedDate.toDateString()}</h3>
      {availableTimes.length === 0 ? (
        <p className="no-times">No available times for this day.</p>
      ) : (
        <form onSubmit={handleBook} className="appointment-form">
          <label>
            Time:
            <select value={selectedTime} onChange={e => setSelectedTime(e.target.value)} required>
              <option value="">Select a time</option>
              {availableTimes.map(time => (
                <option key={time} value={time}>{time}</option>
              ))}
            </select>
          </label>

          <label>
            Name:
            <input type="text" placeholder="Client Name" value={client} onChange={e => setClient(e.target.value)} required />
          </label>

          <label>
            Phone:
            <input type="tel" placeholder="Phone Number" value={phone} onChange={e => setPhone(e.target.value)} required />
          </label>

          <label>
            Service:
            <input type="text" placeholder="Service (e.g. Haircut, Color)" value={service} onChange={e => setService(e.target.value)} required />
          </label>

          <button type="submit" className="book-btn">Book Appointment</button>
        </form>
      )}
    </div>
  </div>
);

}
