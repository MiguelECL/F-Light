import Dictionary from "./Dictionary"
import FlightOffer from "./FlightOffer"

export default interface FlightSearchResponse {
    meta: {
        count: number,
        links: {
            self: string
        }
    },
    data: FlightOffer[],
    dictionaries: Dictionary
}