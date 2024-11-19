package com.miguelecl.backend.models.FlightOffersResponse;

import java.util.List;

public class AdditionalServicesRequest {
    private List<String> otherServices;

    public List<String> getOtherServices() {
        return otherServices;
    }

    public void setOtherServices(List<String> otherServices) {
        this.otherServices = otherServices;
    }

}
