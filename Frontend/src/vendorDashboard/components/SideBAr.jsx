import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faBuilding, faList, faUsers, faBars } from '@fortawesome/free-solid-svg-icons';

const SideBar = ({ showFirmHandler, showProductHandler, showAllProductsHandler, showFirmTitle }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleSidebarToggle = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleClose = () => {
        setIsSidebarOpen(false);
    };

    return (
        <>
            {!isSidebarOpen && (
                <div style={{ marginTop: "50px", position: "fixed", top: "30px", left: "20px", zIndex: "9999" }}>
                    <FontAwesomeIcon 
                        icon={faBars} 
                        onClick={handleSidebarToggle} 
                        style={{ fontSize: "24px", cursor: "pointer" }} 
                    />
                </div>
            )}
            <div 
                className={`offcanvas offcanvas-start bg-light ${isSidebarOpen ? 'show' : ''}`} 
                id="sidebar" 
                style={{ width: "300px", visibility: isSidebarOpen ? 'visible' : 'hidden' }}
            >
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title">Menu</h5>
                    <button 
                        type="button" 
                        className="btn-close text-reset" 
                        onClick={handleClose} 
                        aria-label="Close"
                    ></button>
                </div>
                <div className="offcanvas-body">
                    <ul className="nav flex-column">
                        <li className="nav-item">
                            {showFirmTitle ? (
                                <span 
                                    className="nav-link text-dark sidebar-link mt-3" 
                                    onClick={showFirmHandler} 
                                    style={{ cursor: "pointer" }}
                                >
                                    <FontAwesomeIcon icon={faPlus} />
                                    <span>Add Firm</span>
                                </span>
                            ) : ""}
                        </li>
                        <li className="nav-item">
                            <span 
                                className="nav-link text-dark sidebar-link mt-4" 
                                onClick={showProductHandler} 
                                style={{ cursor: "pointer" }}
                            >
                                <FontAwesomeIcon icon={faBuilding} /> Add Product
                            </span>
                        </li>
                        <li className="nav-item">
                            <span 
                                className="nav-link text-dark sidebar-link mt-4" 
                                onClick={showAllProductsHandler} 
                                style={{ cursor: "pointer" }}
                            >
                                <FontAwesomeIcon icon={faList} /> All Products
                            </span>
                        </li>
                        <li className="nav-item">
                            <span className="nav-link text-dark sidebar-link mt-4">
                                <FontAwesomeIcon icon={faUsers} /> Users
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default SideBar;
