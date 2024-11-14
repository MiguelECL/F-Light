import { searchParams } from "../interfaces/searchParams";

export const useSearch = (params: searchParams) => {
    // Function that calls the backend API

    const backendURL:string = "http://localhost:7000/"

    fetch(backendURL, {
        method: "POST",
        body: JSON.stringify(params)
    });

}