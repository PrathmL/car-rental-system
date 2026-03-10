import React from 'react';
import { Link } from 'react-router-dom';

const FooterLinks = ({ title, links }) => {
  return (
    <div className="mb-4">
      <h6 className="footer-heading">
        {title}
      </h6>
      <ul className="list-unstyled d-flex flex-column gap-3">
        {links.map((link, index) => (
          <li key={index}>
            <Link to={link.path} className="footer-link">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterLinks;
