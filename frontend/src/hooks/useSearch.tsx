import { searchParams } from "../interfaces/searchParams";

export const useSearch = (params: searchParams) => {
    // Function that calls the backend API

    const backendURL:string = "http://localhost:7000/GetCode"

    fetch(backendURL, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(params)
    }).then(response => {

    }).catch(error => {
        console.log(error);
    })

}