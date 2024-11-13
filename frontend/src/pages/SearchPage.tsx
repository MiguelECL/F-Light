import { Autocomplete, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useState } from "react";
import React from "react";
import { Dayjs } from "dayjs";

const SearchPage = () => {
    const [airportCode, SetAirportCode] = useState('');
    const [departureDate, setDepartureDate] = React.useState<Dayjs | null>(null);
    const [returnDate, setReturnDate] = React.useState<Dayjs | null>(null);
    const [currency, setCurrency] = useState("USD");

    const handleChange = (event: SelectChangeEvent) => {
        SetAirportCode(event.target.value as string);
    }

    const handleCurrencyChange = (event: SelectChangeEvent) => {
        setCurrency(event.target.value as string);
    }

    const options: Array<string> = [
        "one",
        "two",
        "three"
    ]

    return (
        <div>
            <Stack spacing={1}>
                <h1> Search Flights</h1>
                <Autocomplete clearOnEscape options={options} renderInput={(params) => <TextField {...params} label="Departure Airport" />} ></Autocomplete>
                <Autocomplete clearOnEscape options={options} renderInput={(params) => <TextField {...params} label="Arrival Airport" />}></Autocomplete>
                <DatePicker disablePast value={departureDate} onChange={(departureDate) => setDepartureDate(departureDate)} />
                <DatePicker disablePast value={returnDate} onChange={(returnDate) => setReturnDate(returnDate)} />
                <FormControl required fullWidth variant="filled">
                    <InputLabel>Currency</InputLabel>
                    <Select value={currency} label="currency" onChange={handleCurrencyChange}>
                        <MenuItem value={"USD"}>USD</MenuItem>
                        <MenuItem value={"MXN"}>MXN</MenuItem>
                        <MenuItem value={"EUR"}>EUR</MenuItem>
                    </Select>
                </FormControl>
            </Stack>
        </div>
    );
}

export default SearchPage;