import dayjs from "dayjs";
import FlightOffer from "../../interfaces/FlightOffer";
import duration from "dayjs/plugin/duration"
import ParsedOffer from "../../interfaces/ParsedOffer";
import Dictionary from "../../interfaces/Dictionary";

export const OfferParser = (offer: FlightOffer, dictionaries: Dictionary) => {
    // Format time
    dayjs.extend(duration);
    const lastSegment = offer.itineraries[0].segments.length;
    const departureLocalTime = dayjs(offer.itineraries[0].segments[0].departure.at).format("HH:mm");
    const arrivalLocalTime = dayjs(offer.itineraries[0].segments[lastSegment - 1].arrival.at).format("HH:mm");
    const timeDuration = dayjs.duration(offer.itineraries[0].duration).format("HH[h] mm[m]");

    // Get if the offer is one way
    const oneWay = offer.oneWay;

    // Get the number of stops and their duration
    let numStops = 0;
    let stopsString = "";
    let stops = [];

    for (let segment of offer.itineraries[0].segments) {
        numStops++;
    }

    numStops -= 1;

    if (numStops == 0) stopsString = "(Nonstop)";
    else if (numStops > 1) stopsString = `(${numStops} Stops)`
    else stopsString = `(${numStops} Stop)`


    // Obtain departure and arrival airports
    const departureAirport = offer.itineraries[0].segments[0].departure.iataCode;
    const arrivalAirport = offer.itineraries[0].segments[lastSegment - 1].arrival.iataCode;

    //Obtain number of travelers
    const numAdults = offer.travelerPricings.length;

    // Obtain prices (total and per traveler), and fees,
    const currency = offer.price.currency;
    const totalPrice = offer.price.total + " " + currency;
    const perTravelerPrice = offer.travelerPricings[0].price.total + " " + currency;
    const fareDetailsBySegment = offer.travelerPricings[0].fareDetailsBySegment;
    const basePrice = offer.price.base;
    const fees = offer.price.fees;

    // Obtain operating airline
    const carrierCode = offer.itineraries[0].segments[0].operating?.carrierCode;
    const carrierName = dictionaries.carriers[carrierCode]
    const carrierString = `${carrierName} (${carrierCode})`

    // Obtain segments
    const segments = offer.itineraries[0].segments;

    // Return Flight Parsing
    if (offer.itineraries.length > 1) {

        let returnLastSegment: number;
        let returnDepartureLocalTime: string
        let returnArrivalLocalTime: string
        let returnTimeDuration: string
        //Format Time
        returnLastSegment = offer.itineraries[1].segments.length;
        returnDepartureLocalTime = dayjs(offer.itineraries[1].segments[0].departure.at).format("HH:mm");
        returnArrivalLocalTime = dayjs(offer.itineraries[1].segments[returnLastSegment - 1].arrival.at).format("HH:mm");
        returnTimeDuration = dayjs.duration(offer.itineraries[1].duration).format("HH[h] mm[m]");

        // get number of stops in return flight
        var returnNumStops = 0;
        var returnStopsString = "";
        for (let segment of offer.itineraries[1].segments) {
            returnNumStops++;
        }

        returnNumStops -= 1;
        // Return flight
        if (returnNumStops == 0) returnStopsString = "(Nonstop)";
        else if (returnNumStops > 1) returnStopsString = `(${returnNumStops} Stops)`
        else returnStopsString = `(${returnNumStops} Stop)`

        var returnDepartureAirport = offer.itineraries[1].segments[0].departure.iataCode;
        var returnArrivalAirport = offer.itineraries[1].segments[returnLastSegment - 1].arrival.iataCode;


        // Obtain operating airline
        const returnCarrierCode = offer.itineraries[1].segments[0].operating?.carrierCode;
        const returnCarrierName = dictionaries.carriers[carrierCode]
        var returnCarrierString = `${carrierName} (${carrierCode})`
    }


    const data: ParsedOffer = {
        // SHOULD really refactor this into objects but due to time most likely wont!
        oneWay: oneWay,
        departureAirport: departureAirport,
        arrivalAirport: arrivalAirport,
        departureLocalTime: departureLocalTime,
        arrivalLocalTime: arrivalLocalTime,
        timeDuration: timeDuration,
        returnDepartureLocalTime: returnDepartureLocalTime,
        returnArrivalLocalTime: returnArrivalLocalTime,
        returnTimeDuration: returnTimeDuration,
        returnDepartureAirport: returnDepartureAirport,
        returnArrivalAirport: returnArrivalAirport,
        returnCarrierInfo: returnCarrierString,
        returnNumStops: returnNumStops,
        returnStopsString: returnStopsString,
        numStops: numStops,
        stopsString: stopsString,
        carrierInfo: carrierString,
        totalPrice: totalPrice,
        basePrice: basePrice,
        fees: fees,
        numAdults: numAdults,
        perTravelerPrice: perTravelerPrice,
        fareDetailsBySegment: fareDetailsBySegment,
        segments: segments
    }

    return data;

}