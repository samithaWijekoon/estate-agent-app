import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = ({ properties }) => {
    const navigate = useNavigate();

    // Select 3 random properties for the 'Featured' section
    const featuredProperties = properties
        ? [...properties].sort(() => 0.5 - Math.random()).slice(0, 3)
        : [];

    return (
        <div className="home-container">
            {/* HERO SECTION */}
            <section className="hero">
                <div className="hero-content">
                    <h1>Find Your Dream Home</h1>
                    <p>Discover the perfect property from our exclusive collection.</p>
                    <button className="cta-button" onClick={() => navigate('/properties')}>
                        Browse Properties
                    </button>
                </div>
            </section>

            {/* FEATURED PROPERTIES */}
            <section className="featured-section">
                <h2>Featured Properties</h2>
                <div className="featured-grid">
                    {featuredProperties.map((property) => (
                        <div key={property.id} className="featured-card" onClick={() => navigate(`/property/${property.id}`)}>
                            <div className="featured-image-container">
                                <img
                                    src={property.picture}
                                    alt={property.type}
                                    onError={(e) => { e.target.src = 'https://via.placeholder.com/400x300?text=No+Image' }}
                                />
                                <span className="featured-badge">Featured</span>
                            </div>
                            <div className="featured-details">
                                <h3>{property.location}</h3>
                                <p className="featured-price">£{property.price.toLocaleString()}</p>
                                <div className="featured-meta">
                                    <span>{property.type}</span> • <span>{property.bedrooms} Beds</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="view-all-container">
                    <button className="secondary-button" onClick={() => navigate('/properties')}>
                        View All Properties
                    </button>
                </div>
            </section>
        </div>
    );
};

export default Home;