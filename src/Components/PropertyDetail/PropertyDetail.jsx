import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './PropertyDetail.css';

const PropertyDetail = ({ properties, addToFavourites }) => {
    const { id } = useParams();
    const navigate = useNavigate();

    // Find the specific property based on the URL ID
    const property = properties.find(p => p.id === id);

    // State for the Image Gallery
    const [mainImage, setMainImage] = useState(property ? property.picture : '');

    // State for Tabs
    const [activeTab, setActiveTab] = useState('description');

    if (!property) {
        return <div className="error-msg">Property not found. <button onClick={() => navigate('/')}>Go Back</button></div>;
    }

    // Combine main picture and extra images for the gallery
    const allImages = [property.picture, ...property.images];

    return (
        <div className="property-detail-container">
            <button className="btn-back" onClick={() => navigate(-1)}>← Back to Results</button>

            {/* --- UPPER SECTION: GALLERY & SUMMARY --- */}
            <div className="detail-upper">
                {/* Image Gallery */}
                <div className="gallery-section">
                    <div className="main-image-frame">
                        <img src={mainImage} alt={property.type} className="main-img" />
                    </div>
                    <div className="thumbnail-row">
                        {allImages.map((img, index) => (
                            <img
                                key={index}
                                src={img}
                                alt={`Thumbnail ${index}`}
                                className={`thumb ${mainImage === img ? 'active-thumb' : ''}`}
                                onClick={() => setMainImage(img)}
                            />
                        ))}
                    </div>
                </div>

                {/* Property Summary & Actions */}
                <div className="summary-section">
                    <h2>{property.location}</h2>
                    <h3 className="price">£{property.price.toLocaleString()}</h3>

                    <div className="tags">
                        <span className="tag">{property.type}</span>
                        <span className="tag">{property.bedrooms} Bedrooms</span>
                        <span className="tag">{property.tenure}</span>
                    </div>

                    <p className="short-desc">
                        Located in {property.postcode}, this {property.type.toLowerCase()}
                        was added on {property.added.day} {property.added.month} {property.added.year}.
                    </p>

                    <button
                        className="btn-add-fav-large"
                        onClick={() => addToFavourites(property)}
                    >
                        ❤ Save Property
                    </button>
                </div>
            </div>

            {/* --- LOWER SECTION: TABS --- */}
            <div className="tabs-container">
                <div className="tabs-header">
                    <button
                        className={`tab-btn ${activeTab === 'description' ? 'active' : ''}`}
                        onClick={() => setActiveTab('description')}
                    >
                        Description
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'floorplan' ? 'active' : ''}`}
                        onClick={() => setActiveTab('floorplan')}
                    >
                        Floor Plan
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'map' ? 'active' : ''}`}
                        onClick={() => setActiveTab('map')}
                    >
                        Google Map
                    </button>
                </div>

                <div className="tab-content">
                    {activeTab === 'description' && (
                        <div className="tab-pane">
                            <h3>Full Description</h3>
                            <p>{property.description}</p>
                        </div>
                    )}

                    {activeTab === 'floorplan' && (
                        <div className="tab-pane center-content">
                            <img src={property.floorPlan} alt="Floor Plan" className="floorplan-img"
                                onError={(e) => e.target.src = 'https://via.placeholder.com/600x400?text=Floor+Plan+Unavailable'} />
                        </div>
                    )}

                    {activeTab === 'map' && (
                        <div className="tab-pane center-content">
                            {/* Embedding Google Maps using the location string */}
                            <iframe
                                title="Property Map"
                                width="100%"
                                height="400"
                                style={{ border: 0 }}
                                loading="lazy"
                                allowFullScreen
                                src={`https://www.google.com/maps?q=${encodeURIComponent(property.location)}&output=embed`}
                            ></iframe>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PropertyDetail;