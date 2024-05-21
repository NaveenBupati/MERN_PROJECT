import React, { useState } from 'react';
import { Card, Form, Button, Col } from 'react-bootstrap';

const AddProduct = () => {
  const [formData, setFormData] = useState({
    productName: '',
    price: '',
    category: [],
    image: null,
    bestSeller: '',  // updated to match backend schema
    description: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData((prevData) => ({
        ...prevData,
        [name]: checked
          ? [...prevData[name], value]
          : prevData[name].filter((item) => item !== value)
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value
      }));
    }
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      image: imageFile
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('loginToken');
    const firmId = localStorage.getItem("firmId");

    if (!token) {
      console.log("User not authenticated");
      alert("You are not authenticated. Please log in.");
      return;
    }

    if (!firmId) {
      console.log("User not registered firm");
      alert("Please add a Firm/Restaurant before adding products.");
      return;
    }

    const formDataToSubmit = new FormData();
    formDataToSubmit.append('productName', formData.productName);
    formDataToSubmit.append('price', formData.price);
    formData.category.forEach((category) => {
      formDataToSubmit.append('category', category);
    });
    formDataToSubmit.append('bestSeller', formData.bestSeller);  // updated to match backend schema
    formDataToSubmit.append('description', formData.description);
    formDataToSubmit.append('image', formData.image);

    try {
      const response = await fetch(`https://backend-nodejs-restaurent-register-apis.onrender.com/product/addProduct/${firmId}`, {
        method: 'POST',
        body: formDataToSubmit
      });

      if (response.ok) {
        console.log("Product added successfully");
        alert("Product added successfully");
        setFormData({
          productName: '',
          price: '',
          category: [],
          image: null,
          bestSeller: '',  // updated to match backend schema
          description: ''
        });
        document.getElementById('formImage').value = ''; // Reset the file input field
      } else {
        console.error('Failed to add product:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding product:', error.message);
    }
  };

  return (
    <div className="container container1" style={{ marginTop: "40px" }}>
      <div className="row justify-content-center">
        <Col sm={10} md={8} lg={6}>
          <Card className="mb-5 mt-5 shadow">
            <Card.Body>
              <h2 className="text-center mb-4">Add Product</h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formProductName">
                  <Form.Label>Product Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Product Name"
                    name="productName"
                    value={formData.productName}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formPrice">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter Price"
                    name="price"
                    value={formData.price}
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

                <Form.Group controlId="formImage">
                  <Form.Label>Image</Form.Label>
                  <Form.Control
                    type="file"
                    name="image"
                    onChange={handleImageChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formBestSeller">
                  <Form.Label>Best Seller</Form.Label>
                  <div>
                    <Form.Check
                      type="radio"
                      label="Yes"
                      name="bestSeller"  // updated to match backend schema
                      value="yes"
                      checked={formData.bestSeller === 'yes'}
                      onChange={handleChange}
                      inline
                    />
                    <Form.Check
                      type="radio"
                      label="No"
                      name="bestSeller"  // updated to match backend schema
                      value="no"
                      checked={formData.bestSeller === 'no'}
                      onChange={handleChange}
                      inline
                    />
                  </div>
                </Form.Group>

                <Form.Group controlId="formDescription">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Enter Description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Button className="col-md-12 mt-3" variant="primary" type="submit" block>
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

export default AddProduct;
