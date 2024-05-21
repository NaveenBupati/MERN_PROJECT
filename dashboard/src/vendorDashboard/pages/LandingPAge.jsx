import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import VendorLogin from '../components/forms/VendorLogin';
import VendorRegistration from '../components/forms/VendorRegister';
import SideBar from '../components/SideBAr'; // Corrected import
import AddFirm from '../components/forms/AddFirm';
import AddProduct from '../components/forms/AddProducts';
import Welcome from '../components/Welcome'; // Corrected import
import AllProducts from '../components/AllProducts';
 
 
 

const LandingPage = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showFirm, setShowFirm] = useState(false);
  const [showProduct, setShowProduct] = useState(false);
  const [showDashBoard, setShowDashBoard] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true); // Setting initial state to true for Welcome
  const [loggedIn, setLoggedIn] = useState(false);
  const [showAllProducts, setShowAllProducts] = useState(false); // Corrected variable name
  const [showLogOut, setShowLogOut] = useState(false);
  const [showFirmTitle, setShowFirmTitle]  = useState(true)

  useEffect(() => {
    // Check if token exists in local storage to determine if the user is logged in
    const loginToken = localStorage.getItem('loginToken');
    if (loginToken) {
      setShowLogOut(true);
      setLoggedIn(true);
    }

  }, []);

  
  useEffect(() => {
    // Check if token exists in local storage to determine if the user is logged in
    const firmName = localStorage.getItem('firmName');
    if (firmName) {
      setShowFirmTitle(false)
    }
    
  }, []);



  const showLoginHandler = () => {
    setShowLogin(true);
    setShowRegister(false);
    setShowFirm(false);
    setShowProduct(false);
    setShowWelcome(false); // Also hide Welcome when showing Login
    setShowAllProducts(false); // Also hide AllProducts when showing Login
  };

  const showRegisterHandler = () => {
    setShowLogin(false);
    setShowRegister(true);
    setShowFirm(false);
    setShowProduct(false);
    setShowWelcome(false); // Also hide Welcome when showing Register
    setShowAllProducts(false); // Also hide AllProducts when showing Register
  };

  const showAddFirmHandler = () => {
    if(showLogOut){
    setShowLogin(false);
    setShowRegister(false);
    setShowFirm(true);
    setShowProduct(false);
    setShowWelcome(false); // Also hide Welcome when showing Add Firm
    setShowAllProducts(false); // Also hide AllProducts when showing Add Firm
  }else{
    alert("plase login..")
    setShowLogin(true);
  }
}

  const showProductHandler = () => {
    if(showLogOut){
    setShowLogin(false);
    setShowRegister(false);
    setShowFirm(false);
    setShowProduct(true);
    setShowWelcome(false); // Also hide Welcome when showing Add Product
    setShowAllProducts(false); // Also hide AllProducts when showing Add Product
  }else{
    alert("plase login..")
    setShowLogin(true);
  }
  };

  const showDashBoardHandler = () => {
    setShowLogin(false);
    setShowRegister(false);
    setShowFirm(false);
    setShowProduct(false);
    setShowDashBoard(true);
    setShowWelcome(false); // Also hide Welcome when showing Dashboard
    setShowAllProducts(false); // Also hide AllProducts when showing Dashboard
  };

  const showWelcomeHandler = () => {
    setShowLogin(false);
    setShowRegister(false);
    setShowFirm(false);
    setShowProduct(false);
    setShowDashBoard(false);
    setShowWelcome(true);
    setShowAllProducts(false);
    window.location.reload()
   
  };

  const logoutHandler = () => {
    // Clear token from local storage
    localStorage.removeItem("loginToken");
    localStorage.removeItem("vendorId");
    localStorage.removeItem("firmId");
    localStorage.removeItem("userName")
    localStorage.removeItem("firmName")
    alert("Are you confirm to logout")
    setLoggedIn(false); // Set loggedIn state to false
    setShowLogOut(false);
    // Redirect to login page
    setShowLogin(false);
    setShowRegister(false);
    setShowFirm(false);
    setShowProduct(false);
    setShowDashBoard(false);
    setShowWelcome(true);
    setShowAllProducts(false); // Also hide AllProducts when logging out
    setShowFirmTitle(true)
    window.location.reload()
  };

  const showAllProductsHandler = () => {
    if(showLogOut){
    setShowLogin(false);
    setShowRegister(false);
    setShowFirm(false);
    setShowProduct(false);
    setShowDashBoard(false);
    setShowWelcome(false);
    setShowAllProducts(true);
  }else{
    alert("plase login..")
    setShowLogin(true);
  }
  };

  return (
    <>
      <section>
        <NavBar
          showWelcomeHandler={showWelcomeHandler} // Corrected prop passing
          showDashBoardHandler={showDashBoardHandler}
          showLoginHandler={showLoginHandler}
          showRegisterHandler={showRegisterHandler}
          showLogOut={showLogOut}
          onLogout={logoutHandler} // Pass the logout handler to NavBar
        />
        <div>
          <SideBar
            showFirmHandler={showAddFirmHandler}
            showProductHandler={showProductHandler}
            showAllProductsHandler={showAllProductsHandler} 
            showFirmTitle = {showFirmTitle}// Added showAllProductsHandler
          />
          {showLogin && <VendorLogin showWelcomeHandler={showWelcomeHandler} showRegisterHandler={showRegisterHandler} />}
          {showRegister && <VendorRegistration showLoginHandler={showLoginHandler} />}
          {showFirm && showLogOut && <AddFirm />}
          {showProduct && showLogOut && <AddProduct />}
          {showDashBoard && <NavBar />}
          {showWelcome && <Welcome onLogout={logoutHandler} showLoginHandler={showLoginHandler} />}
          {showAllProducts && showLogOut && <AllProducts />}
        
        </div>
      </section>
    </>
  );
};

export default LandingPage;
