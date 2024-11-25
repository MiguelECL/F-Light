import { Button, Container, Grid2 as Grid } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import PriceBreakdown from "./PriceBreakdown";
import SegmentComponent from "./SegmentComponent";
import Segment from "../../interfaces/Segment";
import ParsedOffer from "../../interfaces/ParsedOffer";
import { OfferParser } from "../containers/OfferParser";
import { sampleResponse } from "../../tests/SampleResponse";
import Dictionary from "../../interfaces/Dictionary";

const DetailsPage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    if(location){
        var info = location.state.info;
    } 
      
    
    let offer: ParsedOffer;
    let dictionaries: Dictionary;
    if (info !== null){    // If state is not null, we assign this state to offer.
        offer = info.offer
        dictionaries = info.dicts
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
                        <SegmentComponent key={index} segment={segment} offer={offer} dictionaries={dictionaries} index={index}/>
                    ))}
                    {((offer.returnSegments.length != 0 ) &&
                    <div>
                        <h1 style={{color: "black"}}>Return Flight</h1>
                        {offer.returnSegments.map((segment: Segment, index: number) => (
                            <SegmentComponent key={index} segment={segment} offer={offer} dictionaries={dictionaries} index={index} />
                        ))}
                    </div>
                    )}
                </Grid>
                <Grid size={4}>
                    <PriceBreakdown offer={offer} />
                </Grid>
            </Grid>
            <Button onClick={() => { navigate(-1) }} fullWidth variant="contained">Return</Button>
        </Container>
    );
}

export default DetailsPage;