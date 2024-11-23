import { Button, Container, Stack } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import FlightOffer from "../../interfaces/FlightOffer";
import FlightSearchResponse from "../../interfaces/FlightSearchResponse";
import { OfferParser } from "../containers/OfferParser";
import FlightOfferResult from "./FlightOfferResult";
import OneWayFlightOfferResult from "./OneWayFlightOfferResult";
import ParsedOffer from "../../interfaces/ParsedOffer";
import { useState } from "react";
import { sampleResponse } from "../../tests/SampleResponse";
import { useGetResult } from "../../Hooks/useGetResult";

const ResultsPage = ({response}:{response?:string}) => {

    const [loading, setLoading] = useState(true);
    const [results, setResults] = useState<FlightSearchResponse>()

    useGetResult(results, setResults, setLoading);

    var parsedResponse:FlightSearchResponse;
    // If no response is given, parse the sample response to allow for testing, otherwise parse the provided response

    if(response){
        parsedResponse = JSON.parse(response);
        setLoading(false)
    } else {
        parsedResponse = JSON.parse(sampleResponse);
    }

    if(results != undefined){
        parsedResponse = results;
        console.log(parsedResponse);
    }

    // Function that parses the response
    // Alternatively, I can do this in the backend and do a fetch...
    const navigate = useNavigate();

    const handleClick = (parsedOffer: ParsedOffer) => {
        navigate("/details", { state: {parsedOffer} });   // use react router to route to this page while providing props.
    }

    if(!loading) return (
        <Container maxWidth="lg" sx={{ marginTop: 20, overflow: "scroll" }}>
            <Button onClick={() => navigate("/")} variant="contained" fullWidth> &lt; Return to Search</Button>
            <Stack>
                {parsedResponse.data.map((offer: FlightOffer, index: number ) => {
                    const parsedOffer = OfferParser(offer, parsedResponse.dictionaries)
                    if(parsedOffer.oneWay == true)
                    return (
                        <FlightOfferResult key={index} offer={parsedOffer} handleClick={handleClick}/>
                    )
                    else return (
                        <OneWayFlightOfferResult key={index} offer={parsedOffer} handleClick={handleClick}/>
                    )
                })}
            </Stack>
        </Container>
    );
    else return (
        <h1>Loading</h1>
    )
}

export default ResultsPage;