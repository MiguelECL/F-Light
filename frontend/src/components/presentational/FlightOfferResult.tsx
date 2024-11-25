import { Button, Stack, Box, Divider } from "@mui/material";
import ParsedOffer from "../../interfaces/ParsedOffer";

const FlightOfferResult = ({ offer, handleClick }: { offer: ParsedOffer, handleClick: Function }) => {

    if(offer.returnArrivalAirport)return (
        <Box >
            <Button fullWidth onClick={() => { handleClick(offer) }}>
                <Stack direction="row" spacing={20}>
                    <Stack>
                        <Stack direction="row" spacing={20}>
                            <Box id="Left">
                                <h2>{offer.departureLocalTime + " - " + offer.arrivalLocalTime}</h2>
                                <h3>{`${offer.departureAirport + " - " + offer.arrivalAirport}`}</h3>
                                <h3>{offer.carrierInfo}</h3>
                            </Box>
                            <Box id="Center">
                                <h2>{offer.timeDuration + " " + offer.stopsString}</h2>
                                {offer.stops.map((stop, index: number) => (
                                    <h3 key={index}>{`${stop.stopDuration} in ${stop.stopWhere}`}</h3>
                                ))}
                            </Box>
                        </Stack>
                        <Stack direction="row" spacing={20}>
                            <Box id="Left">
                                <h2>{offer.returnDepartureLocalTime + " - " + offer.returnArrivalLocalTime}</h2>
                                <h3>{`${offer.returnDepartureAirport + " - " + offer.returnArrivalAirport}`}</h3>
                                <h3>{offer.returnCarrierInfo}</h3>
                            </Box>
                            <Box id="Center">
                                <h2>{offer.returnTimeDuration + " " + offer.returnStopsString}</h2>
                                {offer.returnStops?.map((stop, index: number) => (
                                    <h3 key={index}>{`${stop.stopDuration} in ${stop.stopWhere}`}</h3>
                                ))}
                            </Box>
                        </Stack>
                    </Stack>
                    <Divider orientation="vertical"></Divider>
                    <Stack>
                        <h2>{offer.totalPrice}</h2>
                        <h3>{"Total"}</h3>
                        {offer.numAdults > 1 &&
                            <div>
                                <h2>{offer.perTravelerPrice}</h2>
                                <h3>{"Per Traveler"}</h3>
                            </div>
                        }
                    </Stack>
                </Stack>
            </Button>
            <Divider></Divider>
        </Box>
    );
    else return (
        <Box >
            <Button fullWidth onClick={() => { handleClick(offer) }}>
                <Stack direction="row" spacing={20}>
                    <Box id="Left">
                        <h2>{offer.departureLocalTime + " - " + offer.arrivalLocalTime}</h2>
                        <h3>{`${offer.departureAirport + " - " + offer.arrivalAirport}`}</h3>
                        {(offer.carrierInfo != "") && <h3>{offer?.carrierInfo}</h3>}
                    </Box>
                    <Box id="Center">
                        <h2>{offer.timeDuration + " " + offer.stopsString}</h2>
                        {offer.stops.map((stop, index: number) => (
                            <h3 key={index}>{`${stop.stopDuration} in ${stop.stopWhere}`}</h3>
                        ))}
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
            <Divider></Divider>
        </Box>
    )

}


export default FlightOfferResult;