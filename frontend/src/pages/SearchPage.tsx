import { Autocomplete, Button, Checkbox, FormControl, FormControlLabel, Grid2, Input, InputLabel, MenuItem, Select, SelectChangeEvent, Slider, Stack, TextField, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { ChangeEvent, SyntheticEvent, useRef, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useNavigate } from "react-router-dom";
import { useFlightSearch } from "../Hooks/useFlightSearch";
import { ACSearchResult } from "../interfaces/ACSearchResult";

const SearchPage = () => {
    const [departureDate, setDepartureDate] = useState<Dayjs | null>(dayjs());
    const [returnDate, setReturnDate] = useState<Dayjs | null>(dayjs());
    const [currency, setCurrency] = useState("USD");
    const [numAdults, setNumAdults] = useState<number>(1);
    const [checked, setChecked] = useState(false);

    const navigate = useNavigate();

    const handleCurrencyChange = (event: SelectChangeEvent) => {
        setCurrency(event.target.value as string);
    }

    const handleSlider = (event: Event, newValue:number | number[]) => {
        setNumAdults(newValue as number);
    }

    const handleInputChange = ( event: ChangeEvent<HTMLInputElement>) => {
        let num = Number(event.target.value);
        if (num > 5){ 
            num = 5;
        }
        setNumAdults(num);
    }

    const handleCheckbox = (event: ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked)
    }

    // REFACTOR!    
    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();

        // var departureDateString = 
        // var returnDateString =

        const params = {
            departureAirport: departureAirport?.iataCode, 
            destinationAirport: arrivalAirport?.iataCode,
            departureDate: dayjs(departureDate).format("YYYY-MM-DD"),
            returnDate: dayjs(returnDate).format("YYYY-MM-DD"), 
            numAdults: numAdults,
            nonStop: checked,
            currencyCode: currency
        };

        useFlightSearch(params);
        navigate("/results");
    }

    const [options, setOptions] = useState<readonly ACSearchResult[]>([]);
    const [inputDepartureAirport, setInputDepartureAirport] = useState("");
    const [inputArrivalAirport, setInputArrivalAirport] = useState("");
    const [departureAirport, setDepartureAirport] = useState<ACSearchResult | null>(); // How to initialize an empty object?
    const [arrivalAirport, setArrivalAirport] = useState<ACSearchResult | null>();
    const lastCalledRef = useRef(0);

    // # REFACTOR
    const handleAutocomplete = (keyword: string, flag: number) => {
        if (flag == 0) {
            setInputDepartureAirport(keyword);
        } else {
            setInputArrivalAirport(keyword);
        }
        const now = Date.now();

        if (now - lastCalledRef.current < 1000 || keyword == "") {
            // If less than 2 seconds have passed, ignore.
            return
        }

        const backendURL = "http://localhost:7000/SearchAirportCity/" + [keyword];

        fetch(backendURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        }).then((response) => {
            if (response.ok) {
                return response.json();
            } else throw new Error("Server not Responding!")
        }).then((responseData) => {
            setOptions([...responseData.data])
        }).catch((error) => {
            console.error("Failed!", error.message)
        });

        lastCalledRef.current = now;
    }

    const handleClose = () => {
        setOptions([]);
    }

    return (
        <div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <form onSubmit={(e) => { handleSubmit(e) }}>
                    <Stack spacing={1}>
                        <h1> Search Flights</h1>
                        <Autocomplete clearOnEscape onClose={handleClose} isOptionEqualToValue={(option,value) => option.detailedName === value.name} getOptionLabel={(option:ACSearchResult) => option.name} options={options} value={departureAirport} onChange={(event: any, newValue: ACSearchResult | null) => setDepartureAirport(newValue)} inputValue={inputDepartureAirport} onInputChange={(event, newInputValue) => handleAutocomplete(newInputValue, 0)}  renderInput={(P) => <TextField {...P} required label="Departure Airport" />} ></Autocomplete>
                        <Autocomplete clearOnEscape onClose={handleClose} isOptionEqualToValue={(option,value) => option.detailedName === value.name} getOptionLabel={(option:ACSearchResult) => option.name} options={options} value={arrivalAirport} onChange={(event: any, newValue: ACSearchResult | null) => setArrivalAirport(newValue)} inputValue={inputArrivalAirport} onInputChange={(event, newInputValue) => handleAutocomplete(newInputValue, 1)} renderInput={(P) => <TextField {...P} required label="Arrival Airport" />}></Autocomplete>
                        <DatePicker defaultValue={dayjs()} minDate={dayjs()} value={departureDate} onChange={(departureDate) => setDepartureDate(departureDate)} />
                        <DatePicker disablePast value={returnDate} onChange={(returnDate) => setReturnDate(returnDate)} />
                        <Grid2 container spacing={2} sx={{ alignItems: 'center' }}>
                            <Grid2>
                                <Typography>Number of Adults: </Typography>
                            </Grid2>
                            <Grid2 size={5}>
                                <Slider defaultValue={1} valueLabelDisplay="auto" step={1} min={1} max={5} value={numAdults} onChange={handleSlider} />
                            </Grid2>
                            <Grid2>
                                <Input inputProps={{ type: "number", step: 1, min: 1, max: 5 }} size="small" value={numAdults} onChange={handleInputChange} />
                            </Grid2>
                        </Grid2>
                        <FormControlLabel control={<Checkbox checked={checked} onChange={handleCheckbox} />} label="Non-stop" />
                        <FormControl required fullWidth variant="filled">
                            <InputLabel>Currency</InputLabel>
                            <Select value={currency} label="currency" onChange={handleCurrencyChange}>
                                <MenuItem value={"USD"}>USD</MenuItem>
                                <MenuItem value={"MXN"}>MXN</MenuItem>
                                <MenuItem value={"EUR"}>EUR</MenuItem>
                            </Select>
                        </FormControl>
                        <Button type="submit" variant="contained">Search</Button>
                    </Stack>
                </form>
            </LocalizationProvider>
        </div>
    );
}

export default SearchPage;