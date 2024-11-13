package com.miguelecl.backend.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/search")
@CrossOrigin("http://localhost:8000")

public class FLightController {

    //Mapping for Getting Airport/Airline codes
    @GetMapping("/code")
    public String getString() {

    }
}

