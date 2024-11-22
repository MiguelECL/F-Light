import Segment from "./Segment"

export default interface FlightOffer {
    type: string,
    id: string,
    source: string,
    instantTicketingRequired: string,
    nonHomogeneous: boolean,
    oneWay: boolean,
    lastTicketingDate: string,
    numberOfBookableSeats: number,
    itineraries: [
        {
            duration:string,
            segments: Segment[]
        }
    ]
    price: {
        currency: string, 
        total: string,
        base: string,
        fees: [
            {
                amount: string,
                type: string
            }
        ]
        grandTotal: string,
        pricingOptions: {
            fareType: string[],
            includedCheckBagsOnly: boolean
        }
        validatingAirlineCodes: string[]
    }
    travelerPricings: [
        {
            travelerId: string,
            fareOption: string,
            travelerType: string,
            price: {
                currency: string,
                total: string,
                base: string,
            }
            fareDetailsBySegment: [
                {
                    segmentId: string,
                    cabin: string,
                    fareBasis: string,
                    class: string,
                    includedCheckedBags: {
                        weight: number,
                        weightUnit: string
                    }
                }
            ]
        }
    ]

}