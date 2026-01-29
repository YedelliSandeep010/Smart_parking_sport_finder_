package com.parkease.backend.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

@Entity
@Table(name = "parking_slots")
public class ParkingSlot {
    @Id
    private String id;
    private String region;
    private String city;
    private String venue;
    private String location;

    @JsonProperty("isOccupied")
    private boolean isOccupied;

    private String type; // Car or Bike
    private Integer x; // Coordinate X
    private Integer y; // Coordinate Y

    @JsonProperty("isMaintenance")
    private boolean isMaintenance;

    @JsonProperty("isActive")
    private boolean isActive;

    public ParkingSlot() {
    }

    public ParkingSlot(String id, String region, String city, String venue, String location, boolean isOccupied,
            String type, Integer x, Integer y, boolean isMaintenance, boolean isActive) {
        this.id = id;
        this.region = region;
        this.city = city;
        this.venue = venue;
        this.location = location;
        this.isOccupied = isOccupied;
        this.type = type;
        this.x = x;
        this.y = y;
        this.isMaintenance = isMaintenance;
        this.isActive = isActive;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getRegion() {
        return region;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getVenue() {
        return venue;
    }

    public void setVenue(String venue) {
        this.venue = venue;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public boolean isOccupied() {
        return isOccupied;
    }

    public void setOccupied(boolean occupied) {
        isOccupied = occupied;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Integer getX() {
        return x;
    }

    public void setX(Integer x) {
        this.x = x;
    }

    public Integer getY() {
        return y;
    }

    public void setY(Integer y) {
        this.y = y;
    }

    public boolean isMaintenance() {
        return isMaintenance;
    }

    public void setMaintenance(boolean maintenance) {
        isMaintenance = maintenance;
    }

    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean active) {
        isActive = active;
    }
}
