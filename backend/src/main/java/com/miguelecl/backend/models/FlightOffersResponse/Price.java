package com.miguelecl.backend.models.FlightOffersResponse;

import java.util.List;

public class Price {
    private String grandTotal;
    private String billingCurrency;
    private String currency;
    private List<AdditionalService> additionalServices;
    private String total;
    private String base;
    private List<Fee> fees;
    private List<Tax> tax;
    private List<TravelerPricing> travelerPricings;
}