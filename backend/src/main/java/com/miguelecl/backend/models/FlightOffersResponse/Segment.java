package com.miguelecl.backend.models.FlightOffersResponse;

// Defining a flight segment; including both operating and marketing details when applicable
public class Segment {
    private int numberOfStops;
    private FlightEndPoint departure;
    private FlightEndPoint arrival;
    private String carrierCode;
    private String number;
    private AircraftEquipment aircraft;
    private OperatingFlight operating;
    private String duration;
    private FlightStop stops;

    public FlightStop getStops() {
        return stops;
    }

    public void setStops(FlightStop stops) {
        this.stops = stops;
    }

    public String getDuration() {
        return duration;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }

    public OperatingFlight getOperating() {
        return operating;
    }

    public void setOperating(OperatingFlight operating) {
        this.operating = operating;
    }

    public AircraftEquipment getAircraft() {
        return aircraft;
    }

    public void setAircraft(AircraftEquipment aircraft) {
        this.aircraft = aircraft;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public String getCarrierCode() {
        return carrierCode;
    }

    public void setCarrierCode(String carrierCode) {
        this.carrierCode = carrierCode;
    }

    public FlightEndPoint getArrival() {
        return arrival;
    }

    public void setArrival(FlightEndPoint arrival) {
        this.arrival = arrival;
    }

    public FlightEndPoint getDeparture() {
        return departure;
    }

    public void setDeparture(FlightEndPoint departure) {
        this.departure = departure;
    }

    public int getNumberOfStops() {
        return numberOfStops;
    }

    public void setNumberOfStops(int numberOfStops) {
        this.numberOfStops = numberOfStops;
    }

}
