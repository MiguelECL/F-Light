import Segment from "./Segment"
import SegmentDetails from "./SegmentDetails"

export default interface ParsedOffer {
    departureAirport: string,
    arrivalAirport: string,
    oneWay: boolean,
    departureLocalTime: string,
    arrivalLocalTime: string,
    timeDuration: string,
    numStops: number,
    stopsString: string,
    stopsInfo: {}
    carrierInfo: string
    totalPrice: string,
    basePrice: string,
    fees: [{}],
    numAdults: number,
    perTravelerPrice: string,
    fareDetailsBySegment: SegmentDetails[]
    segments: Segment[]
}