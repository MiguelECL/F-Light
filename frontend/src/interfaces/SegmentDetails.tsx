export default interface SegmentDetails {
    segmentId: string,
    cabin: string,
    class: string,
    includedCheckedBags: {
        weight: number
    }
}
