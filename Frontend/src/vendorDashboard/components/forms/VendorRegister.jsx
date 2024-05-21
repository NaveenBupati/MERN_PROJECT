import React, { useState } from 'react';
import { Card, Form, Button, Col, Spinner } from 'react-bootstrap'; // Import Spinner component from react-bootstrap
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
 

const VendorRegistration = ({showLoginHandler}) => {

  const [userName, setuserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {

      //'http://localhost:8080/vendor/register/ -- for local we should cors in backend
      const response = await fetch('https://backend-nodejs-restaurent-register-apis.onrender.com/vendor/register/', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({ userName, email, password })
      })
      const data = await response.json()
      if (response.ok) {
        console.log(data)
        alert(" Vendor Registered Sucessfully..");
        // Reset the input fields after successful registration
        //using props redirect to Login page after sucessfull registration
        setuserName('');
        setEmail('');
        setPassword('');
        showLoginHandler();
      }
    } catch (error) {
      console.error("Registration failed", error)
      alert("Registration failed")
    }
    finally {
      // Stop loading regardless of success or failure
      setLoading(false);
    }
  }
  
  return (
    <div className="container container1">
      <div className="row justify-content-center">
        <Col sm={12} md={8} lg={5} style={{ marginTop: "38px" }}>
          <Card className="mt-5 shadow">
            <Card.Body>
              <h2 className="text-center mb-4">Vendor Registration</h2>
              {error && <div className="alert alert-danger">{error}</div>}
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicuserName">
                  <Form.Label>userName</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter userName"
                    value={userName}
                    onChange={(e) => setuserName(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <div className="password-input d-flex ">
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <FontAwesomeIcon
                      icon={showPassword ? faEye : faEyeSlash}
                      onClick={handleTogglePassword}
                      className="eye-icon ml-2 mt-2"
                    />
                  </div>
                </Form.Group>

                <Button className="col-md-12 mt-3" variant="primary" type="submit" block disabled={loading}>
                  {loading ? (
                    <Spinner animation="border" size="sm" /> // Show spinner when loading
                  ) : (
                    'Register'
                  )}
                </Button>
              </Form>
              <div className="text-center mt-3">
                <h2>Existing user? </h2>
                <Button variant="link" onClick={showLoginHandler}>Click here to Login</Button>

              </div>
            </Card.Body>
          </Card>
        </Col>
      </div>
    </div>
  );
};

export default VendorRegistration;
