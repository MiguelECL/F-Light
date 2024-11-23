import FlightSearchResponse from "../interfaces/FlightSearchResponse";

export  const useGetResult = (results: FlightSearchResponse | undefined, 
    setResults: React.Dispatch<React.SetStateAction<FlightSearchResponse | undefined>>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>) => {

    const searchResultURL = "http://localhost:7000/GetResult"

    fetch(searchResultURL, {
        method: "GET",
        headers: {
            "Content-Type":"applicaton/json"
        }
    }).then((response) => {
        if(response.ok){
            return response.text();
        }
    }).then((data) => {
        if(data != undefined ){
            var parsedResponse = JSON.parse(data)
            setResults(parsedResponse);
            setLoading(false);
        }
        return data;
    }).catch((error) => {
        console.log(error);
    })

}