import { Button, Container, Grid2 as Grid } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import PriceBreakdown from "../components/presentational/PriceBreakdown";
import SegmentComponent from "../components/presentational/SegmentComponent";
import Segment from "../interfaces/Segment";
import ParsedOffer from "../interfaces/ParsedOffer";
import { OfferParser } from "../components/containers/OfferParser";
import { sampleResponse } from "../tests/SampleResponse";

const DetailsPage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { state } = location || {}; // ADD FAIL SAFE
    let offer: ParsedOffer;
    if (state !== null){    // If state is not null, we assign this state to offer.
        offer = state.parsedOffer 
    } else {    // Else, fall back to sample response.
        let parsedResponse = JSON.parse(sampleResponse);
        offer = OfferParser(parsedResponse.data[0], parsedResponse.dictionaries);
    }

    return (  
        <Container className="DetailsPage" sx={{marginTop: 10}}>
            <h1>Flight Details</h1>
            <Grid container spacing={2}>
                <Grid size={8}>
                    {offer.segments.map((segment:Segment, index:number) => (
                        <SegmentComponent key={index} segment={segment} index={index}/>
                    ))}
                </Grid>
                <Grid size={4}>
                    <PriceBreakdown offer={offer}/> 
                </Grid>
            </Grid>
            <Button onClick={() => {navigate(-1)}}fullWidth variant="contained">Return</Button>
        </Container>
    );
}
 
export default DetailsPage;