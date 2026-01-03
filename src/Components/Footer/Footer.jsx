import React from 'react';
import { NavLink } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section brand">
                    <h2>Estate Agent</h2>
                    <p>Find your perfect home with us. Luxury properties, exclusive listings, and premium service.</p>
                </div>

                <div className="footer-section links">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><NavLink to="/">Home</NavLink></li>
                        <li><NavLink to="/properties">Properties</NavLink></li>
                        <li><NavLink to="/favorites">Favorites</NavLink></li>
                    </ul>
                </div>

                <div className="footer-section social">
                    <h3>Connect With Us</h3>
                    <div className="social-icons">
                        {/* Placeholders for icons - using text for now if no icon library is guaranteed, 
                            but assuming generic classes might be available or just styling div circles */}
                        <a href="#" className="social-icon">IG</a>
                        <a href="#" className="social-icon">FB</a>
                        <a href="#" className="social-icon">TW</a>
                        <a href="#" className="social-icon">LI</a>
                    </div>
                </div>

                <div className="footer-section newsletter">
                    <h3>Newsletter</h3>
                    <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
                        <input type="email" placeholder="Your email..." />
                        <button type="submit">Subscribe</button>
                    </form>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Samitha Bandara. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;