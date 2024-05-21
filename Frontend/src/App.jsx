import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./vendorDashboard/pages/LandingPAge";
// import SideBar from "./vendorDashboard/components/SideBAr";
// import VendorLogin from "./vendorDashboard/components/forms/VendorLogin";
// import VendorRegistration from "./vendorDashboard/components/forms/VendorRegister";
// import NavBar from "./vendorDashboard/components/NavBar";
// import AddFirm from "./vendorDashboard/components/forms/AddFirm";
// import AddProduct from "./vendorDashboard/components/forms/AddProducts";
// import Welcome from "./vendorDashboard/components/Welcome";
import PageNotFound from "./vendorDashboard/components/PageNotFound";

const App = () => {

  return (
    // <>
    //   <BrowserRouter>
    //     <NavBar /> {/* Render NavBar component outside the Routes */}
    //     <div className="d-flex"> {/* Use flexbox to keep NavBar and SideBar aligned */}
    //       <SideBar /> {/* Render SideBar component outside the Routes */}
    //       <Routes>
    //         {/* Define your routes here */}
            
    //         <Route path="/login" element={<VendorLogin />} />
    //         <Route path="/register" element={<VendorRegistration />} />
    //         <Route path="/add-firm" element={<AddFirm/>}/>
    //         <Route path="/add-product" element={<AddProduct/>}/>
    //         {/* Add more routes as needed */}
    //       </Routes>
    //     </div>
    //   </BrowserRouter>
     
    // </>

    //for single-page application using conditional rendering
    <>

   <BrowserRouter>
   <Routes>
    <Route path="/" element={<LandingPage/>}/>
    <Route path="/*" element={<PageNotFound/>}/>
   </Routes>
   </BrowserRouter>
 
    </>
  );
};

export default App;
