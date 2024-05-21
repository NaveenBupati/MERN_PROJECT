import React, { useState } from 'react';
import { Card, Form, Button, Col } from 'react-bootstrap';

const AddFirm = () => {
  const [formData, setFormData] = useState({
    firmName: '',
    area: '',
    category: [],
    region: [],
    offer: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData({
        ...formData,
        [name]: checked
          ? [...formData[name], value]
          : formData[name].filter((item) => item !== value),
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setFormData({
      ...formData,
      image: imageFile,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('loginToken');
    if (!token) {
      console.log("User not authenticated");
      return;
    }

    const formDataToSubmit = new FormData();
    formDataToSubmit.append('firmName', formData.firmName);
    formDataToSubmit.append('area', formData.area);
    formDataToSubmit.append('offer', formData.offer);

    formData.category.forEach((category) => {
      formDataToSubmit.append('category', category);
    });
    formData.region.forEach((region) => {
      formDataToSubmit.append('region', region);
    });

    formDataToSubmit.append('image', formData.image);

    try {
      const response = await fetch('http://localhost:8080/firm/addfirm', {
        method: 'POST',
        headers: {
          'token': token,
        },
        body: formDataToSubmit,
      });

      const responseData = await response.json();

      if (response.ok) {
        const firmId = responseData.firmId; // Adjust according to the actual key in the response
        console.log("Firm added successfully with ID:", firmId);
        // Store the firm ID in localStorage
        localStorage.setItem('firmId', firmId);
        alert('Firm added successfully');
        setFormData({
          firmName: '',
          area: '',
          category: [],
          region: [],
          offer: '',
          image: null,
        });
        document.getElementById('formImage').value = ''; // Reset the file input field
      } else if (responseData.message === "vendor can have only one firm") {
        alert("Firm exists, vendor can have only one firm");
      } else {
        alert("Failed to add firm");
      }
    } catch (error) {
      console.error('Error adding firm:', error.message);
    }
  };

  return (
    <div className="container container1">
      <div className="row justify-content-center">
        <Col sm={12} md={8} lg={6} style={{ marginTop: "80px" }}>
          <Card className="mt-3 mb-5 shadow">
            <Card.Body>
              <h2 className="text-center mb-4">Add Firm</h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formFirmName">
                  <Form.Label>Firm Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Firm Name"
                    name="firmName"
                    value={formData.firmName}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formArea">
                  <Form.Label>Area</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Area"
                    name="area"
                    value={formData.area}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formCategory">
                  <Form.Label>Category</Form.Label>
                  <div>
                    <Form.Check
                      inline
                      label="Veg"
                      type="checkbox"
                      name="category"
                      value="Veg"
                      checked={formData.category.includes('Veg')}
                      onChange={handleChange}
                    />
                    <Form.Check
                      inline
                      label="Non-veg"
                      type="checkbox"
                      name="category"
                      value="Non-veg"
                      checked={formData.category.includes('Non-veg')}
                      onChange={handleChange}
                    />
                  </div>
                </Form.Group>

                <Form.Group controlId="formRegion">
                  <Form.Label>Region</Form.Label>
                  <div>
                    <Form.Check
                      inline
                      label="South-Indian"
                      type="checkbox"
                      name="region"
                      value="South-Indian"
                      checked={formData.region.includes('South-Indian')}
                      onChange={handleChange}
                    />
                    <Form.Check
                      inline
                      label="North-Indian"
                      type="checkbox"
                      name="region"
                      value="North-Indian"
                      checked={formData.region.includes('North-Indian')}
                      onChange={handleChange}
                    />
                    <Form.Check
                      inline
                      label="Chinese"
                      type="checkbox"
                      name="region"
                      value="Chinese"
                      checked={formData.region.includes('Chinese')}
                      onChange={handleChange}
                    />
                    <Form.Check
                      inline
                      label="Bakery"
                      type="checkbox"
                      name="region"
                      value="Bakery"
                      checked={formData.region.includes('Bakery')}
                      onChange={handleChange}
                    />
                  </div>
                </Form.Group>

                <Form.Group controlId="formOffer">
                  <Form.Label>Offer</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Offer"
                    name="offer"
                    value={formData.offer}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group controlId="formImage">
                  <Form.Label>Image</Form.Label>
                  <Form.Control
                    type="file"
                    name="image"
                    onChange={handleImageChange}
                  />
                </Form.Group>

                <Button variant="primary" type="submit" block>
                  Submit
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </div>
    </div>
  );
};

export default AddFirm;
