import Segment from "./Segment";

export default interface Itinerary {
    duration: string,
    segments: Segment[]
}