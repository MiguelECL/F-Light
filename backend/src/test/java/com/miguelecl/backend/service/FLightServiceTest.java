package com.miguelecl.backend.service;

import com.miguelecl.backend.models.SearchParams;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class FLightServiceTest {

    @Test
    void FinalURLisCorrect(){
        FLightService flightService = new FLightService();
        SearchParams params = new SearchParams("NYC", "HMO", "23-11-2023",
                "24-12-2024", 4, false, "MXN");

        // Check that final URL is correct
        assertEquals("?originLocationCode=NYC&destinationLocationCode=HMO&departureDate=23-11-2023" +
                "&returnDate=24-12-2024&adults=4&nonStop=false&currencyCode=MXN&max=50", flightService.getFinalURL(params));

    }

    @Test
    void IfReturnDateIsBlankFinalURLisCorrect(){
        FLightService flightService = new FLightService();
        SearchParams params = new SearchParams("NYC", "HMO", "23-11-2023",
                "", 4, false, "MXN");

        // Check that final URL is correct if return date is left blank
        assertEquals("?originLocationCode=NYC&destinationLocationCode=HMO&departureDate=23-11-2023" +
                "&adults=4&nonStop=false&currencyCode=MXN&max=50",flightService.getFinalURL(params));
    }

}