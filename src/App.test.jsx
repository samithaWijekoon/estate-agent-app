import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import App from './App';


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

        const brandNames = screen.getAllByText(/Estate Agent/i);
        expect(brandNames.length).toBeGreaterThan(0);

        const homeLinks = screen.getAllByText(/Home/i);
        expect(homeLinks.length).toBeGreaterThan(0);
    });

    // TEST 2: Navigation to Search Page
    it('navigates to properties page when link is clicked', async () => {
        renderApp();


        const propLinks = screen.getAllByText('Properties');
        fireEvent.click(propLinks[0]);


        expect(screen.getByText(/Filter Options/i)).toBeInTheDocument();
    });

    // TEST 3: Search Functionality
    it('filters properties when house type is selected', async () => {
        renderApp();

        const propLinks = screen.getAllByText('Properties');
        fireEvent.click(propLinks[0]);


        const typeSelect = screen.getByDisplayValue('Any');
        fireEvent.change(typeSelect, { target: { value: 'House' } });


        const houseCards = screen.getAllByText(/House/i);
        expect(houseCards.length).toBeGreaterThan(0);
    });

    // TEST 4: Add to Favourites
    it('adds a property to favourites', async () => {
        renderApp();

        const propLinks = screen.getAllByText('Properties');
        fireEvent.click(propLinks[0]);


        const saveButtons = screen.getAllByText(/Save/i);
        fireEvent.click(saveButtons[0]);


        const clearBtn = screen.getByText(/Clear/i);
        expect(clearBtn).toBeInTheDocument();
    });

    // TEST 5: Remove from Favourites
    it('removes a property from favourites', async () => {
        renderApp();

        const propLinks = screen.getAllByText('Properties');
        fireEvent.click(propLinks[0]);


        const saveButtons = screen.getAllByText(/Save/i);
        fireEvent.click(saveButtons[0]);


        const removeBtns = screen.getAllByTitle('Remove');
        expect(removeBtns.length).toBeGreaterThan(0);


        fireEvent.click(removeBtns[0]);


        const removeBtnsAfter = screen.queryAllByTitle('Remove');
        expect(removeBtnsAfter.length).toBe(0);
    });

});