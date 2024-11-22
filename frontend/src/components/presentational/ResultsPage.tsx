import { Box, Button, Container, Stack } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { sampleResponse } from "../../tests/SampleResponse";
import FlightOffer from "../../interfaces/FlightOffer";
import FlightSearchResponse from "../../interfaces/FlightSearchResponse";
import { OfferParser } from "../containers/OfferParser";
import FlightOfferResult from "./FlightOfferResult";
import OneWayFlightOfferResult from "./OneWayFlightOfferResult";
import ParsedOffer from "../../interfaces/ParsedOffer";
import { useRef, useState } from "react";
import { GetResult } from "../containers/getResult";

const ResultsPage = ({response}:{response?:string}) => {

    const [loading, setLoading] = useState(true);
    const location = useLocation();

    var parsedResponse:FlightSearchResponse;
    // If no response is given, parse the sample response to allow for testing, otherwise parse the provided response

    if(!response){
        const state = location.state;
        console.log(location.state);
        parsedResponse = JSON.parse(state);
        setLoading(false)
    } else {
        parsedResponse = JSON.parse(response);
        setLoading(false)
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
}

export default ResultsPage;