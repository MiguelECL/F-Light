import { describe, test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import PageSearch from '../pages/SearchPage'
import App from '../App'
import ResultsPage from '../pages/ResultsPage'
import DetailsPage from '../pages/DetailsPage'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import NavBar from '../components/presentational/NavBar'
import SearchPage from '../pages/SearchPage'
import { sampleResponse } from './SampleResponse'
import { Stack } from '@mui/material'

describe("Test NavBar", () => {

    test("NavBar Links", () => {
        render(
            <BrowserRouter>
                <NavBar/>
            </BrowserRouter>
        )
        expect(screen.getByText("F-Light")).toBeInTheDocument();
        expect(screen.getByText("About")).toBeInTheDocument();
    });
});

describe("Test Search Page", () => {

    test("Render All Fields", () => {
        render(
            <BrowserRouter>
                <SearchPage />
            </BrowserRouter>
        )
        expect(screen.getByText("Departure Airport")).toBeInTheDocument();
        expect(screen.getByText("Arrival Airport")).toBeInTheDocument();
        expect(screen.getByText("Number of Adults:")).toBeInTheDocument();
        expect(screen.getByText("Non-stop")).toBeInTheDocument();
        expect(screen.getByText("Currency")).toBeInTheDocument();
        expect(screen.getByText("Search")).toBeInTheDocument();
    })
});

describe("Test Results Page", () => {

    test("Render Return Button",()=>{
        render(
            <BrowserRouter>
                <ResultsPage />
            </BrowserRouter>
        );
        expect(screen.getAllByText("Search", {exact: false})).toBeInTheDocument;
    });

    test("Render Single Container", () => {
        const { container } = render(
            <BrowserRouter>
                <ResultsPage />
            </BrowserRouter>
        )
        screen.debug();
        expect(container.getElementsByClassName("MuiContainer-root").length).toBe(1)
    });

    test("Render Appropriate Containers", () => {
        const { container } = render(
            <BrowserRouter>
                <ResultsPage />
            </BrowserRouter>
        )
        expect(container.getElementsByClassName("MuiStack-root").length).toBe(3);
    });
});

describe("Test Details Page", () => {
    
    test(("Render Return Button"), () => {
        render(
            <BrowserRouter>
                <DetailsPage />
            </BrowserRouter>
        )
        screen.debug();
        expect(screen.getByText("Return"));
    })

    test(("Render Information"), () => {
        render(
            <BrowserRouter>
                <DetailsPage />
            </BrowserRouter>
        )
        screen.debug();
        expect(screen.getAllByText("Segment", {exact: false}).length).toBe(2);
    })
});