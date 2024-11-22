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
    numAdults: number
    perTravelerPrice: string
}