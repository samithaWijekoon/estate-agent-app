import React, { useState, useEffect } from 'react';
import './PropertySearch.css';
// Importing your JSON file. Adjust the path if your component is in a different folder.
// For example, if this file is in src/Components, and json is in src/Data:
import propertyData from '../../Data/properties.json';

const PropertySearch = () => {
    // Access the 'properties' array from your JSON structure
    const [properties] = useState(propertyData.properties);
    const [filteredProps, setFilteredProps] = useState(propertyData.properties);
    const [favourites, setFavourites] = useState([]);

    // Search Criteria State
    const [search, setSearch] = useState({
        type: 'Any',
        query: '',
        minPrice: '',
        maxPrice: '',
        minBeds: '',
        maxBeds: '',
        postcode: '',
        dateAfter: '',
        dateBefore: ''
    });

    // --- 1. DATE PARSING HELPER ---
    // Converts your JSON date format { month: "October", day: 12, year: 2022 } to JS Date
    const getMonthIndex = (monthName) => {
        const months = {
            January: 0, February: 1, March: 2, April: 3, May: 4, June: 5,
            July: 6, August: 7, September: 8, October: 9, November: 10, December: 11
        };
        return months[monthName] || 0;
    };

    const parseDate = (added) => {
        if (!added) return new Date(0); // Fallback
        return new Date(added.year, getMonthIndex(added.month), added.day);
    };

    // --- 2. SEARCH & FILTER LOGIC ---
    useEffect(() => {
        let result = properties;

        // Filter by Type
        if (search.type !== 'Any') {
            result = result.filter(p => p.type === search.type);
        }

        // Filter by Search Query (Location)
        if (search.query) {
            const lowerQuery = search.query.toLowerCase();
            result = result.filter(p =>
                p.location.toLowerCase().includes(lowerQuery)
            );
        }

        // Filter by Price
        if (search.minPrice) result = result.filter(p => p.price >= parseInt(search.minPrice));
        if (search.maxPrice) result = result.filter(p => p.price <= parseInt(search.maxPrice));

        // Filter by Bedrooms
        if (search.minBeds) result = result.filter(p => p.bedrooms >= parseInt(search.minBeds));
        if (search.maxBeds) result = result.filter(p => p.bedrooms <= parseInt(search.maxBeds));

        // Filter by Postcode (Case insensitive, partial match)
        if (search.postcode) {
            result = result.filter(p =>
                p.postcode.toLowerCase().includes(search.postcode.toLowerCase())
            );
        }

        // Filter by Date Added
        if (search.dateAfter) {
            const afterDate = new Date(search.dateAfter);
            result = result.filter(p => parseDate(p.added) >= afterDate);
        }
        if (search.dateBefore) {
            const beforeDate = new Date(search.dateBefore);
            result = result.filter(p => parseDate(p.added) <= beforeDate);
        }

        setFilteredProps(result);
    }, [search, properties]);

    // --- 3. FAVOURITES LOGIC ---
    const addToFavourites = (property) => {
        // Prevent duplicates [cite: 47]
        if (!favourites.find(fav => fav.id === property.id)) {
            setFavourites([...favourites, property]);
        }
    };

    const removeFromFavourites = (id) => {
        setFavourites(favourites.filter(fav => fav.id !== id));
    };

    const clearFavourites = () => {
        setFavourites([]);
    };

    // --- 4. DRAG & DROP HANDLERS ---
    const handleDragStart = (e, property) => {
        e.dataTransfer.setData("propertyId", property.id);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const propId = e.dataTransfer.getData("propertyId");
        const property = properties.find(p => p.id === propId);
        if (property) addToFavourites(property);
    };

    const handleDragOver = (e) => {
        e.preventDefault(); // Necessary to allow dropping
    };

    // Input Change Handler
    const handleSearchChange = (e) => {
        const { name, value } = e.target;
        setSearch(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="property-search-container">
            <header className="page-header">
                <h1>Find Your Dream Home</h1>
            </header>

            <div className="main-layout">

                {/* --- LEFT: SEARCH SIDEBAR --- */}
                <aside className="search-sidebar">
                    <h3>Filter Options</h3>
                    <form onSubmit={(e) => e.preventDefault()}>

                        <div className="form-group">
                            <label>Search</label>
                            <input
                                type="text"
                                name="query"
                                placeholder="Search location..."
                                value={search.query}
                                onChange={handleSearchChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Type</label>
                            <select name="type" value={search.type} onChange={handleSearchChange}>
                                <option value="Any">Any</option>
                                <option value="House">House</option>
                                <option value="Flat">Flat</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Price (£)</label>
                            <div className="row">
                                <input
                                    type="number" name="minPrice" placeholder="Min"
                                    value={search.minPrice} onChange={handleSearchChange}
                                />
                                <input
                                    type="number" name="maxPrice" placeholder="Max"
                                    value={search.maxPrice} onChange={handleSearchChange}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Bedrooms</label>
                            <div className="row">
                                <input
                                    type="number" name="minBeds" placeholder="Min"
                                    value={search.minBeds} onChange={handleSearchChange}
                                />
                                <input
                                    type="number" name="maxBeds" placeholder="Max"
                                    value={search.maxBeds} onChange={handleSearchChange}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Postcode</label>
                            <input
                                type="text" name="postcode" placeholder="e.g. BR5"
                                value={search.postcode} onChange={handleSearchChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Date Added</label>
                            <small>After:</small>
                            <input
                                type="date" name="dateAfter"
                                value={search.dateAfter} onChange={handleSearchChange}
                            />
                            <small>Before:</small>
                            <input
                                type="date" name="dateBefore"
                                value={search.dateBefore} onChange={handleSearchChange}
                            />
                        </div>
                    </form>
                </aside>

                {/* --- CENTER: RESULTS LIST --- */}
                <main className="results-area">
                    <div className="results-header">
                        <h3>Properties Found: {filteredProps.length}</h3>
                    </div>

                    <div className="cards-grid">
                        {filteredProps.map(property => (
                            <div
                                key={property.id}
                                className="property-card"
                                draggable="true"
                                onDragStart={(e) => handleDragStart(e, property)}
                            >
                                <div className="card-image">
                                    {/* Using the first image from the 'images' array or the 'picture' field */}
                                    <img
                                        src={property.picture}
                                        alt={property.type}
                                        onError={(e) => { e.target.src = 'https://via.placeholder.com/400x300?text=No+Image' }}
                                    />
                                </div>
                                <div className="card-details">
                                    <h4>{property.location}</h4>
                                    <p className="price">£{property.price.toLocaleString()}</p>
                                    <p className="desc">{property.description.substring(0, 100)}...</p>
                                    <div className="card-meta">
                                        <span>{property.type}</span> • <span>{property.bedrooms} Bed</span> • <span>{property.tenure}</span>
                                    </div>

                                    <div className="card-buttons">
                                        <button
                                            className="btn-fav"
                                            onClick={() => addToFavourites(property)}
                                            title="Add to Favourites"
                                        >
                                            ❤ Save
                                        </button>
                                        {/* Placeholder for future detailed view link */}
                                        <button className="btn-view">View Details</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </main>

                {/* --- RIGHT: FAVOURITES SIDEBAR --- */}
                <aside
                    className="favourites-sidebar"
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                >
                    <div className="fav-header">
                        <h3>Favourites</h3>
                        {favourites.length > 0 && (
                            <button className="btn-clear" onClick={clearFavourites}>Clear</button>
                        )}
                    </div>

                    <div className="fav-content">
                        {favourites.length === 0 ? (
                            <div className="empty-state">
                                <p>Drag properties here</p>
                                <p>or click "Save"</p>
                            </div>
                        ) : (
                            <ul className="fav-list">
                                {favourites.map(fav => (
                                    <li key={fav.id} className="fav-item">
                                        <div className="fav-info">
                                            <span className="fav-price">£{fav.price.toLocaleString()}</span>
                                            <span className="fav-loc">{fav.postcode}</span>
                                        </div>
                                        <button
                                            className="btn-remove-fav"
                                            onClick={() => removeFromFavourites(fav.id)}
                                            title="Remove"
                                        >
                                            &times;
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </aside>

            </div>
        </div>
    );
};

export default PropertySearch;