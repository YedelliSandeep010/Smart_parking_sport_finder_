package com.parkease.backend.controller;

import com.parkease.backend.model.ParkingSlot;
import com.parkease.backend.repository.ParkingSlotRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/slots")
public class SlotController {

    @Autowired
    private ParkingSlotRepository slotRepository;

    @GetMapping
    public List<ParkingSlot> getAllSlots() {
        return slotRepository.findAll();
    }

    @PostMapping
    public ParkingSlot addSlot(@RequestBody ParkingSlot slot) {
        if (slot.getId() == null) {
            slot.setId("S" + System.currentTimeMillis());
        }
        slot.setOccupied(false);
        slot.setMaintenance(false);
        slot.setActive(true);
        return slotRepository.save(slot);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ParkingSlot> updateSlot(@PathVariable String id, @RequestBody ParkingSlot slotDetails) {
        return slotRepository.findById(id)
                .map(slot -> {
                    slot.setRegion(slotDetails.getRegion());
                    slot.setCity(slotDetails.getCity());
                    slot.setVenue(slotDetails.getVenue());
                    slot.setLocation(slotDetails.getLocation());
                    slot.setType(slotDetails.getType());
                    slot.setX(slotDetails.getX());
                    slot.setY(slotDetails.getY());
                    slot.setOccupied(slotDetails.isOccupied());
                    slot.setMaintenance(slotDetails.isMaintenance());
                    slot.setActive(slotDetails.isActive());
                    return ResponseEntity.ok(slotRepository.save(slot));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteSlot(@PathVariable String id) {
        return slotRepository.findById(id)
                .map(slot -> {
                    slotRepository.delete(slot);
                    return ResponseEntity.ok().build();
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/{id}/toggle-maintenance")
    public ResponseEntity<ParkingSlot> toggleMaintenance(@PathVariable String id) {
        return slotRepository.findById(id)
                .map(slot -> {
                    slot.setMaintenance(!slot.isMaintenance());
                    return ResponseEntity.ok(slotRepository.save(slot));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/{id}/toggle-active")
    public ResponseEntity<ParkingSlot> toggleActive(@PathVariable String id) {
        return slotRepository.findById(id)
                .map(slot -> {
                    slot.setActive(!slot.isActive());
                    return ResponseEntity.ok(slotRepository.save(slot));
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
