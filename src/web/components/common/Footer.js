import React from 'react';
import { Link, IndexLink } from 'react-router';

const Footer = () => {
  return (
    <footer>
      <div className="container footer">
        <div className="row align-items-center">
          <div id="footer-logo" className="col-md-3">
            <a href="http://www.askhelix.io" target="_blank">
              <img src={require('../../images/helix-logo-white.png')} />
            </a>
          </div>
          <div className="col-md-6">
            <h4>Company</h4>
            <ul className="nav">
              <li className="nav-item">
                <a href="/company/privacy-policy" className="nav-link">Privacy Policy</a>
              </li>
            </ul>
          </div>
          <div className="col-md-3">
            <h4>Connect With Us</h4>
            <div className="social-media-icon">
              <a href="https://www.facebook.com/AskHelix/" target="_blank">
                <i className="fa fa-facebook"></i>
              </a>
            </div>
            <div className="social-media-icon">
              <a href="https://twitter.com/ask_helix" target="_blank">
                <i className="fa fa-twitter"></i>
              </a>
            </div>
            <div className="social-media-icon">
              <a href="https://www.instagram.com/askhelix/" target="_blank">
                <i className="fa fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
