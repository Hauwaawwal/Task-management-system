import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import ReactCompareImage from 'react-compare-image';
import image from "./assets/capstone-1.jpeg";
import image1 from "./assets/capstone-2.jpeg";

function Home() {
  const navigate = useNavigate();

  return (
    <div>
      {/* navbar */}
      <nav className="home-navbar">
        <div className="home-profile">
          <img
            src="https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAxL3JtNjA5LXNvbGlkaWNvbi13LTAwMi1wLnBuZw.png"
            alt="Profile"
          />
        </div>
        <div className="home-center">
          <h1>Task Management System</h1>
        </div>
        <div>
          <button className="home-full-rounded" onClick={() => navigate('/login')}>
            <span>Login</span>
            <div className="home-border home-full-rounded"></div>
          </button>
        </div>
      </nav>
      <hr className="home-hr" />

      <div className="home-content">
        <div className="home-text-1">
          <h2>
            This brings all your tasks <br />& tools together...
          </h2>
        </div>
        <div className="home-text-2">
          <p>
            Task Management system makes your tasks easy,
            <br />
            And you can make your day more productive!
          </p>
        </div>
        <button className="home-button" onClick={() => navigate('/login')}>
          Signup For Free
          <svg fill="currentColor" viewBox="0 0 24 24" className="home-icon">
            <path
              clipRule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z"
              fillRule="evenodd"
            ></path>
          </svg>
        </button>
        {/* Image comparison slider */}
        <div className="home-image-comparison">
          <ReactCompareImage
            leftImage= {image}
            rightImage= {image1}
            sliderLineWidth={3}
            sliderLineColor="#000000"
          />
        </div>
        <div className="home-text-2">
          <p>
            Streamline task management effortlessly. Organize, prioritize, and
            track tasks seamlessly. Enhance productivity <br /> with intuitive
            features. Empower your workflow with our comprehensive system.
            Efficiently organize tasks <br /> with our intuitive system.
            Prioritize with drag-and-drop ease. Secure authentication ensures
            data privacy. Elevate <br />
            productivity with seamless task management.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;



