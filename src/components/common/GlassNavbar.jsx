import React from 'react';
import PropTypes from 'prop-types';

const GlassNavbar = ({ brand, links }) => {
  return (
    <nav className="w-full bg-white/30 backdrop-blur-lg shadow-md p-4 flex justify-between items-center">
      <div className="text-white text-lg font-bold">{brand}</div>
      <ul className="flex gap-4">
        {links?.map((link, index) => (
          <li key={index} className="text-white/80 hover:text-white">
            {link}
          </li>
        ))}
      </ul>
    </nav>
  );
};

GlassNavbar.propTypes = {
  brand: PropTypes.string.isRequired,
  links: PropTypes.arrayOf(PropTypes.node).isRequired,
};

export default GlassNavbar;