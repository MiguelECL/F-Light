import { Box, Divider, Grid2 as Grid } from "@mui/material";
import Segment from "../../interfaces/Segment";
import ParsedOffer from "../../interfaces/ParsedOffer";
import SegmentDetails from "../../interfaces/SegmentDetails";
import Dictionary from "../../interfaces/Dictionary";
import dayjs from "dayjs";

const SegmentComponent = ({ segment, index, offer, dictionaries }: { segment:Segment,  index: number, offer:ParsedOffer, dictionaries:Dictionary}) => {
console.log(dictionaries);
    return (
        <Box>
            <Grid>
                <Grid size={8}>
                    <h2>{`Segment ${index + 1}`}</h2>
                    <h3>{`${dayjs(segment.departure.at).format("YYYY-MM-DD HH:mm")} - ${dayjs(segment.arrival.at).format("YYYY-MM-DD HH:mm")}`}</h3>
                    <h3>{`${segment.departure.iataCode} - ${segment.arrival.iataCode}`}</h3>
                    <h4>{ `Aircraft: ${dictionaries?.aircraft[segment.aircraft.code]}`  }</h4>
                    <h4>{ `Carrier: ${dictionaries?.carriers[segment.carrierCode]}`}</h4>
                </Grid>
                <Grid size={4}>
                    <h2>Traveler Fare Details</h2>
                    {
                        offer.fareDetailsBySegment.map((segmentDetails: SegmentDetails, index2: number) => {
                            if(index == index2)
                            return (
                                <span key={index2}>
                                    <h3>{`Class: ${segmentDetails.class}`}</h3>
                                    <h3>{`Cabin: ${segmentDetails.cabin.replace("_"," ")}`}</h3>
                                    {segmentDetails?.includedCheckedBags?.weight && (<h3>{ `Included Checked Bags: ${segmentDetails.includedCheckedBags.weight}`}</h3>)}
                                </span>
                            )
                        })
                    }
                </Grid>
            </Grid>
            <Divider sx={{color: "red", opacity:"initial" }}/>
        </Box>
    );
}
 
export default SegmentComponent;