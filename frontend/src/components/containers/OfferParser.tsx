import dayjs from "dayjs";
import FlightOffer from "../../interfaces/FlightOffer";
import duration from "dayjs/plugin/duration"
import ParsedOffer from "../../interfaces/ParsedOffer";
import Dictionary from "../../interfaces/Dictionary";
import Segment from "../../interfaces/Segment";

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
    let stops = [];
    // If number of segments is greater than 1, that means that there are stops
    if(offer.itineraries[0].segments.length > 1){
        length = offer.itineraries[0].segments.length;
        for (let i = 0 ; i<length-1 ; i++) {
            let stopWhere = offer.itineraries[0].segments[i].arrival.iataCode;
            let stopBegin = offer.itineraries[0].segments[i].arrival.at;
            let stopEnd = offer.itineraries[0].segments[i+1].departure.at;
            let timeDifference = dayjs(stopEnd).diff(stopBegin,'minutes') 
            let stopDuration = dayjs.duration(timeDifference,'minutes').format("HH[h] mm[m]");
            stops.push({stopWhere, stopDuration})
        }
    }

    let stopsString = "";

    for (let _segment of offer.itineraries[0].segments) {
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
    var fees = offer.price.fees;

    // Obtain operating airline
    const carrierCode = offer.itineraries[0].segments[0].operating?.carrierCode;
    const carrierName = dictionaries.carriers[carrierCode]
    if(carrierCode == undefined || carrierName == undefined){
        var carrierString = "No Carrier Info";
    } else {
        var carrierString = `${carrierName} (${carrierCode})`
    }


    // Obtain segments
    const segments = offer.itineraries[0].segments;

    
    //Variables for return Flight
    var returnLastSegment = 0;
    var returnDepartureLocalTime = "";
    var returnArrivalLocalTime = "";
    var returnTimeDuration = "";
    var returnDepartureLocalTime = "";
    var returnArrivalLocalTime = "";
    var returnDepartureAirport = "";
    var returnArrivalAirport = "";
    var returnCarrierString = "";
    var returnNumStops = 0;
    var returnStopsString = "";
    var returnStops = [];
    var returnSegments: Segment[] = [];

    // Return Flight Parsing
    if (offer.itineraries.length > 1) {

        if (offer.itineraries[1] != undefined) {
            //Format Time
            returnLastSegment = offer.itineraries[1].segments.length;
            returnDepartureLocalTime = dayjs(offer.itineraries[1].segments[0].departure.at).format("HH:mm");
            returnArrivalLocalTime = dayjs(offer.itineraries[1].segments[returnLastSegment - 1].arrival.at).format("HH:mm");
            returnTimeDuration = dayjs.duration(offer.itineraries[1].duration).format("HH[h] mm[m]");

            // get number of stops in return flight
            var returnNumStops = 0;
            var returnStopsString = "";
            for (let _segment of offer.itineraries[1].segments) {
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
            if (returnCarrierCode == undefined || returnCarrierName == undefined) {
                var returnCarrierString = "No Carrier Info";
            } else {
                var returnCarrierString = `${carrierName} (${carrierCode})`
    }
            //Retun stops
            if (offer.itineraries[1].segments.length > 1) {
                length = offer.itineraries[1].segments.length;
                for (let i = 0; i < length - 1; i++) {
                    let stopWhere = offer.itineraries[1].segments[i].arrival.iataCode;
                    let stopBegin = offer.itineraries[1].segments[i].arrival.at;
                    let stopEnd = offer.itineraries[1].segments[i + 1].departure.at;
                    let timeDifference = dayjs(stopEnd).diff(stopBegin, 'minutes')
                    let stopDuration = dayjs.duration(timeDifference, 'minutes').format("HH[h] mm[m]");
                    returnStops.push({ stopWhere, stopDuration })
                }
            }

            // Get Return Segments
            returnSegments = offer.itineraries[1].segments;

        }
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
        stops: stops,
        returnStops: returnStops,
        stopsString: stopsString,
        carrierInfo: carrierString,
        totalPrice: totalPrice,
        basePrice: basePrice,
        fees: fees,
        numAdults: numAdults,
        perTravelerPrice: perTravelerPrice,
        fareDetailsBySegment: fareDetailsBySegment,
        segments: segments,
        returnSegments: returnSegments,
    }

    return data;

}