import { ACSearchResult } from "../../interfaces/ACSearchResult";

export const handleAutocomplete = (keyword: string, flag: number, 
    setInputDepartureAirport: React.Dispatch<React.SetStateAction<string>>, 
    setInputArrivalAirport: React.Dispatch<React.SetStateAction<string>>,
    setOptions: React.Dispatch<React.SetStateAction<readonly ACSearchResult[]>>) => {

    if (flag == 0) {
        setInputDepartureAirport(keyword);
    } else if (flag == 1){
        setInputArrivalAirport(keyword);
    }

    const backendURL = "http://localhost:7000/SearchAirportCity/" + [keyword];
    fetch(backendURL, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    }).then((response) => {
        if (response.ok) {
            return response.json();
        } else throw new Error("Server not Responding!")
    }).then((responseData) => {
        setOptions([...responseData.data])
    }).catch((error) => {
        console.error("Failed!", error.message)
    });

}
