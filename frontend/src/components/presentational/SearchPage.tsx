import { Autocomplete, Button, Checkbox, Container, FormControl, FormControlLabel, Grid2 as Grid, Input, InputLabel, MenuItem, Select, SelectChangeEvent, Slider, Stack, TextField, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { ChangeEvent, SyntheticEvent, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useNavigate } from "react-router-dom";
import { ACSearchResult } from "../../interfaces/ACSearchResult";
import { handleAutocomplete } from "../containers/handleAutocomplete";
import { useFlightSearch } from "../../Hooks/useFlightSearch";

const SearchPage = () => {
    const [departureDate, setDepartureDate] = useState<Dayjs | null>(dayjs());
    const [returnDate, setReturnDate] = useState<Dayjs | null>();
    const [currency, setCurrency] = useState("USD");
    const [numAdults, setNumAdults] = useState<number>(1);
    const [checked, setChecked] = useState(false);
    const [options, setOptions] = useState<readonly ACSearchResult[]>([]);
    const [inputDepartureAirport, setInputDepartureAirport] = useState("");
    const [inputArrivalAirport, setInputArrivalAirport] = useState("");
    const [departureAirport, setDepartureAirport] = useState<ACSearchResult | null>(); // How to initialize an empty object?
    const [arrivalAirport, setArrivalAirport] = useState<ACSearchResult | null>();

    const navigate = useNavigate();

    const handleCurrencyChange = (event: SelectChangeEvent) => {
        setCurrency(event.target.value as string);
    }

    const handleSlider = (_event: Event, newValue: number | number[]) => {
        setNumAdults(newValue as number);
    }

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        let num = Number(event.target.value);
        if (num > 5) {
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

        if (returnDate == null){
            var returnDateString = "";
        } else {
            var returnDateString = dayjs(returnDate).format("YYYY-MM-DD")
        }

        const params = {
            departureAirport: departureAirport?.iataCode,
            destinationAirport: arrivalAirport?.iataCode,
            departureDate: dayjs(departureDate).format("YYYY-MM-DD"),
            returnDate: returnDateString, 
            adults: numAdults,
            nonStop: checked,
            currencyCode: currency
        };

        useFlightSearch(params);
        navigate("/results", {state: params});
    }



    const handleClose = () => {
        setOptions([]);
    }

    const minDate = dayjs(departureDate?.format("YYYY-MM-DD"));

    return (
        <Container maxWidth="sm" sx={{ marginTop: 20 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <form onSubmit={(e) => { handleSubmit(e) }}>
                    <Stack spacing={1}>
                        <h1> Search Flights</h1>
                        <Autocomplete clearOnEscape onClose={handleClose} isOptionEqualToValue={(option, value) => option.detailedName === value.name}
                            getOptionLabel={(option: ACSearchResult) => option.name} options={options} value={departureAirport}
                            onChange={(_event: any, newValue: ACSearchResult | null) => setDepartureAirport(newValue)} inputValue={inputDepartureAirport}
                            onInputChange={(_event, newInputValue) => handleAutocomplete(newInputValue, 0, setInputDepartureAirport, setInputArrivalAirport, setOptions)}
                            renderInput={(P) => <TextField {...P} required label="Departure Airport" />} >
                        </Autocomplete>
                        <Autocomplete clearOnEscape onClose={handleClose} isOptionEqualToValue={(option, value) => option.detailedName === value.name}
                            getOptionLabel={(option: ACSearchResult) => option.name} options={options} value={arrivalAirport}
                            onChange={(_event: any, newValue: ACSearchResult | null) => setArrivalAirport(newValue)} inputValue={inputArrivalAirport}
                            onInputChange={(_event, newInputValue) => handleAutocomplete(newInputValue, 1, setInputDepartureAirport, setInputArrivalAirport, setOptions)} 
                            renderInput={(P) => <TextField {...P} required label="Arrival Airport" />}>
                        </Autocomplete>
                        <DatePicker minDate={dayjs()} value={departureDate} onChange={(departureDate) => setDepartureDate(departureDate)} />
                        <DatePicker disablePast minDate={minDate} value={returnDate} onChange={(returnDate) => setReturnDate(returnDate)} />
                        <Grid container spacing={2} sx={{ alignItems: 'center' }}>
                            <Grid size={4}>
                                <Typography>Number of Adults: </Typography>
                            </Grid>
                            <Grid size={6}>
                                <Slider defaultValue={1} valueLabelDisplay="auto" step={1} min={1} max={5} value={numAdults} onChange={handleSlider} />
                            </Grid>
                            <Grid size={2}>
                                <Input inputProps={{ type: "number", step: 1, min: 1, max: 5 }} size="small" value={numAdults} onChange={handleInputChange} />
                            </Grid>
                        </Grid>
                        <FormControlLabel control={<Checkbox checked={checked} onChange={handleCheckbox} />} label="Non-stop" />
                        <Grid container spacing={2}>
                            <Grid size="auto">
                            <FormControl required fullWidth variant="filled">
                                <InputLabel>Currency</InputLabel>
                                <Select value={currency} label="currency" onChange={handleCurrencyChange}>
                                    <MenuItem value={"USD"}>USD</MenuItem>
                                    <MenuItem value={"MXN"}>MXN</MenuItem>
                                    <MenuItem value={"EUR"}>EUR</MenuItem>
                                </Select>
                            </FormControl>
                            </Grid>
                            <Grid size="grow">
                                <Button fullWidth type="submit" variant="contained">Search</Button>
                            </Grid>
                        </Grid>
                    </Stack>
                </form>
            </LocalizationProvider>
        </Container>
    );
}

export default SearchPage;