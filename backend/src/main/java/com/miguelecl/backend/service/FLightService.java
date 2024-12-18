package com.miguelecl.backend.service;
import com.miguelecl.backend.models.AuthTokenResponse;
import com.miguelecl.backend.models.SearchParams;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Objects;


@Service
public class FLightService {

    @Value("${AMADEUS_API_KEY}")
    private String apiKey;

    @Value("${AMADEUS_API_SECRET}")
    private String apiSecret;

    @Value("${AMADEUS_AUTH_URL}")
    private String authURL;

    @Value("${AMADEUS_AIRPORT_CITY_SEARCH_URL}")
    private String airportCitySearchURL;

    @Value("${AMADEUS_FLIGHT_SEARCH_URL}")
    private String flightSearchURL;

    @Autowired
    private WebClient webClient;

    /*
        Before making our API Call, we need to get our access token. To retrieve this token, we must send a POST
        request to the endpoint with the correct `Content-Type` header and body. Replacing both `{client_id} and
        `{client_secret}` with our respective key and secret.
     */
    public String getAuthToken(){
        AuthTokenResponse tokenResponse = webClient
                .post()
                .uri(authURL)
                .header("Content-Type","application/x-www-form-urlencoded")
                .bodyValue("grant_type=client_credentials&client_id=" + apiKey + "&client_secret=" + apiSecret)
                .retrieve()
                .bodyToMono(AuthTokenResponse.class)
                .block();

        assert tokenResponse != null;
        return tokenResponse.getAccess_token();
    }

    public String searchAirportCity(String AuthToken, String keyWord){
        // Call the API with the authorization header with the value Bearer String concatenated with the token requested
        /*
        In the form of: https://APIURL?QueryParam=value
        Headers: Authorization: Bearer Token

        required Parameters for Airport & city search are:
        subType = array[string]
        keyword = string
        therefore, we create these variables to append, since the only actual variable is the keyword, we need to pass it
        to the method as a parameter that the frontend will provide.
        */

        String subTypeQuery = "?subType=CITY,AIRPORT";
        String keywordQuery = "&keyword=";

        //Return a value in the form of CitySearchResponse
        return webClient
                .get()
                .uri(airportCitySearchURL + subTypeQuery + keywordQuery + keyWord + "&view=LIGHT")
                .header("Authorization","Bearer " + AuthToken)
                .retrieve()
                .bodyToMono(String.class)
                .block();
    }

    public String searchFlights(String AuthToken, SearchParams searchParams){
        
        String finalURL = getFinalURL(searchParams);
        return webClient
                .get()
                .uri(flightSearchURL + finalURL)
                .header("Authorization", "Bearer " + AuthToken)
                .retrieve()
                .bodyToMono(String.class) // What if I turn this into a string?? would it be better?
                .block();

    }

    public String getFinalURL(SearchParams searchParams){
        String originLocationCodeQuery = "?originLocationCode=" + searchParams.getDepartureAirport();
        String destinationLocationCodeQuery = "&destinationLocationCode=" + searchParams.getDestinationAirport();
        String departureDateQuery = "&departureDate=" + searchParams.getDepartureDate();
        String returnDateQuery;
        System.out.println(searchParams.getReturnDate());
        if (!Objects.equals(searchParams.getReturnDate(), "")){
            returnDateQuery = "&returnDate=" + searchParams.getReturnDate();
        } else {
            returnDateQuery = "";
        }
        String adultsQuery = "&adults=" + searchParams.getAdults();
        String nonStopQuery = "&nonStop=" + searchParams.isNonStop();
        String currencyCodeQuery = "&currencyCode=" + searchParams.getCurrencyCode();

        return originLocationCodeQuery + destinationLocationCodeQuery +
                departureDateQuery + returnDateQuery + adultsQuery + nonStopQuery + currencyCodeQuery + "&max=50";
    }

}
