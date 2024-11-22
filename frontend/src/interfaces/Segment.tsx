import FlightStop from "./FlightStop"

export default interface Segment {
    departure: {
        iataCode: string,
        terminal: string,
        at: string
    },
    arrival: {
        iataCode: string,
        terminal: string,
        at: string
    }
    carrierCode: string,
    number: string,
    aircraft: {
        code: string
    },
    operating: {
        carrierCode: string
    }
    duration: string,
    id: string,
    numberOfStops: number,
    blacklistedInEU: boolean,
    stops?: FlightStop[]
}