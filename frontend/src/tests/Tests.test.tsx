import { describe, test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import PageSearch from '../pages/SearchPage'
import App from '../App'
import ResultsPage from '../pages/ResultsPage'
import DetailsPage from '../pages/DetailsPage'
import React from 'react'

const RenderTest = (Page:React.ReactNode) => {
    test("Renders Page", () => {
        render(Page)
    });
}

describe("Test App EntryPoint", () => {
    RenderTest(<App />);

    test("NavBar in DOM", () => {
        expect(screen.getByText("About")).toBeCalled();
    });
});

describe("Test Search Page", () => {
    RenderTest(<PageSearch/>);
});

describe("Test Resutls Page", () => {
    RenderTest(<ResultsPage/>);
});

describe("Test Details Page:", () => {
    RenderTest(<DetailsPage/>);
});