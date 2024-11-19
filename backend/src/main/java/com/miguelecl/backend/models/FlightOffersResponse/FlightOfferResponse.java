package com.miguelecl.backend.models.FlightOffersResponse;

import java.util.List;

public class FlightOfferResponse {

    private static class meta {
        private int count;

        private static class links{
            private String self;
        }
    }
    private List<FlightOffer> data;

}
