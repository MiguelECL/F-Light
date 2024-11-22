import { Button, Stack, Box } from "@mui/material";
import ParsedOffer from "../../interfaces/ParsedOffer";

const FlightOfferResult = ({offer, handleClick}: {offer: ParsedOffer, handleClick: Function}) => {
    
    return (  
        <Button onClick={() => { handleClick(offer) }}>
            <Stack direction="row">
                <Box id="Left">
                    <h2>{offer.departureLocalTime + " - " + offer.arrivalLocalTime}</h2>
                    <h3>{`${offer.departureAirport + " - " + offer.arrivalAirport}`}</h3>
                    <h3>{offer.carrierInfo}</h3>
                </Box>
                <Box id="Center">
                    <h2>{offer.timeDuration + " " + offer.stopsString}</h2>
                </Box>
                <Box id="Right">
                    <h2>{ }</h2>
                    <h2>{ }</h2>
                </Box>
            </Stack>
        </Button>
    );
}


export default FlightOfferResult;