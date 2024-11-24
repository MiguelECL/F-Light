import React from "react";
import FlightSearchResponse from "../interfaces/FlightSearchResponse";

export  const useGetResult = (results: FlightSearchResponse | undefined, 
    setResults: React.Dispatch<React.SetStateAction<FlightSearchResponse | undefined>>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setGoodRequest: React.Dispatch<React.SetStateAction<null | boolean>>) => {

    const searchResultURL = import.meta.env.VITE_GETRESULT_URL;

    fetch(searchResultURL, {
        method: "GET",
        headers: {
            "Content-Type":"applicaton/json"
        }
    }).then((response) => {
        if(response.ok){
            return response.text();
        }
    }).then((data) => {
        if(data != undefined ){
            var parsedResponse = JSON.parse(data)
            setResults(parsedResponse);
            setGoodRequest(true);
        } else {
            setGoodRequest(false);
        }
        return data;
    }).catch((error) => {
        console.log(error);
    })

}