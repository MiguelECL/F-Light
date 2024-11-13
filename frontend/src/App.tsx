import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import NavBar from './components/NavBar';
import About from './pages/About';
import SearchPage from './pages/SearchPage';
import ResultsPage from './pages/ResultsPage';
import DetailsPage from './pages/DetailsPage';

const App = () => {
    return (
        <div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <BrowserRouter>
                    <NavBar />
                    <Routes>
                        <Route path="/" element={<SearchPage />}></Route>
                        <Route path="/about" element={<About />}></Route>
                        <Route path="/results" element={<ResultsPage />}></Route>
                        <Route path="/details" element={<DetailsPage />}></Route>
                    </Routes>
                </BrowserRouter>
            </LocalizationProvider>
        </div>
    );
}
 
export default App;