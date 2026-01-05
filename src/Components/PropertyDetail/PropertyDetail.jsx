import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import './PropertyDetail.css';

const PropertyDetail = ({ properties, addToFavourites }) => {
    const { id } = useParams();
    const navigate = useNavigate();

    const property = properties.find(p => p.id === id);
    const [mainImage, setMainImage] = useState(property ? (property.picture.startsWith('/') ? property.picture : `/${property.picture}`) : '');

    if (!property) {
        return <div className="error-msg">Property not found. <button onClick={() => navigate('/')}>Go Back</button></div>;
    }

    const getPath = (path) => path.startsWith('/') ? path : `/${path}`;
    const allImages = [getPath(property.picture), ...property.images.map(getPath), getPath(property.floorPlan)];

    return (
        <div className="property-detail-container">
            <button className="btn-back" onClick={() => navigate(-1)}>← Back to Results</button>

            <div className="detail-upper">

                <div className="gallery-section">
                    <div className="main-image-frame">
                        <img src={mainImage} alt={property.type} className="main-img" />
                    </div>
                    <div className="thumbnail-row">
                        {allImages.map((img, index) => (
                            <img key={index} src={img} alt={`Thumbnail ${index}`} className={`thumb ${mainImage === img ? 'active-thumb' : ''}`} onClick={() => setMainImage(img)} />
                        ))}
                    </div>
                </div>

                <div className="summary-section">
                    <h2>{property.location}</h2>
                    <h3 className="price">£{property.price.toLocaleString()}</h3>
                    <div className="tags">
                        <span className="tag">{property.type}</span>
                        <span className="tag">{property.bedrooms} Bedrooms</span>
                        <span className="tag">{property.tenure}</span>
                    </div>
                    <p className="short-desc">Located in {property.postcode}, this {property.type.toLowerCase()} was added on {property.added.day} {property.added.month} {property.added.year}.</p>
                    <button className="btn-add-fav-large" onClick={() => addToFavourites(property)}>❤ Save Property</button>
                </div>
            </div>


            <div className="tabs-container">
                <Tabs>
                    <TabList>
                        <Tab>Description</Tab>
                        <Tab>Floor Plan</Tab>
                        <Tab>Google Map</Tab>
                    </TabList>

                    <TabPanel>
                        <h3>Full Description</h3>
                        <p>{property.description}</p>
                    </TabPanel>

                    <TabPanel>
                        <div className="center-content">
                            <img src={property.floorPlan.startsWith('/') ? property.floorPlan : `/${property.floorPlan}`} alt="Floor Plan" className="floorplan-img"
                                onError={(e) => e.target.src = 'https://via.placeholder.com/600x400?text=Floor+Plan+Unavailable'} />
                        </div>
                    </TabPanel>

                    <TabPanel>
                        <div className="center-content">
                            <iframe title="Property Map" width="100%" height="400" style={{ border: 0 }} loading="lazy" allowFullScreen
                                src={`https://maps.google.com/maps?q=${encodeURIComponent(property.location)}&t=&z=13&ie=UTF8&iwloc=&output=embed`}>
                            </iframe>
                        </div>
                    </TabPanel>
                </Tabs>
            </div>
        </div>
    );
};

export default PropertyDetail;