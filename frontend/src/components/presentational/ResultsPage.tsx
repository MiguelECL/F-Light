import { Button, Container, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import FlightOffer from "../../interfaces/FlightOffer";
import FlightSearchResponse from "../../interfaces/FlightSearchResponse";
import { OfferParser } from "../containers/OfferParser";
import FlightOfferResult from "./FlightOfferResult";
import OneWayFlightOfferResult from "./OneWayFlightOfferResult";
import ParsedOffer from "../../interfaces/ParsedOffer";
import { useEffect, useState } from "react";
import { sampleResponse } from "../../tests/SampleResponse";
import { useGetResult } from "../../Hooks/useGetResult";

const ResultsPage = ({response}:{response?:string}) => {

    const [loading, setLoading] = useState(true);
    const [parsedResponse, setParsedResponse] = useState<FlightSearchResponse>()
    const [goodRequest, setGoodRequest] = useState(false);

    const navigate = useNavigate();    // React Router navigation

    useGetResult(parsedResponse, setParsedResponse, setLoading, setGoodRequest);

    useEffect(() => {
        if (parsedResponse != undefined) {
            setLoading(false);
        } else {
            setParsedResponse(JSON.parse(sampleResponse));
        }
    },[parsedResponse])

    const handleClick = (parsedOffer: ParsedOffer) => {
        navigate("/details", { state: { parsedOffer } });   // use react router to route to this page while providing state.
    }

    if (!loading && parsedResponse != undefined) return (
        <Container maxWidth="lg" sx={{ marginTop: 20, overflow: "scroll" }}>
            <Button onClick={() => navigate("/")} variant="contained" fullWidth> &lt; Return to Search</Button>
            <Stack>
                {parsedResponse?.data.map((offer: FlightOffer, index: number) => {
                    const parsedOffer = OfferParser(offer, parsedResponse.dictionaries)
                    if (parsedOffer.oneWay == true)
                        return (
                            <FlightOfferResult key={index} offer={parsedOffer} handleClick={handleClick} />
                        )
                    else return (
                        <OneWayFlightOfferResult key={index} offer={parsedOffer} handleClick={handleClick} />
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