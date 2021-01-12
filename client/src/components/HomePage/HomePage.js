import React, { useState } from "react";
import "./HomePage.css";
import soccer from "./soccer.jpg";
function HomePage() {
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [message, setMessage] = useState("");
const handleSubmit = (e) => {
  e.preventDefault();
  alert(`Thank you for your feedBack ${name}`);
  setName("");
  setEmail("");
  setMessage("");
};
  return (
    <div className="HomePage">
      <header id="header">
        <div className="intro">
          <div className="overlay">
            <div className="container">
              <div className="row">
                <div className="col-md-8 col-md-offset-2 intro-text">
                  <h1>
                    <span style={{ color: "#fff", fontSize: "2rem" }}>
                      Reservi
                    </span>
                    <span style={{ color: "#75F336", fontSize: "2rem" }}>
                      Takwira
                    </span>
                    <span></span>
                  </h1>
                  <p>
                    Reserve a Terrain and play with your teammates , Be
                    competitive, stay healthy and most of all HAVE FUN
                  </p>
                  <a
                    href="#about"
                    className="btn btn-custom btn-lg page-scroll"
                  >
                    Learn More
                  </a>{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div id="about">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-6">
              {" "}
              <img src={soccer} className="img-responsive" alt="" />{" "}
            </div>
            <div className="col-xs-12 col-md-6">
              <div className="about-text">
                <h2>About Us</h2>
                <p>
                  {" "}
                  Fast and responsive way to reserve a Terrain to have a fun
                  time with your teammates.
                </p>
                <h3>Why Choose Us?</h3>
                <div className="list-style">
                  <div className="col-lg-6 col-sm-6 col-xs-12">
                    <ul>Fast Terrain Reservation</ul>
                    <ul>Satisfaction garanteed</ul>
                    <ul>Clean Terrains and well maintained</ul>
                    <ul>Referee included for a fair game</ul>
                    <ul>Free water served with reservations</ul>
                    <ul>Clean and neet showering Areas</ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="contact">
        <div className="container">
          <div className="col-md-8">
            <div className="row">
              <div className="section-title">
                <h2>Send FeedBack</h2>
                <p>
                  Please fill out the form below to send us an email containing
                  your feedBack,that will help us improve.
                </p>
              </div>
              <form name="sentMessage" id="contactForm" noValidate>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="text"
                        id="name"
                        className="form-control"
                        placeholder="Name"
                        required="required"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="email"
                        id="email"
                        className="form-control"
                        placeholder="Email"
                        required="required"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <textarea
                    name="message"
                    id="message"
                    className="form-control"
                    rows="4"
                    value={message}
                    placeholder="Message"
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  ></textarea>
                  <p className="help-block text-danger"></p>
                </div>
                <div id="success"></div>
                <button
                  type="submit"
                  className="btn btn-custom btn-lg"
                  onClick={(e) => handleSubmit(e)}
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
