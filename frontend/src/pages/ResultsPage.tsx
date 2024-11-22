import { Box, Button, Container, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { sampleResponse } from "../tests/SampleResponse";
import FlightOffer from "../interfaces/FlightOffer";
import FlightSearchResponse from "../interfaces/FlightSearchResponse";
import { OfferParser } from "../components/containers/OfferParser";
import FlightOfferResult from "../components/presentational/FlightOfferResult";
import OneWayFlightOfferResult from "../components/presentational/OneWayFlightOfferResult";
import ParsedOffer from "../interfaces/ParsedOffer";

const ResultsPage = ({response}:{response?:string}) => {

    let parsedResponse: FlightSearchResponse;

    // If no response is given, parse the sample response to allow for testing, otherwise parse the provided response
    if (response != undefined){
        parsedResponse = JSON.parse(response);
    } else {
        parsedResponse = JSON.parse(sampleResponse);
    }
    // Function that parses the response
    // Alternatively, I can do this in the backend and do a fetch...
    const navigate = useNavigate();

    const handleClick = (parsedOffer: ParsedOffer) => {
        navigate("/details", { state: {parsedOffer} });   // use react router to route to this page while providing props.
    }

    return (
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