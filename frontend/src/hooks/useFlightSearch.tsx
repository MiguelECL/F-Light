import { useState } from "react";
import FlightSearchResults from "../interfaces/FlightSearchResults";

const useFlightSearch = () => {

    const [data, setData] = useState<FlightSearchResults[]>([])

    //fetch data returned by API
    const backendURL = "http://localhost:7000/getResults";
    fetch(backendURL, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    }).then((response) => {
        return response.json();
    }).then((responseData) => {
        setData(responseData.data);
    }).catch((error) => {
        console.log(error);
    })

    return data;
}
 
export default useFlightSearch;