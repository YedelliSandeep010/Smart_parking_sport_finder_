package com.parkease.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "bookings")
public class Booking {
    @Id
    private String id;
    private String slotId;
    private String userId;
    private String userRole;
    private String userName;
    private String vehicleNo;
    private Long startTime; // Timestamp
    private Long endTime; // Timestamp
    private String status; // active, completed
    private double cost;

    public Booking() {
    }

    public Booking(String id, String slotId, String userId, String userRole, String userName, String vehicleNo,
            Long startTime, Long endTime, String status, double cost) {
        this.id = id;
        this.slotId = slotId;
        this.userId = userId;
        this.userRole = userRole;
        this.userName = userName;
        this.vehicleNo = vehicleNo;
        this.startTime = startTime;
        this.endTime = endTime;
        this.status = status;
        this.cost = cost;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getSlotId() {
        return slotId;
    }

    public void setSlotId(String slotId) {
        this.slotId = slotId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getUserRole() {
        return userRole;
    }

    public void setUserRole(String userRole) {
        this.userRole = userRole;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getVehicleNo() {
        return vehicleNo;
    }

    public void setVehicleNo(String vehicleNo) {
        this.vehicleNo = vehicleNo;
    }

    public Long getStartTime() {
        return startTime;
    }

    public void setStartTime(Long startTime) {
        this.startTime = startTime;
    }

    public Long getEndTime() {
        return endTime;
    }

    public void setEndTime(Long endTime) {
        this.endTime = endTime;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public double getCost() {
        return cost;
    }

    public void setCost(double cost) {
        this.cost = cost;
    }
}
