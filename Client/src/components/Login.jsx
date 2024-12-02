import './Login.css';
import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

axios.defaults.withCredentials = true;


//  Addded user authentication

const Login = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // login data
  const [email1, setEmail1] = useState("")
  const [password1, setPassword1] = useState("")

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    try {
      const response = await axios.post("http://localhost:3001/auth/login", {
        email:email1,
        password:password1,
      });
      console.log(password1, email1);
      console.log(response);
      navigate("/main")
    } catch (error) {
      console.error("An error occurred during login:", error);
      alert("Password incorrect !");
    } 
  };

  const handleSubmit2 = (e) => {
    e.preventDefault();

    axios.post("http://localhost:3001/auth/signup", {
      username,
      email,
      password
    })
    .then((response) => {
      console.log(password, email);
      if(response.data.status) {
        navigate("/main")
      } else {
        alert("Email already exists")
      }
    })
    .catch((err) => {
      console.log(err)
    })
  }

  return (
    <div className="section">
    <div className="container">
      <div className="row full-height justify-content-center">
        <div className="col-12 text-center align-self-center py-5">
          <div className="section pb-5 pt-5 pt-sm-2 text-center">
            <h6 className="mb-0 pb-3">
              <span>Log In </span>
              <span>Sign Up</span>
            </h6>
            <input
              className="checkbox"
              type="checkbox"
              id="reg-log"
              name="reg-log"
            />
            <label htmlFor="reg-log" />
            <div className="card-3d-wrap mx-auto">
              <div className="card-3d-wrapper">
                <div className="card-front">
                  <div className="center-wrap">
                    <div className="section text-center">
                      <h4 className="mb-4 pb-3">Log In</h4>
                      <div className="form-group">
                        <input
                          type="email"
                          name="logemail"
                          className="form-style"
                          placeholder="Your Email"
                          id="logemail"
                          autoComplete="off"
                          onChange={(e) => setEmail1(e.target.value)}
                        />
                        <i className="input-icon uil uil-at" />
                      </div>
                      <div className="form-group mt-2">
                        <input
                          type="password"
                          name="logpass"
                          className="form-style"
                          placeholder="Your Password"
                          id="logpass"
                          autoComplete="off"
                          onChange={(e) => setPassword1(e.target.value)}
                        />
                        <i className="input-icon uil uil-lock-alt" />
                      </div>
                      <a href="#" className="btn mt-4">
                        <button onClick={handleSubmit}>submit</button>
                        
                      </a>
                      <p className="mb-0 mt-4 text-center">
                        <a href="#0" className="link">
                          Forgot your password?
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="card-back">
                  <div className="center-wrap">
                    <div className="section text-center">
                      <h4 className="mb-4 pb-3">Sign Up</h4>
                      <div className="form-group">
                        <input
                          type="text"
                          name="logname"
                          className="form-style"
                          placeholder="Your Full Name"
                          id="logname"
                          autoComplete="off"
                          onChange={(e) => setUsername(e.target.value)}
                        />
                        <i className="input-icon uil uil-user" />
                      </div>
                      <div className="form-group mt-2">
                        <input
                          type="email"
                          name="logemail"
                          className="form-style"
                          placeholder="Your Email"
                          id="logemail"
                          autoComplete="off"
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        <i className="input-icon uil uil-at" />
                      </div>
                      <div className="form-group mt-2">
                        <input
                          type="password"
                          name="logpass"
                          className="form-style"
                          placeholder="Your Password"
                          id="logpass"
                          autoComplete="off"
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <i className="input-icon uil uil-lock-alt" />
                      </div>
                      <a href="#" className="btn mt-4">
                        <button onClick={handleSubmit2}>submit</button>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
}


export default Login;
