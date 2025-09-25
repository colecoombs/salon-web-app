import '../styles/App.css';
import React, { useState } from 'react';
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
  const [modalImg, setModalImg] = useState(null);

  const pastWorks = [
    { img: work1, desc: "" },
    { img: work2, desc: "" },
    { img: work3, desc: "" },
    { img: work4, desc: "" },
    { img: work5, desc: "" },
    { img: work6, desc: "" },
    { img: work7, desc: "" },
    { img: work8, desc: "" },
    { img: work9, desc: "" },
    { img: work10, desc: "" },
    { img: work11, desc: "" },
    { img: work12, desc: "" }
  ];

  return (
    <>
      <div className='app-main'>
        <div className='home'>
          <h1>Welcome to Hairway to Heaven!</h1>
          <h2>Take a look at some of my past work!</h2>
        </div>
        <div className='gallery-wrapper'>
          <div className='gallery'>
            {pastWorks.map((img, index) => (
              <div key={index} className="gallery-item">
                <img
                  src={img.img}
                  alt={`Past work ${index + 1}`}
                  onClick={() => setModalImg(img.img)}
                  style={{ cursor: 'pointer', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }}
                  className="gallery-img"
                />
                <div className="gallery-desc">{img.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {modalImg && (
        <div className="modal-overlay" onClick={() => setModalImg(null)}>
          <div className="modal-content">
            <img src={modalImg} alt="Enlarged Picture" className='modal-img' />
          </div>
        </div>
      )}
    </>
  );
}

export default App
