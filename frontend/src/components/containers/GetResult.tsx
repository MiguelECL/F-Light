import { useRef, useState } from "react";
import FlightSearchResponse from "../../interfaces/FlightSearchResponse";

export  const GetResult = () => {
    const searchResultURL = "http://localhost:7000/GetResult"

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
        return data;
    }).catch((error) => {
        console.log(error);
    })

}