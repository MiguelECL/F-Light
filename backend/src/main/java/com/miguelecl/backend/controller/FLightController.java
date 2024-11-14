package com.miguelecl.backend.controller;

import com.miguelecl.backend.model.SearchParams;
import com.miguelecl.backend.service.FLightService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/")
@CrossOrigin("http://localhost:8000")

public class FLightController {

    //This mapping receives the info to be searched for by the frontend API
    @PostMapping("/search")
    public SearchParams searchParams(@RequestBody SearchParams searchParams){
        FLightService.searchFlights();

        return
    }

    //Mapping for Getting Airport/Airline codes
    @GetMapping("/code")
    public String getString() {

    }
}

