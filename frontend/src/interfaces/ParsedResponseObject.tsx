import FlightSearchResponse from "./FlightSearchResponse";

export default interface ParsedResponseObject {
    parsedResponse: FlightSearchResponse | undefined,
    setParsedResponse: React.Dispatch<React.SetStateAction<FlightSearchResponse | undefined>>
}