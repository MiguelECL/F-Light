import { Button, Container, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import FlightOffer from "../../interfaces/FlightOffer";
import FlightSearchResponse from "../../interfaces/FlightSearchResponse";
import { OfferParser } from "../containers/OfferParser";
import FlightOfferResult from "./FlightOfferResult";
import ParsedOffer from "../../interfaces/ParsedOffer";
import { useEffect, useRef, useState } from "react";
import { sampleResponse } from "../../tests/SampleResponse";
import { useGetResult } from "../../Hooks/useGetResult";
import { handleSort } from "../containers/handleSort";

const ResultsPage = () => {

    const [loading, setLoading] = useState(true);
    const [parsedResponse, setParsedResponse] = useState<FlightSearchResponse>()
    const [goodRequest, setGoodRequest] = useState<null | boolean>(null);
    const durationSort = useRef(0);
    const priceSort = useRef(0);

    const sortObject = {durationSort, priceSort};

    const navigate = useNavigate();    // React Router navigation


    useEffect(() => {
        useGetResult( setParsedResponse, setGoodRequest);
        if (goodRequest == true) {
            setLoading(false);
            console.log(parsedResponse);
        } else {
            setParsedResponse(JSON.parse(sampleResponse));
            setLoading(false);
        }
    },[goodRequest])

    const handleClick = (parsedOffer: ParsedOffer) => {
        const dicts = parsedResponse?.dictionaries
        const offer = parsedOffer


        const info = {dicts: dicts, offer: offer}
        console.log(info);
        navigate("/details", { state: { info } });   // use react router to route to this page while providing state.
    }

    console.log("Re-render")
    if(!loading)return (
        <Container maxWidth="lg" sx={{ marginTop: 20, overflow: "scroll" }}>
            <Button onClick={() => navigate("/")} variant="contained" fullWidth> &lt; Return to Search</Button>
            Sort: <Button onClick={()=>{ handleSort(parsedResponse, setParsedResponse, 0, sortObject)}}>Duration</Button><Button onClick={()=>{handleSort(parsedResponse, setParsedResponse, 1,sortObject)}}>Price</Button>
            <Stack>
                {parsedResponse?.data.map((offer: FlightOffer, index: number) => {
                    const parsedOffer = OfferParser(offer, parsedResponse.dictionaries)
                    return (
                        <FlightOfferResult key={index} offer={parsedOffer} handleClick={handleClick} />
                    )
                })}
            </Stack>
        </Container>
    );
    // else return (
    //     <h1>Loading</h1>
    // )
}

export default ResultsPage;