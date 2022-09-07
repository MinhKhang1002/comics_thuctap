import React from "react";
import "./footer.scss";

import { Link } from "react-router-dom";

import bg from "../../assets/footer-bg.jpg";
import logo from "../../assets/tmovie.png";
const Footer = () => {
  return (
    <div className="footer" style={{ backgroundImage: `url(${bg})` }}>
      <div className="footer__content container">
        <div className="footer__content logo">
          <img src={logo} />
          <Link to="/">Truyện Hay</Link>
        </div>
        <div className="footer__content__menus">
          <div className="footer__content__menu">
            <Link to="/">Home</Link>
            <Link to="/">Contact</Link>
            <Link to="/">Terms of services</Link>
            <Link to="/">About us</Link>
          </div>
          <div className="footer__content__menu">
            <a href="https://www.facebook.com/khang.khang.5496/">Facebook</a>
            <Link to="/">Contact</Link>
            <Link to="/">Terms of services</Link>
            <Link to="/">About us</Link>
          </div>
          <div className="footer__content__menu">
            <Link to="/">Home</Link>
            <Link to="/">Contact</Link>
            <Link to="/">Terms of services</Link>
            <Link to="/">About us</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
