package com.parkease.backend.repository;

import com.parkease.backend.model.ParkingSlot;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ParkingSlotRepository extends JpaRepository<ParkingSlot, String> {
}
