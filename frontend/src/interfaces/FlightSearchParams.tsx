export interface FlightSearchParams{
    departureAirport: string | null | undefined,
    destinationAirport: string | null | undefined, 
    departureDate: string,
    returnDate: string,
    numAdults: number,
    nonStop: Boolean,
    currencyCode: String,
}