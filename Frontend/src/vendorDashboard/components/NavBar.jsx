import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUserPlus ,faUtensils } from '@fortawesome/free-solid-svg-icons';
import logo from '../components/sgv.png'; // Import your logo image file

const NavBar = ({ showLoginHandler, showRegisterHandler, showWelcomeHandler, showLogOut, onLogout }) => {
    // Retrieve the restaurant name from localStorage
    const restaurantName = localStorage.getItem('firmName');

    return (
        <nav className="navbar navbar-expand-lg navbar-primary bg-primary" style={{ position: "fixed", top: 0, width: "100%", zIndex: 1000 }}>
            <div className="container">
                <span className="navbar-brand text-white d-flex align-items-center" onClick={showWelcomeHandler} >
                    <img src={logo} alt="Sigvvy Dashboard" style={{ maxHeight: '50px', cursor: "pointer" }} />
                    <span style={{ lineHeight: '50px', marginLeft: '10px', cursor: "pointer" }}>Dashboard</span>
                </span>

                <div className="navbar-collapse collapse justify-content-center" id="navbarNav">
                    {showLogOut && restaurantName && (
                        <span className="navbar-text text-white fw-400" style={{marginLeft:"150px"}}> <FontAwesomeIcon icon={faUtensils}/> {restaurantName}
                        </span>
                    )}
                </div>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        {showLogOut ? (
                            <li className="nav-item">
                                <span className="nav-link text-white" onClick={onLogout} style={{ cursor: 'pointer' }}>
                                    <FontAwesomeIcon icon={faUser} />
                                    <span> Logout</span>
                                </span>
                            </li>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <span className="nav-link text-white" onClick={showLoginHandler} style={{ cursor: 'pointer' }}>
                                        <FontAwesomeIcon icon={faUser} />
                                        <span> Login</span>
                                    </span>
                                </li>
                                <li className="nav-item">
                                    <span className="nav-link text-white" onClick={showRegisterHandler} style={{ cursor: 'pointer' }}>
                                        <FontAwesomeIcon icon={faUserPlus} /> Register
                                    </span>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
