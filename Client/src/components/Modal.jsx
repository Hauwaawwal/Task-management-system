import { useState, useEffect } from 'react';

// Function to get cookie by name
function getCookie(name) {
  let cookieArray = document.cookie.split('; ');
  console.log('Cookies:', cookieArray); 
  let cookie = cookieArray.find((row) => row.startsWith(name + '='));
  console.log('Retrieved cookie:', cookie); 
  return cookie ? cookie.split('=')[1] : "";
}

// Modal component
const Modal = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (isOpen) {
      const userCookie = getCookie("username");
      const emailCookie = getCookie("email");

      console.log('Username Cookie:', userCookie);
      console.log('Email Cookie:', emailCookie);

      if (userCookie) {
        setUsername(userCookie);
      } else {
        setUsername("");
      }
      if (emailCookie) {
        setEmail(emailCookie);
      } else {
        setEmail("");
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="main-modal">
      <center>
        <p>Name: {username || 'Please login'}</p>
        <p>Email: {email || 'Please login'}</p>
        <div className='modal-div'>
          <button onClick={onClose}>Home</button>
          <button>Logout</button>
        </div>
      </center>
      <br />
    </div>
  );
};

// Main component
const AccountDetails = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsModalOpen(true);
  };

  const handleMouseLeave = () => {
    setIsModalOpen(false);
  };

  return (
    <div 
      className="lol" 
      onMouseEnter={handleMouseEnter} 
      onMouseLeave={handleMouseLeave}
    >
      <img
        src="https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAxL3JtNjA5LXNvbGlkaWNvbi13LTAwMi1wLnBuZw.png"
        alt="Profile"
      />
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default AccountDetails;
