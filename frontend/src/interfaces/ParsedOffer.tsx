import Segment from "./Segment"
import SegmentDetails from "./SegmentDetails"

export default interface ParsedOffer {
    // Can refactor this into objects but due to time most likely wont!
    departureAirport: string,
    arrivalAirport: string,
    oneWay: boolean,
    departureLocalTime: string,
    arrivalLocalTime: string,
    timeDuration: string,
    returnDepartureLocalTime?: string,
    returnArrivalLocalTime?: string,
    returnTimeDuration?: string,
    returnDepartureAirport?: string,
    returnArrivalAirport?: string,
    returnCarrierInfo?: string,
    returnNumStops?: number,
    returnStopsString?: string,
    numStops: number,
    stops: {
        stopWhere: string,
        stopDuration: string,
    }[],
    returnStops?: {
        stopWhere: string,
        stopDuration: string,
    }[],
    stopsString: string,
    carrierInfo: string
    totalPrice: string,
    basePrice: string,
    fees: [{}],
    numAdults: number,
    perTravelerPrice: string,
    fareDetailsBySegment: SegmentDetails[],
    segments: Segment[],
    returnSegments: Segment[]
}