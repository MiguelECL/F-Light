package com.miguelecl.backend.service;
import jdk.jfr.ContentType;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.net.http.HttpHeaders;

@Service
public class FLightService {

    @Value("${AMADEUS_API_KEY}")
    private String apiKey;

    @Value("${AMADEUS_API_SECRET}")
    private String apiSecret;

    @Value("${AMADEUS_BASE_URL}")
    private String baseURL;

    @Value("${AMADEUS_AUTH_URL}")
    private String authURL;

    WebClient.Builder webClientBuilder = WebClient.builder();

    /*
        Before making our API Call, we need to get our access token. To retrieve this token, we must send a POST
        request to the endpoint with the correct `Content-Type` header and body. Replacing both `{client_id} and
        `{client_secret}` with our respective key and secret.
     */
    public String getAuthToken(){
        webClientBuilder
    }

    public String getCodes(){
        webClientBuilder.


        return "Hey";
    }


}
