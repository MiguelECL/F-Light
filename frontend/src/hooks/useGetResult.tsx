import React from "react";
import FlightSearchResponse from "../interfaces/FlightSearchResponse";

export async function useGetResult(
    setResults: React.Dispatch<React.SetStateAction<FlightSearchResponse | undefined>>,
    setGoodRequest: React.Dispatch<React.SetStateAction<null | boolean>>){

    const searchResultURL = import.meta.env.VITE_GETRESULT_URL;

    const response = await fetch(searchResultURL);
    const results = await response.json();
    setGoodRequest(true);
    setResults(results);
    // fetch(searchResultURL, {
    //     method: "GET",
    //     headers: {
    //         "Content-Type":"applicaton/json"
    //     }
    // }).then((response) => {
    //     if(response.ok){
    //         return response.text();
    //     }
    // }).then((data) => {
    //     if(data != undefined ){
    //         var parsedResponse = JSON.parse(data)
    //         setResults(parsedResponse);
    //         setGoodRequest(true);
    //     } 
    //     return data;
    // }).catch((error) => {
    //     console.log(error);
    // })

}