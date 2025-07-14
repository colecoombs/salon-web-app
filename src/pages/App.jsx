import '../styles/App.css';
import React from 'react';
import { NavbarDark } from '../components/NavbarDark.jsx';
import work1 from '../assets/placeholder.jpg'
import work2 from '../assets/placeholder.jpg'
import work3 from '../assets/placeholder.jpg'
import work4 from '../assets/placeholder.jpg'
import work5 from '../assets/placeholder.jpg'
import work6 from '../assets/placeholder.jpg'


function App() {
  const pastWorks = [work1, work2, work3, work4, work5, work6];

  return (
    <>
    <div className='app-main'>
      <div className='home'>
        <h1>Welcome to Hairway to Heaven!</h1>
      </div>
      <div className='gallery'>
        {pastWorks.map((img, index) => (
          <img key={index} src={img} alt={`Past work ${index + 1}`} />
        ))}
      </div>
    </div>
    </>
  )
}

export default App
