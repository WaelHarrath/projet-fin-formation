import React from "react";
import { Button } from "react-bootstrap";

import { Link } from "react-router-dom";
import "./ErrorPage.css";
import errImg from "./errorImg.jpg";
function ErrorPage() {
  return (
    <div className="error-container">
      <img src={errImg} alt="error404" />
      <Link to="/">
        <Button className="btn">Go Home</Button>
      </Link>
    </div>
  );
}

export default ErrorPage;
