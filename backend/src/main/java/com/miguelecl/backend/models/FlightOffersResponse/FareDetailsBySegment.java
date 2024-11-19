package com.miguelecl.backend.models.FlightOffersResponse;

import java.util.List;

public class FareDetailsBySegment {
    private String segmentId;
    private String cabin;
    private String _class;
    private AdditionalServicesRequest additionalServices;

    public AdditionalServicesRequest getAdditionalServices() {
        return additionalServices;
    }

    public void setAdditionalServices(AdditionalServicesRequest additionalServices) {
        this.additionalServices = additionalServices;
    }

    public String get_class() {
        return _class;
    }

    public void set_class(String _class) {
        this._class = _class;
    }

    public String getCabin() {
        return cabin;
    }

    public void setCabin(String cabin) {
        this.cabin = cabin;
    }

    public String getSegmentId() {
        return segmentId;
    }

    public void setSegmentId(String segmentId) {
        this.segmentId = segmentId;
    }

}
