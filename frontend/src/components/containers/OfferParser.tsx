import dayjs from "dayjs";
import FlightOffer from "../../interfaces/FlightOffer";
import duration from "dayjs/plugin/duration"
import ParsedOffer from "../../interfaces/ParsedOffer";
import Dictionary from "../../interfaces/Dictionary";

export const OfferParser = (offer: FlightOffer, dictionaries: Dictionary) => {
    // Format time
    dayjs.extend(duration);
    const lastSegment = offer.itineraries[0].segments.length;
    const departureLocalTime = dayjs(offer.itineraries[0].segments[0].departure.at).format("HH:mm:ss");
    const arrivalLocalTime = dayjs(offer.itineraries[0].segments[lastSegment-1].arrival.at).format("HH:mm:ss");
    const timeDuration = dayjs.duration(offer.itineraries[0].duration).format("HH:mm:ss");

    // Get if the offer is one way
    const oneWay = offer.oneWay;

    // Get the number of stops and their duration
    let numStops = 0;
    let stopsString = "";

    if (numStops == 0) stopsString = "(Nonstop)";
    else if (numStops > 1) stopsString = `(${numStops} Stop)`
    else stopsString = `(${numStops} Stops)`

    let stopsInfo=[];

    for(let segment of offer.itineraries[0].segments){
        numStops += segment.numberOfStops;
        if(segment.stops != undefined){
            for(let value of segment.stops){
                stopsInfo.push(value.duration, value.iataCode)
            }
        }
    }
   
    // Obtain departure and arrival airports
    const departureAirport = offer.itineraries[0].segments[0].departure.iataCode;
    const arrivalAirport = offer.itineraries[0].segments[lastSegment-1].arrival.iataCode;

    //Obtain number of travelers
    const numAdults = offer.travelerPricings.length;

    // Obtain prices (total and per traveler), and fees,
    const currency = offer.price.currency;
    const totalPrice = offer.price.total + " " + currency;
    const perTravelerPrice = offer.travelerPricings[0].price.total + " " + currency;
    const basePrice = offer.price.base;
    const fees = offer.price.fees;

    // Obtain operating airline
    const carrierCode = offer.itineraries[0].segments[0].operating.carrierCode;
    const carrierName = dictionaries.carriers[carrierCode]
    const carrierString = `${carrierName} (${carrierCode})`

    // Obtain segments
    const segments = offer.itineraries[0].segments;

    const data: ParsedOffer = {
        oneWay: oneWay,
        departureAirport: departureAirport,
        arrivalAirport: arrivalAirport,
        departureLocalTime: departureLocalTime,
        arrivalLocalTime: arrivalLocalTime,
        timeDuration: timeDuration,
        numStops: numStops,
        stopsString: stopsString,
        stopsInfo: stopsInfo,
        carrierInfo: carrierString,
        totalPrice: totalPrice,
        basePrice: basePrice,
        fees: fees,
        numAdults: numAdults,
        perTravelerPrice: perTravelerPrice,
        segments: segments
    }

    return data;

}