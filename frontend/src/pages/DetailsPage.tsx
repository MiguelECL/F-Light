import { Grid2 as Grid } from "@mui/material";
import { useLocation } from "react-router-dom";
import { sampleResponse } from "../tests/SampleResponse";
import PriceBreakdown from "../components/presentational/PriceBreakdown";
import SegmentComponent from "../components/presentational/SegmentComponent";
import { Segment } from "../interfaces/Segment";

const DetailsPage = () => {
    const location = useLocation();
    // const result = location.state || {}; // ADD FAIL SAFE
    const result = JSON.parse(sampleResponse).data[0];

    return (  
        <div>
            <h1>Flight Details</h1>
            <Grid container spacing={2}>
                <Grid size={8}>
                    {result.itineraries[0].segments.map((segment:Segment, index:number) => (
                        <SegmentComponent key={index} segment={segment} index={index}/>
                    ))}
                </Grid>
                <Grid size={4}>
                    <PriceBreakdown result={result}/>
                </Grid>
            </Grid>
        </div>
    );
}
 
export default DetailsPage;