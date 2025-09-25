import React, { useState, useEffect } from "react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../styles/Appointments.css';
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Calendar as CalendarIcon, Clock, User, Phone, Scissors } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

// Simple container
const Container = ({ children }) => (
  <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
);

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
    <div className="min-h-screen bg-white text-gray-900">
      {/* Top bar */}
      <div className="border-b bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/50 sticky top-0 z-40">
        <Container>
          <div className="flex h-16 items-center justify-between">
            <a href="/" className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-2xl bg-black text-white grid place-items-center">
                <Scissors className="h-5 w-5" />
              </div>
              <span className="text-xl font-semibold tracking-tight">Hairway to Heaven</span>
            </a>
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
              <a href="/" className="hover:text-black/70">Home</a>
              <a href="/contact" className="hover:text-black/70">Contact</a>
            </nav>
            <div className="flex items-center gap-3">
              <Button className="rounded-2xl" asChild>
                <a href="/appointments" className="inline-flex items-center">
                  <CalendarIcon className="mr-2 h-4 w-4"/>Book Now
                </a>
              </Button>
            </div>
          </div>
        </Container>
      </div>

      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 -z-10">
          <img
            src="/appointments_background3.png"
            alt="Salon background"
            className="h-[40vh] w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/60 to-transparent"/>
        </div>
        <Container>
          <div className="pt-24 pb-16 text-center">
            <h1 className="text-4xl/tight md:text-5xl/tight font-semibold tracking-tight">
              Book Your Appointment
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Select your preferred date and time, and we'll get you set up for your perfect salon experience.
            </p>
          </div>
        </Container>
      </section>

      {/* Booking Form */}
      <section className="py-12 md:py-16">
        <Container>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            {/* Calendar Section */}
            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5" />
                  Select Date & Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Calendar
                    onChange={setSelectedDate}
                    value={selectedDate}
                    tileDisabled={({ date }) => date < new Date()}
                    className="w-full"
                  />
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <Clock className="h-4 w-4 inline mr-2" />
                    {selectedDate.toDateString()}
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Available Times
                    </label>
                    <select
                      value={selectedTime}
                      onChange={e => setSelectedTime(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                      required
                    >
                      <option value="">Select a time</option>
                      {availableTimes.map(time => (
                        <option key={time} value={time}>{formatTime12h(time)}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Booking Form */}
            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Your Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleBook} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Full Name
                    </label>
                    <Input
                      type="text"
                      placeholder="Enter your name"
                      value={client}
                      onChange={e => setClient(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Phone Number
                    </label>
                    <Input
                      type="tel"
                      placeholder="(555) 123-4567"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Service Requested
                    </label>
                    <Input
                      type="text"
                      placeholder="e.g. Haircut, Color, Styling"
                      value={service}
                      onChange={e => setService(e.target.value)}
                      required
                    />
                  </div>
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full rounded-2xl"
                    disabled={!selectedTime}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4"/>
                    Book Appointment
                  </Button>
                  {message && (
                    <div className={`text-center p-3 rounded-lg ${
                      message.includes('Error') || message.includes('Could not') 
                        ? 'bg-red-50 text-red-600' 
                        : 'bg-green-50 text-green-600'
                    }`}>
                      {message}
                    </div>
                  )}
                </form>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>

      {/* Contact Info */}
      <section className="py-12 md:py-16 bg-gray-50">
        <Container>
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-4">Questions? Get in Touch</h3>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-gray-600">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <a href="tel:5737142083" className="hover:text-black">(573) 714-2083</a>
              </div>
              <div className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4" />
                <span>Mon–Fri 9–7, Sat 10–2</span>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
