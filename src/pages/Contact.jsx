import '../styles/Contact.css';
import React from 'react';

function Contact() {
  return (
    <div className='contact-main'>
      <div className='contact-content'>
        <h2>Contact Us</h2>
        <p>
          Email: <a href="mailto:info@hairwaytoheaven.com">info@hairwaytoheaven.com</a>
        </p>
        <p>
          Phone: <a href="tel:5551234567">(555) 123-4567</a>
        </p>
        <p>Address: 123 Salon St, City, State</p>
        {/* You can add a contact form here if desired */}
      </div>
    </div>
  );
}

export default Contact;
