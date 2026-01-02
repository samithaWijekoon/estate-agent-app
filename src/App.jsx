import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import PropertySearch from './Components/PropertySearch/PropertySearch';
import PropertyDetail from './Components/PropertyDetail/PropertyDetail';
import FavoritesPage from './Components/FavoritesPage/FavoritesPage';
import propertyData from './Data/properties.json';

const App = () => {
  // --- GLOBAL STATE ---
  // Load initial properties from JSON
  const [properties] = useState(propertyData.properties);
  // Manage favourites here so they persist when changing pages
  const [favourites, setFavourites] = useState([]);

  // --- GLOBAL HANDLERS ---
  const addToFavourites = (property) => {
    // Prevent duplicates
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

  return (
    <>
      <Navbar />
      <div className="app-content">
        <Routes>
          {/* SEARCH PAGE (HOME) */}
          <Route path="/" element={
            <PropertySearch
              properties={properties}
              favourites={favourites}
              addToFavourites={addToFavourites}
              removeFromFavourites={removeFromFavourites}
              clearFavourites={clearFavourites}
            />
          } />

          {/* PROPERTY DETAILS PAGE */}
          <Route path="/property/:id" element={
            <PropertyDetail
              properties={properties}
              addToFavourites={addToFavourites}
            />
          } />

          {/* FAVORITES PAGE */}
          <Route path="/favorites" element={
            <FavoritesPage
              favourites={favourites}
              removeFromFavourites={removeFromFavourites}
              clearFavourites={clearFavourites}
            />
          } />

          {/* Fallback for /properties to point to Home */}
          <Route path="/properties" element={
            <PropertySearch
              properties={properties}
              favourites={favourites}
              addToFavourites={addToFavourites}
              removeFromFavourites={removeFromFavourites}
              clearFavourites={clearFavourites}
            />
          } />
        </Routes>
      </div>
    </>
  );
}

export default App;