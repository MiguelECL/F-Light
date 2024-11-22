import { Route, Routes } from 'react-router-dom'

import NavBar from './components/presentational/NavBar';
import About from './components/presentational/About';
import SearchPage from './components/presentational/SearchPage';
import ResultsPage from './components/presentational/ResultsPage';
import DetailsPage from './components/presentational/DetailsPage';
import { Box } from '@mui/material';

const App = () => {
    return (
        <Box>
            <NavBar />
            <Routes>
                <Route path="/" element={<SearchPage />}></Route>
                <Route path="/about" element={<About />}></Route>
                <Route path="/results" element={<ResultsPage />}></Route>
                <Route path="/details" element={<DetailsPage />}></Route>
            </Routes>
        </Box>
    );
}

export default App;