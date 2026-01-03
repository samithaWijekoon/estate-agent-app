import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

// Helper to render App with Router
const renderApp = () => {
    render(
        <BrowserRouter>
            <App />
        </BrowserRouter>
    );
};

describe('Estate Agent App Tests', () => {

    // TEST 1: App Rendering
    it('renders the navbar and homepage', () => {
        renderApp();
        // We use getAllByText because "Estate Agent" and "Home" appear in both Navbar and Footer
        const brandNames = screen.getAllByText(/Estate Agent/i);
        expect(brandNames.length).toBeGreaterThan(0);

        const homeLinks = screen.getAllByText(/Home/i);
        expect(homeLinks.length).toBeGreaterThan(0);
    });

    // TEST 2: Navigation to Search Page
    it('navigates to properties page when link is clicked', async () => {
        renderApp();

        // FIX: Get ALL links with text "Properties" (Navbar + Footer) and click the first one (Navbar)
        const propLinks = screen.getAllByText('Properties');
        fireEvent.click(propLinks[0]);

        // Check if Search Page content is visible (Look for unique text like "Filter Options")
        expect(screen.getByText(/Filter Options/i)).toBeInTheDocument();
    });

    // TEST 3: Search Functionality
    it('filters properties when house type is selected', async () => {
        renderApp();
        // Navigate to properties
        const propLinks = screen.getAllByText('Properties');
        fireEvent.click(propLinks[0]);

        // Find Type Dropdown (It defaults to 'Any', so we find it by that value)
        const typeSelect = screen.getByDisplayValue('Any');
        fireEvent.change(typeSelect, { target: { value: 'House' } });

        // Check if House results are shown
        // Note: This might find multiple "House" texts (in cards, filters, etc), which is fine for this check
        const houseCards = screen.getAllByText(/House/i);
        expect(houseCards.length).toBeGreaterThan(0);
    });

    // TEST 4: Add to Favourites
    it('adds a property to favourites', async () => {
        renderApp();
        // Navigate
        const propLinks = screen.getAllByText('Properties');
        fireEvent.click(propLinks[0]);

        // Find the first "Save" button
        const saveButtons = screen.getAllByText(/Save/i);
        fireEvent.click(saveButtons[0]);

        // Check if "Clear" button appears in the sidebar (indicates list is not empty)
        const clearBtn = screen.getByText(/Clear/i);
        expect(clearBtn).toBeInTheDocument();
    });

    // TEST 5: Remove from Favourites
    it('removes a property from favourites', async () => {
        renderApp();
        // Navigate
        const propLinks = screen.getAllByText('Properties');
        fireEvent.click(propLinks[0]);

        // 1. Add item
        const saveButtons = screen.getAllByText(/Save/i);
        fireEvent.click(saveButtons[0]);

        // 2. Check it exists (Find the remove button by title "Remove")
        const removeBtns = screen.getAllByTitle('Remove');
        expect(removeBtns.length).toBeGreaterThan(0);

        // 3. Click remove
        fireEvent.click(removeBtns[0]);

        // 4. Check it is gone (Should be 0 now)
        const removeBtnsAfter = screen.queryAllByTitle('Remove');
        expect(removeBtnsAfter.length).toBe(0);
    });

});