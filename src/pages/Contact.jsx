import React, { useState } from 'react';
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Mail, Phone, MapPin, Clock, Scissors, Facebook, Instagram } from "lucide-react";

// Simple container
const Container = ({ children }) => (
  <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
);

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: 'loading', message: 'Sending message...' });

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to send message');
      }

      setStatus({ type: 'success', message: data.message || 'Message sent successfully!' });
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      console.error('Contact form error:', error);
      setStatus({ 
        type: 'error', 
        message: error.message || 'Failed to send message. Please try again or contact us directly.' 
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
              <a href="/appointments" className="hover:text-black/70">Book Now</a>
            </nav>
            <div className="flex items-center gap-3">
              <Button className="rounded-2xl" asChild>
                <a href="/appointments" className="inline-flex items-center">
                  <Phone className="mr-2 h-4 w-4"/>Call Now
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
              Get In Touch
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Ready to transform your look? We'd love to hear from you. Get in touch to schedule your appointment or ask any questions.
            </p>
          </div>
        </Container>
      </section>

      {/* Contact Information */}
      <section className="py-12 md:py-16">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Contact Details */}
              <Card className="rounded-2xl">
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-4">
                    <Phone className="h-5 w-5 text-gray-600" />
                    <div>
                      <p className="font-medium">Phone</p>
                      <a href="tel:5737142083" className="text-gray-600 hover:text-black">
                        (573) 714-2083
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <Mail className="h-5 w-5 text-gray-600" />
                    <div>
                      <p className="font-medium">Email</p>
                      <a href="mailto:info@hairwaytoheaven.com" className="text-gray-600 hover:text-black">
                        info@hairwaytoheaven.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <MapPin className="h-5 w-5 text-gray-600" />
                    <div>
                      <p className="font-medium">Address</p>
                      <p className="text-gray-600">3444 S Campbell<br />Springfield, MO</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <Clock className="h-5 w-5 text-gray-600" />
                    <div>
                      <p className="font-medium">Hours</p>
                      <p className="text-gray-600">
                        Mon–Fri: 9:00 AM – 7:00 PM<br />
                        Sat: 10:00 AM – 2:00 PM<br />
                        Sun: Closed
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Form */}
              <Card className="rounded-2xl">
                <CardHeader>
                  <CardTitle>Send us a Message</CardTitle>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4" onSubmit={handleSubmit}>
                    {status.message && (
                      <div className={`p-4 rounded-lg ${
                        status.type === 'success' ? 'bg-green-100 text-green-700' :
                        status.type === 'error' ? 'bg-red-100 text-red-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {status.message}
                      </div>
                    )}
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">
                        Your Name
                      </label>
                      <Input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">
                        Email Address
                      </label>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">
                        Phone Number
                      </label>
                      <Input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="(555) 123-4567"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">
                        Message
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black min-h-[120px] resize-vertical"
                        placeholder="Tell us about your hair goals or ask any questions..."
                        required
                      />
                    </div>
                    <Button 
                      type="submit" 
                      size="lg" 
                      className="w-full rounded-2xl"
                      disabled={status.type === 'loading'}
                    >
                      <Mail className="mr-2 h-4 w-4"/>
                      {status.type === 'loading' ? 'Sending...' : 'Send Message'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Social Media & Additional Info */}
            <div className="mt-12 text-center">
              <h3 className="text-xl font-semibold mb-6">Follow Us</h3>
              <div className="flex justify-center gap-4">
                <Button variant="outline" size="lg" className="rounded-2xl" asChild>
                  <a href="https://www.facebook.com/Hairway2HeavenSalon" target="_blank" rel="noopener noreferrer" className="inline-flex items-center">
                    <Facebook className="mr-2 h-4 w-4"/>
                    Hairway to Heaven Salon
                  </a>
                </Button>
                <Button variant="outline" size="lg" className="rounded-2xl" asChild>
                  <a href="#" className="inline-flex items-center">
                    <Instagram className="mr-2 h-4 w-4"/>
                    Instagram
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Call to Action */}
      <section className="py-12 md:py-16 bg-gray-50">
        <Container>
          <div className="text-center">
            <h3 className="text-2xl font-semibold mb-4">Ready to Book?</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Don't wait to get the hair you've always wanted. Book your appointment today and let us help you look and feel your best.
            </p>
            <Button size="lg" className="rounded-2xl" asChild>
              <a href="/appointments" className="inline-flex items-center">
                <Phone className="mr-2 h-5 w-5"/>
                Book Your Appointment
              </a>
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
}

export default Contact;
