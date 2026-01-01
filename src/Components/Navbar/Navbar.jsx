import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-logo">
                    <NavLink to="/">Estate Agent</NavLink>
                </div>

                {/* Mobile Hamburger Icon */}
                <div className="menu-icon" onClick={toggleMenu}>
                    <i className={isOpen ? 'fas fa-times' : 'fas fa-bars'} />
                    <span className="hamburger-lines">
                        {isOpen ? "✕" : "☰"}
                    </span>
                </div>

                <ul className={isOpen ? 'navbar-menu active' : 'navbar-menu'}>
                    <li>
                        <NavLink
                            to="/"
                            className={({ isActive }) => isActive ? "active-link" : ""}
                            onClick={() => setIsOpen(false)}
                            end
                        >
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/properties"
                            className={({ isActive }) => isActive ? "active-link" : ""}
                            onClick={() => setIsOpen(false)}
                        >
                            Properties
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/favorites"
                            className={({ isActive }) => isActive ? "active-link" : ""}
                            onClick={() => setIsOpen(false)}
                        >
                            Favorites
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;