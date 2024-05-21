import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';  // Ensure you import the Button component from react-bootstrap
import image from "../components/chef.png";

const Welcome = ({ showLoginHandler }) => {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Retrieve userName from localStorage
    const storedUserName = localStorage.getItem('userName');
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []); // Empty dependency array to run this effect only once on component mount

  // Function to generate a personalized welcome message
  const generateWelcomeMessage = () => {
    const greetings = ["Welcome", "Hello", "Greetings", "A warm welcome to you"];
    const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
    return `${randomGreeting}, ${userName ? userName : 'Guest'}! We're thrilled to have you here. Get ready to embark on an exciting journey with us!`;
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card mt-5" style={{ maxWidth: "500px", margin: "0 auto", boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)", backgroundColor: "#f8f9fa" }}>
            <div className="card-body text-center">
              <img 
                src={image} 
                alt="Welcome" 
                className="img-fluid mb-3 mx-auto" 
                style={{ maxWidth: "40%", height: "auto" }} 
              />
              <h3 className="card-title" style={{ fontSize: "1.5rem" }}>
                {generateWelcomeMessage()}
              </h3>
              {!userName && (
                <div className="text-center mt-3">
                  <span className="d-inline" style={{ color: '#6c757d' }}>Existing user?</span>
                  <Button 
                    variant="link" 
                    className="d-inline mb-1"
                    style={{ textDecoration: 'none', color: '#007bff', fontWeight: 'bold' }}
                    onMouseEnter={e => e.target.style.textDecoration = 'underline'}
                    onMouseLeave={e => e.target.style.textDecoration = 'none'}
                    onClick={showLoginHandler}
                  >
                    Click here to Login
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
