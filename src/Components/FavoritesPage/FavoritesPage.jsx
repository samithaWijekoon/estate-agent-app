import React from 'react';
import { useNavigate } from 'react-router-dom';
import './FavoritesPage.css';

const FavoritesPage = ({ favourites, removeFromFavourites, clearFavourites }) => {
    const navigate = useNavigate();

    return (
        <div className="favorites-page-container">
            <header className="fav-page-header">
                <h1>My Saved Properties</h1>
                {favourites.length > 0 && (
                    <button className="btn-clear-all" onClick={clearFavourites}>
                        Clear All
                    </button>
                )}
            </header>

            {favourites.length === 0 ? (
                <div className="no-favs">
                    <p>You haven't saved any properties yet.</p>
                    <button className="btn-go-search" onClick={() => navigate('/')}>
                        Start Searching
                    </button>
                </div>
            ) : (
                <div className="fav-grid">
                    {favourites.map(prop => (
                        <div key={prop.id} className="fav-card">
                            <img src={prop.picture} alt={prop.type} className="fav-card-img" />
                            <div className="fav-card-info">
                                <h3>{prop.location}</h3>
                                <p className="fav-price">£{prop.price.toLocaleString()}</p>
                                <div className="fav-actions">
                                    <button
                                        className="btn-view-details"
                                        onClick={() => navigate(`/property/${prop.id}`)}
                                    >
                                        View
                                    </button>
                                    <button
                                        className="btn-remove-item"
                                        onClick={() => removeFromFavourites(prop.id)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FavoritesPage;