import FlightSearchResponse from "../../interfaces/FlightSearchResponse"
import SortObject from "../../interfaces/SortObject"
import dayjs from "dayjs";

export const handleSort = (parsedResponse: FlightSearchResponse | undefined, setParsedResponse: React.Dispatch<React.SetStateAction<FlightSearchResponse | undefined>>, flag: number, sortObject: SortObject) => {

    // If flag is 0 user wants to sort by duration
    const { durationSort } = sortObject
    const { priceSort } = sortObject

    var sortedResponse: FlightSearchResponse;
    if (parsedResponse) {
        sortedResponse = { ...parsedResponse } //object spread to ensure immutability of state, and allow for re-renders

        if (flag == 0) {
            durationSort.current += 1;
            if (parsedResponse) {
                if (durationSort.current == 1) {
                    sortedResponse.data = (sortedResponse.data.sort((a, b) => {
                        const durA = dayjs.duration(a.itineraries[0].duration).asMinutes();
                        const durB = dayjs.duration(b.itineraries[0].duration).asMinutes();
                        return durA - durB
                    }));
                } else if (durationSort.current == 2) {
                    sortedResponse.data = (sortedResponse.data.sort((a, b) => {
                        const durA = dayjs.duration(a.itineraries[0].duration).asMinutes();
                        const durB = dayjs.duration(b.itineraries[0].duration).asMinutes();
                        return durB - durA
                    }));
                } else if (durationSort.current == 3){
                    sortedResponse.data = (sortedResponse.data.sort((a, b) => {
                        return Number(a.id) - Number(b.id)
                    }));
                    durationSort.current = 0;
                }
            }
        }

        // If flag is 1 user wants to sort by price
        else {
            priceSort.current += 1;
            if (parsedResponse) {
                if (priceSort.current == 1) {
                    sortedResponse.data = (parsedResponse.data.sort((a, b) => (Number(a.price.grandTotal) - Number(b.price.grandTotal))))
                } else if (priceSort.current == 2) {
                    sortedResponse.data = (parsedResponse.data.sort((a, b) => (Number(b.price.grandTotal) - Number(a.price.grandTotal))))
                } else if (priceSort.current == 3){
                    sortedResponse.data = (sortedResponse.data.sort((a, b) => {
                        return Number(a.id) - Number(b.id)
                    }));
                    priceSort.current = 0;
                }
            }
        }

        setParsedResponse(sortedResponse);
    }
}