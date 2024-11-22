import { FlightSearchParams } from "../interfaces/FlightSearchParams";

export const useFlightSearch = (params: FlightSearchParams) => {
    // Function that calls the backend API to search for flights

    const backendURL:string = "http://localhost:7000/SearchFlights"

    fetch(backendURL, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(params)
    }).then(response => {
        return response.json();
    }).then(data => {
        return data;
    }).catch(error => {
        console.log(error);
    })
    
}