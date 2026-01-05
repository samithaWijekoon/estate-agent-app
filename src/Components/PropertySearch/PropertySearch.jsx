import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from "react-datepicker";
import Select from 'react-select';
import "react-datepicker/dist/react-datepicker.css";
import './PropertySearch.css';

const PropertySearch = ({ properties, favourites, addToFavourites, removeFromFavourites, clearFavourites }) => {

    const navigate = useNavigate();
    const [filteredProps, setFilteredProps] = useState(properties);

    const [visibleCount, setVisibleCount] = useState(6);

    const [showFilters, setShowFilters] = useState(false);

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

    const typeOptions = [
        { value: 'Any', label: 'Any' },
        { value: 'House', label: 'House' },
        { value: 'Flat', label: 'Flat' }
    ];

    const priceOptions = [
        { value: '', label: 'No Min' },
        { value: '100000', label: '£100,000' },
        { value: '200000', label: '£200,000' },
        { value: '300000', label: '£300,000' },
        { value: '400000', label: '£400,000' },
        { value: '500000', label: '£500,000' },
        { value: '600000', label: '£600,000' },
        { value: '700000', label: '£700,000' },
        { value: '800000', label: '£800,000' },
        { value: '900000', label: '£900,000' },
        { value: '1000000', label: '£1,000,000' }
    ];

    const maxPriceOptions = [
        { value: '', label: 'No Max' },
        { value: '100000', label: '£100,000' },
        { value: '200000', label: '£200,000' },
        { value: '300000', label: '£300,000' },
        { value: '400000', label: '£400,000' },
        { value: '500000', label: '£500,000' },
        { value: '600000', label: '£600,000' },
        { value: '700000', label: '£700,000' },
        { value: '800000', label: '£800,000' },
        { value: '900000', label: '£900,000' },
        { value: '1000000', label: '£1,000,000' }
    ];

    const bedOptions = [
        { value: '', label: 'Any' },
        { value: '1', label: '1' },
        { value: '2', label: '2' },
        { value: '3', label: '3' },
        { value: '4', label: '4' },
        { value: '5', label: '5+' }
    ];

    const handleLoadMore = () => {
        setVisibleCount(prev => prev + 6);
    };


    const getMonthIndex = (monthName) => {
        const months = {
            January: 0, February: 1, March: 2, April: 3, May: 4, June: 5,
            July: 6, August: 7, September: 8, October: 9, November: 10, December: 11
        };
        return months[monthName] || 0;
    };

    const parseDate = (added) => {
        if (!added) return new Date(0);
        return new Date(added.year, getMonthIndex(added.month), added.day);
    };


    useEffect(() => {
        let result = properties || [];

        if (search.type !== 'Any') {
            result = result.filter(p => p.type === search.type);
        }

        if (search.query) {
            result = result.filter(p =>
                p.location.toLowerCase().includes(search.query.toLowerCase())
            );
        }

        if (search.minPrice) result = result.filter(p => p.price >= parseInt(search.minPrice));
        if (search.maxPrice) result = result.filter(p => p.price <= parseInt(search.maxPrice));

        if (search.minBeds) result = result.filter(p => p.bedrooms >= parseInt(search.minBeds));
        if (search.maxBeds) result = result.filter(p => p.bedrooms <= parseInt(search.maxBeds));

        if (search.postcode) {
            result = result.filter(p =>
                p.postcode.toLowerCase().includes(search.postcode.toLowerCase())
            );
        }

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


    const handleDragStart = (e, property) => {
        e.dataTransfer.setData("propertyId", property.id);
        e.dataTransfer.setData("type", "ADD_FAV");
    };

    const handleFavDragStart = (e, favId) => {
        e.dataTransfer.setData("favId", favId);
        e.dataTransfer.setData("type", "REMOVE_FAV");
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const type = e.dataTransfer.getData("type");
        if (type === "ADD_FAV") {
            const propId = e.dataTransfer.getData("propertyId");
            const property = properties.find(p => p.id === propId);
            if (property) addToFavourites(property);
        }
    };

    const handleRemoveDrop = (e) => {
        e.preventDefault();
        const type = e.dataTransfer.getData("type");
        if (type === "REMOVE_FAV") {
            const favId = e.dataTransfer.getData("favId");
            removeFromFavourites(favId);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };


    const handleSearchChange = (e) => {
        const { name, value } = e.target;
        setSearch(prev => ({ ...prev, [name]: value }));
    };


    const handleSelectChange = (selectedOption, actionMeta) => {
        setSearch(prev => ({ ...prev, [actionMeta.name]: selectedOption ? selectedOption.value : '' }));
    };

    const customSelectStyles = {
        control: (provided) => ({
            ...provided,
            borderRadius: '6px',
            borderColor: '#ddd',
            boxShadow: 'none',
            '&:hover': {
                borderColor: '#1d3557'
            }
        })
    };

    return (
        <div className="property-search-container">
            <button
                className="mobile-filter-toggle"
                onClick={() => setShowFilters(!showFilters)}
            >
                {showFilters ? 'Close Filters' : 'Filters'}
            </button>

            <div
                className="main-layout"
                onDrop={handleRemoveDrop}
                onDragOver={handleDragOver}
            >
                <aside className={`search-sidebar ${showFilters ? 'active' : ''}`}>
                    <h3>Filter Options</h3>
                    <form onSubmit={(e) => e.preventDefault()}>

                        <div className="form-group">
                            <label>Location Search</label>
                            <input
                                type="text" name="query" placeholder="e.g. London"
                                value={search.query} onChange={handleSearchChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Type</label>
                            <Select
                                name="type"
                                options={typeOptions}
                                value={typeOptions.find(opt => opt.value === search.type)}
                                onChange={handleSelectChange}
                                styles={customSelectStyles}
                            />
                        </div>

                        <div className="form-group">
                            <label>Price (£)</label>
                            <div className="row" style={{ flexDirection: 'column', gap: '5px' }}>
                                <Select
                                    name="minPrice"
                                    options={priceOptions}
                                    placeholder="Min Price"
                                    value={priceOptions.find(opt => opt.value === search.minPrice)}
                                    onChange={handleSelectChange}
                                    styles={customSelectStyles}
                                />
                                <Select
                                    name="maxPrice"
                                    options={maxPriceOptions}
                                    placeholder="Max Price"
                                    value={maxPriceOptions.find(opt => opt.value === search.maxPrice)}
                                    onChange={handleSelectChange}
                                    styles={customSelectStyles}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Bedrooms</label>
                            <div className="row" style={{ flexDirection: 'column', gap: '5px' }}>
                                <Select
                                    name="minBeds"
                                    options={bedOptions}
                                    placeholder="Min Beds"
                                    value={bedOptions.find(opt => opt.value === search.minBeds)}
                                    onChange={handleSelectChange}
                                    styles={customSelectStyles}
                                />
                                <Select
                                    name="maxBeds"
                                    options={bedOptions}
                                    placeholder="Max Beds"
                                    value={bedOptions.find(opt => opt.value === search.maxBeds)}
                                    onChange={handleSelectChange}
                                    styles={customSelectStyles}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Postcode</label>
                            <input type="text" name="postcode" placeholder="e.g. BR5" value={search.postcode} onChange={handleSearchChange} />
                        </div>

                        <div className="form-group">
                            <label>Date Added</label>
                            <small>After:</small>
                            <DatePicker
                                selected={search.dateAfter ? new Date(search.dateAfter) : null}
                                onChange={(date) => setSearch({ ...search, dateAfter: date ? date.toISOString().split('T')[0] : '' })}
                                placeholderText="Select start date"
                                className="date-picker-input"
                            />

                            <small>Before:</small>
                            <DatePicker
                                selected={search.dateBefore ? new Date(search.dateBefore) : null}
                                onChange={(date) => setSearch({ ...search, dateBefore: date ? date.toISOString().split('T')[0] : '' })}
                                placeholderText="Select end date"
                                className="date-picker-input"
                            />
                        </div>
                    </form>
                </aside>

                <main className="results-area">
                    <div className="results-header">
                        <h3>Properties Found: {filteredProps.length}</h3>
                    </div>

                    <div className="cards-grid">
                        {filteredProps.slice(0, visibleCount).map(property => (
                            <div
                                key={property.id}
                                className="property-card"
                                draggable="true"
                                onDragStart={(e) => handleDragStart(e, property)}
                            >
                                <div className="card-image">
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
                                        <button
                                            className="btn-view"
                                            onClick={() => navigate(`/property/${property.id}`)}
                                        >
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {visibleCount < filteredProps.length && (
                        <div className="load-more-container">
                            <button className="btn-load-more" onClick={handleLoadMore}>
                                Load More
                            </button>
                        </div>
                    )}
                </main>

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
                                    <li
                                        key={fav.id}
                                        className="fav-item"
                                        draggable="true"
                                        onDragStart={(e) => handleFavDragStart(e, fav.id)}
                                    >
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