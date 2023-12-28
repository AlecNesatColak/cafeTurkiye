import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className="container-fluid bg-light py-3">
      <ul className="list-inline text-center">
        <li className="list-inline-item"><Link to='privacy-policy'>Privacy policy</Link></li>
        <li className="list-inline-item"><a href="#">Terms of Service</a></li>
        <li className="list-inline-item"><a href="#">Help</a></li>
        <li className="list-inline-item"><a href="#">iPhone App</a></li>
        <li className="list-inline-item"><a href="#">Android App</a></li>
      </ul>
      <p className="text-muted text-center">&copy; Cafe Turkiye. All rights reserved.</p>
    </div>
  );
}

export default Footer;
