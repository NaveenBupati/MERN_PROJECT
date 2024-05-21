import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faUser, faUserPlus, faUtensils } from '@fortawesome/free-solid-svg-icons';
import logo from '../components/sgv.png'; // Import your logo image file

const NavBar = ({ showLoginHandler, showRegisterHandler, showWelcomeHandler, showLogOut, onLogout }) => {
    const [isToggled, setIsToggled] = useState(false);

    const restaurantName = localStorage.getItem('firmName');

    const toggleNavbar = () => {
        setIsToggled(!isToggled);
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-primary bg-primary" style={{ position: "fixed", top: 0, width: "100%", zIndex: 1000 }}>
            <div className="container d-flex justify-content-between align-items-center">
                <span className="navbar-brand text-white d-flex align-items-center" onClick={showWelcomeHandler} style={{ cursor: "pointer" }}>
                    <img src={logo} alt="Sigvvy Dashboard" style={{ maxHeight: '50px' }} />
                    <span>Dashboard</span>
                </span>

                <span className="navbar-text text-white fw-300 d-lg-none mx-auto" style={{ textAlign: "center" }}>
                    {showLogOut && restaurantName && (
                        <>
                            <FontAwesomeIcon icon={faUtensils} /> {restaurantName}
                        </>
                    )}
                </span>

                <button
                    className="navbar-toggler"
                    type="button"
                    onClick={toggleNavbar}
                    aria-controls="navbarNav"
                    aria-expanded={isToggled}
                    aria-label="Toggle navigation"
                >
                    <FontAwesomeIcon icon={isToggled ? faTimes : faBars} style={{ color: "white" }} />
                </button>

                <div className={`collapse navbar-collapse ${isToggled ? 'show' : ''}`} id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        {showLogOut ? (
                            <li className="nav-item">
                                <span className="nav-link text-white d-sm-block" onClick={onLogout} style={{ cursor: 'pointer'}}>
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

            {showLogOut && restaurantName && (
                <span className="navbar-text text-white fw-300 d-none d-lg-block mx-auto" style={{ position: "absolute", left: "50%", transform: "translateX(-50%)" }}>
                    <FontAwesomeIcon icon={faUtensils} /> {restaurantName}
                </span>
            )}
        </nav>
    );
};

export default NavBar;
