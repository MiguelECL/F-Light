import { Grid2 as Grid } from "@mui/material";
import { Segment } from "../../interfaces/Segment";

const SegmentComponent = ({segment, index}: {segment:Segment, index:number}) => {

    return (
        <Grid>
            <Grid size={8}>
                <h2>{`Segment ${index+1}`}</h2>
                <h3>{`${segment.departure.at} - ${segment.arrival.at}`}</h3>
                <h3>{`${segment.departure.iataCode} - ${segment.arrival.iataCode}`}</h3>
                <h4>{`${segment.operating.carrierCode}`}</h4>
            </Grid>
            <Grid size={4}>
                <h2>Traveler Fare Details</h2>
                <h3></h3>
            </Grid>
        </Grid>
    );
}
 
export default SegmentComponent;