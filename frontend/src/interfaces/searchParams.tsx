export interface searchParams{
    departureAirport: string | null,
    arrivalAirport: string | null, 
    departureDate: string,
    returnDate: string,
    numAdults: number,
    nonStop: Boolean,
    currency: String,
}