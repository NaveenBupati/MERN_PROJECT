import React from 'react';
import image from "../components/404.png"

const PageNotFound = () => {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 mt-5 text-center">
          <img src={image} alt="404 Image" className="img-fluid mb-4 " style={{width:"50%"}} />
          <p>Sorry, the page you are looking for does not exist.</p>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
