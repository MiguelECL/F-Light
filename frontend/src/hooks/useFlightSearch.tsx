import { FlightSearchParams } from "../interfaces/FlightSearchParams";

export const useFlightSearch = async (params: FlightSearchParams) => {
    // Function that calls the backend API to search for flights

    const backendURL = import.meta.env.VITE_FLIGHTSEARCH_URL;

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(params)
    }
    // fetch(backendURL, {
    //     method: "POST",
    //     headers: {"Content-Type": "application/json"},
    //     body: JSON.stringify(params)
    // }).then(response => {
    //     return response.json();
    // }).then(data => {
    //     return data;
    // }).catch(error => {
    //     console.log(error);
    // })

    try {
        const response = await fetch(backendURL, options);
        if (!response.ok) {
            throw new Error("Error");
        }
        const data = await response.json();
        return data;
    } catch(error) {
        console.error(error);
    }
}