import { Button, Stack, Box } from "@mui/material";
import ParsedOffer from "../../interfaces/ParsedOffer";

const OneWayFlightOfferResult = ({offer, handleClick}: {offer: ParsedOffer, handleClick:Function}) => {
    return (  
        <Button onClick={() => { handleClick(offer) }}>
            <Stack direction="row" spacing={20}>
                <Box id="Left">
                    <h2>{offer.departureLocalTime + " - " + offer.arrivalLocalTime}</h2>
                    <h3>{`${offer.departureAirport + " - " + offer.arrivalAirport}`}</h3>
                    <h3>{offer.carrierInfo}</h3>
                </Box>
                <Box id="Center">
                    <h2>{offer.timeDuration + " " + offer.stopsString}</h2>
                </Box>
                <Box id="Right">
                    <h2>{offer.totalPrice}</h2>
                    <h3>{"Total"}</h3>
                    {offer.numAdults > 1 &&
                        <div>
                            <h2>{offer.perTravelerPrice}</h2>
                            <h3>{"Per Traveler"}</h3>
                        </div>
                    }
                </Box>
            </Stack>
        </Button>
    );
}
export default OneWayFlightOfferResult