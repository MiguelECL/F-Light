import { describe, test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import ResultsPage from '../components/presentational/ResultsPage'
import DetailsPage from '../components/presentational/DetailsPage'
import { BrowserRouter } from 'react-router-dom'
import NavBar from '../components/presentational/NavBar'
import SearchPage from '../components/presentational/SearchPage'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

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
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <BrowserRouter>
                    <SearchPage />
                </BrowserRouter>
            </LocalizationProvider>
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
                <ResultsPage/>
            </BrowserRouter>
        );
        expect(screen.queryAllByText("Search", {exact: false})).toBeInTheDocument;
    });

    test("Render Single Container", () => {
        const { container } = render(
            <BrowserRouter>
                <ResultsPage />
            </BrowserRouter>
        )
        screen.debug();
        expect(container.getElementsByClassName("MuiContainer-root"))
    });

    test("Render Appropriate Containers", () => {
        const { container } = render(
            <BrowserRouter>
                <ResultsPage />
            </BrowserRouter>
        )
        expect(container.getElementsByClassName("MuiStack-root"));
    });
});

describe("Test Details Page", () => {
    
    test("Render Details Page"), () => {
        render(
            <BrowserRouter>
                <DetailsPage />
            </BrowserRouter>
        )
    };
});