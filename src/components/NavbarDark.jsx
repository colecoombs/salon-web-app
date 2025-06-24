import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom'; // Add this import

function NavbarDark() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 shadow-md">
      <div className="flex items-center justify-between">
        <div><Link to="/" className="text-xl text-[#646cff] font-bold">Hairway to Heaven</Link></div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6">
          <li><Link to="/" className="hover:text-gray-300">Home</Link></li>
          <li><Link to="/appointments" className="hover:text-gray-300">Appointments</Link></li>
          <li><Link to="/contact" className="hover:text-gray-300">Contact</Link></li>
        </ul>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <ul className="flex flex-col space-y-2 mt-4 md:hidden">
          <li><Link to="/" className="block px-4 py-2 hover:bg-gray-800" onClick={() => setIsOpen(false)}>Home</Link></li>
          <li><Link to="/appointments" className="block px-4 py-2 hover:bg-gray-800" onClick={() => setIsOpen(false)}>Appointments</Link></li>
          <li><Link to="/contact" className="block px-4 py-2 hover:bg-gray-800" onClick={() => setIsOpen(false)}>Contact</Link></li>
        </ul>
      )}
    </nav>
  );
}

export { NavbarDark };