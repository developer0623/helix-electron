import React from 'react';
import { Link, IndexLink } from 'react-router-dom';

class Footer extends React.Component {
  render() {
    return (
      <div className="footer">
        <div className="container pl-0 pr-0 ml-10 mr-10">
          <div className="row">
            <div className="col-md-4">
              <h5>COMPANY</h5>
              <ul className="list-unstyled">
                <li>About HelixAI</li>
                <li>Blog</li>
                <li>Press</li>
              </ul>
            </div>
            <div className="col-md-5">
              <h5>PRODUCTS & PRICING</h5>
              <ul className="list-unstyled">
                <li>For Laboratories & Researchers</li>
                <li>For Scientific Vendors</li>
                <li>For Scientific Membership Organizations</li>
              </ul>
            </div>
            <div className="col-md-3">
              <h5>SUPPORT</h5>
              <ul className="list-unstyled">
                <li>HelixAI Status</li>
                <li>Documentation</li>
                <li>Email support@helix.ai</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
