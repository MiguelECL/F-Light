package com.miguelecl.backend.controller;
import com.miguelecl.backend.models.SearchParams;
import com.miguelecl.backend.service.FLightService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/")
@CrossOrigin("http://localhost:8000")

public class FLightController {

    private String cachedResponse;
    private final FLightService flightService;

    public FLightController(FLightService flightService) {
        this.flightService = flightService;
    }

    //This mapping receives the keyword input from the frontend to search for city/airport
    @GetMapping("/SearchAirportCity/{keyword}")
    public String SearchAirportAPI(@PathVariable String keyword){
        String AuthToken = flightService.getAuthToken();
        return flightService.searchAirportCity(AuthToken, keyword);
    }

    @PostMapping("/SearchFlights")
    public String SearchFlightsAPI(@RequestBody SearchParams searchParams){
        String AuthToken = flightService.getAuthToken();
        cachedResponse = flightService.searchFlights(AuthToken, searchParams);
        return cachedResponse;
    }

    @GetMapping("/GetResult")
    public String GetResult(){
        return cachedResponse;
    }

}

