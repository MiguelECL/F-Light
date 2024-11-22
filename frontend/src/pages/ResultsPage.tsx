import { Box, Button, Container, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { sampleResponse } from "../tests/SampleResponse";
import FlightOffer from "../interfaces/FlightOffer";
import FlightSearchResponse from "../interfaces/FlightSearchResponse";
import { OfferParser } from "../components/containers/OfferParser";
import FlightOfferResult from "../components/presentational/FlightOfferResult";
import OneWayFlightOfferResult from "../components/presentational/OneWayFlightOfferResult";

const ResultsPage = () => {

    // const data = useFlightSearch(); //data is the results obtained from the fetch, an object array.
    const response: FlightSearchResponse = JSON.parse(sampleResponse);
    // Function that parses the response
    // Alternatively, I can do this in the backend and do a fetch...
    const navigate = useNavigate();

    const handleClick = (result: FlightOffer) => {
        navigate("/details", { state: result });   // use react router to route to this page while providing props.
    }

    return (
        <Container maxWidth="lg" sx={{ marginTop: 20 }}>
            <Button onClick={() => navigate("/")} variant="contained" fullWidth> &lt; Return to Search</Button>
            <Stack>
                {response.data.map((offer: FlightOffer, index: number ) => {
                    const parsedOffer = OfferParser(offer, response.dictionaries)
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