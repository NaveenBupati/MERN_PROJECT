import React, { useState } from 'react';
import { Card, Form, Button, Col, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const VendorLogin = ({ showWelcomeHandler, showRegisterHandler }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:8080/vendor/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      
      if (response.ok) {
        const user = data.user;
        const firm = user.firm && user.firm.length > 0 ? user.firm[0] : null;

        if (firm) {
          const firmId = firm._id;
          const firmName = firm.firmName || '';

          localStorage.setItem("firmName", firmName);
          localStorage.setItem("firmId", firmId);
        } else {
          localStorage.removeItem("firmName");
          localStorage.removeItem("firmId");
        }

        localStorage.setItem("loginToken", data.token);
        localStorage.setItem("vendorId", data.vendorId);
        localStorage.setItem("userName", user.userName);

        alert("Login success");
        showWelcomeHandler();
        setEmail('');
        setPassword('');

        const vendorId = data.vendorId;
        const vendorResponse = await fetch(`http://localhost:8080/vendor/singleVendor/${vendorId}`);
        const vendorData = await vendorResponse.json();

        if (vendorResponse.ok && vendorData.vendorFirmId) {
          localStorage.setItem("firmId", vendorData.vendorFirmId);
        }
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container container1" style={{ marginTop: "100px" }}>
      <div className="row justify-content-center">
        <Col sm={10} md={8} lg={5}>
          <Card className="mt-11 shadow" style={{ width: '100%' }}>
            <Card.Body>
              <h2 className="text-center mb-4">Vendor Login</h2>
              {error && <div className="alert alert-danger">{error}</div>}
              <Form onSubmit={handleSubmit}>
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
                  <div className="password-input d-flex">
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
                <Button className='col-md-12 mt-3' variant="primary" type="submit" block="true" disabled={loading}>
                  {loading ? (
                    <Spinner animation="border" size="sm" />
                  ) : (
                    "Login"
                  )}
                </Button>
              </Form>

              <div className="text-center mt-3">
                <h2>New user?</h2>
                <Button 
                  variant="link" 
                  className="d-inline mb-1"
                  style={{ textDecoration: 'none', color: '#007bff', fontWeight: 'bold' }}
                  onMouseEnter={e => e.target.style.textDecoration = 'underline'}
                  onMouseLeave={e => e.target.style.textDecoration = 'none'}
                  onClick={showRegisterHandler}
                >
                  Click here to register
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </div>
    </div>
  );
};

export default VendorLogin;
