import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div>
      <h1>This is an Error 404 page Page Not Found </h1>

      <h3>Go to the Home Page</h3>
      <Link to="/">Home</Link>
    </div>
  );
};

export default Error;
