import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Button, Alert, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AllProducts.css';

const AllProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const firmId = localStorage.getItem("firmId");
                const response = await axios.get(`https://backend-nodejs-restaurent-register-apis.onrender.com/product/firmProducts/${firmId}`);
                const newProducts = response.data;
                setProducts(newProducts.products);
            } catch (error) {
                console.error("Error fetching products:", error);
                setError("Failed to fetch products");
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const handleDelete = async (productId) => {
        try {
            await axios.delete(`http://localhost:8080/product/delete/${productId}`);
            setProducts(products.filter(product => product._id !== productId));
            alert("Product deleted successfully");
        } catch (error) {
            console.error("Error deleting product:", error);
            setError("Failed to delete product");
        }
    };

    useEffect(() => {
        if (!loading && products.length === 0 && !error) {
            alert("There are no products. Please add products.");
        }
    }, [loading, products, error]);

    const renderStars = (isBestSeller) => {
        const rating = isBestSeller.toLowerCase() === 'yes' ? 4 : 2; // Change the rating based on bestSeller
        return [...Array(5)].map((star, index) => {
            return (
                <FontAwesomeIcon
                    key={index}
                    icon={faStar}
                    className={index < rating ? "text-warning" : "text-muted"}
                />
            );
        });
    };
    

    return (
        <div className="container" style={{ marginTop: "80px" }}>
            <h3 style={{ textAlign: "center" }}>All Products</h3>
            {error && <Alert variant="danger">{error}</Alert>}
            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
                    <Spinner animation="border" variant="primary" />
                </div>
            ) : (
                <div className="row">
                    {products.length === 0 ? (
                        <h3 style={{ textAlign: "center" }}>No products added</h3>
                    ) : (
                        products.map(product => (
                            <div className="col-md-4 mb-4" key={product._id}>
                                <Card className="product-card h-100">
                                    {product.image && <Card.Img variant="top" src={`http://localhost:8080/uploads/${product.image}`} />}
                                    <Card.Body className="d-flex flex-column">
                                        <Card.Title>{product.productName}</Card.Title>
                                        <Card.Text><strong>Description:</strong> {product.description}</Card.Text>
                                        <Card.Text><strong>Price:</strong> {product.price}</Card.Text>
                                        <Card.Text>
                                            <strong>Rating:</strong>
                                            <div>{renderStars(product.bestSeller)}</div>
                                        </Card.Text>
                                        <Button variant="danger" onClick={() => handleDelete(product._id)} className="mt-auto">Delete</Button>
                                    </Card.Body>
                                </Card>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default AllProducts;
