import '../styles/App.css';
import React from 'react';
import work1 from '../assets/past_works/work1.jpg'
import work2 from '../assets/past_works/work2.jpg'
import work3 from '../assets/past_works/work3.jpg'
import work4 from '../assets/past_works/work4.jpg'
import work5 from '../assets/past_works/work5.jpg'
import work6 from '../assets/past_works/work6.jpg'
import work7 from '../assets/past_works/work7.jpg'
import work8 from '../assets/past_works/work8.jpg'
import work9 from '../assets/past_works/work9.jpg'
import work10 from '../assets/past_works/work10.jpg'
import work11 from '../assets/past_works/work11.jpg'
import work12 from '../assets/past_works/work12.jpg'



function App() {
  const pastWorks = [
    { img: work1, desc: "Classic bob cut" },
    { img: work2, desc: "Modern highlights" },
    { img: work3, desc: "Elegant updo" },
    { img: work4, desc: "Men's fade" },
    { img: work5, desc: "Creative color" },
    { img: work6, desc: "Bridal styling" },
    { img: work7, desc: "Textured pixie" },
    { img: work8, desc: "Long layers" },
    { img: work9, desc: "Vintage curls" },
    { img: work10, desc: "Asymmetrical cut" },
    { img: work11, desc: "Beachy waves" },
    { img: work12, desc: "Bold undercut" }
  ];

  return (
    <>
    <div className='app-main'>
      <div className='home'>
        <h1>Welcome to Hairway to Heaven!</h1>
      </div>
      <div className='gallery'>
        {pastWorks.map((img, index) => (
          <div key={index} className="gallery-item">
            <img src={img.img} alt={`Past work ${index + 1}`} />
            <div className="gallery-desc">{img.desc}</div>
          </div>
        ))}
      </div>
    </div>
    </>
  )
}

export default App
