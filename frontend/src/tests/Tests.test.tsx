import { describe, test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import PageSearch from '../pages/SearchPage'
import App from '../App'
import ResultsPage from '../pages/ResultsPage'
import DetailsPage from '../pages/DetailsPage'
import React from 'react'

const RenderTest = (Page:React.ReactNode) => {
    test("Renders Page", () => {
        render(Page);
    });
}

describe("Test App EntryPoint", () => {
    RenderTest(<App />);

    test("NavBar in DOM", () => {
        expect(screen.getByText("About")).toBeInTheDocument();
    });
    screen.debug();
});

describe("Test Search Page", () => {
    RenderTest(<PageSearch/>);

    test("Expect Inputs to be in DOM", () => {
        expect(screen.getByText("Departure Airport")).toBeInTheDocument();
    });

    screen.debug();
});

describe("Test Results Page", () => {
    RenderTest(<ResultsPage/>);

    test("Expect Results to be in DOM", () => {

    });

    screen.debug();
});

describe("Test Details Page:", () => {
    RenderTest(<DetailsPage/>);

    test("Expect Detailed Info to be in DOM", () => {

    })

    screen.debug();
});