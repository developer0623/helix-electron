import React from 'react';
import { Link, IndexLink } from 'react-router';

const Header = () => {
  return (
    <nav className="navbar navbar-default navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <a className="navbar-brand"  href="/#header">
            <img src={require('../../images/helix-logo.png')} />
          </a>
        </div>
        <div id="navbar" className="navbar-collapse collapse">
          <ul className="nav navbar-nav">
            <li className="nav-item" data-toggle="collapse" data-target="#navbar">
              <a className="nav-link" href="/#overview">Overview</a>
            </li>
            <li className="nav-item" data-toggle="collapse" data-target="#navbar">
              <a className="nav-link" href="/#features">Features</a>
            </li>
            <li className="nav-item" data-toggle="collapse" data-target="#navbar">
              <a className="nav-link" href="/#using">Using Helix</a>
            </li>
            <li className="nav-item" data-toggle="collapse" data-target="#navbar">
              <a className="nav-link" href="/#press-section">Press</a>
            </li>
            <li className="nav-item" data-toggle="collapse" data-target="#navbar">
              <a className="nav-link" href="/#start">Getting Started</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
