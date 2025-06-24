import '../styles/App.css';
import React from 'react';
import { NavbarDark } from '../components/NavbarDark.jsx';

function App() {

  return (
    <>
    <NavbarDark />
    <div className='app-main'>
      <div className='home'>
        <h2>Welcome!</h2>
      </div>
    </div>
    </>
  )
}

export default App
