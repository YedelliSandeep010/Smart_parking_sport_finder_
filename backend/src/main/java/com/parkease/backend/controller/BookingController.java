package com.parkease.backend.controller;

import com.parkease.backend.model.Booking;
import com.parkease.backend.model.ParkingSlot;
import com.parkease.backend.repository.BookingRepository;
import com.parkease.backend.repository.ParkingSlotRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private ParkingSlotRepository slotRepository;

    @GetMapping
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    @PostMapping("/book")
    public ResponseEntity<?> bookSlot(@RequestBody Booking booking) {
        return slotRepository.findById(booking.getSlotId())
                .map(slot -> {
                    if (!slot.isActive())
                        return ResponseEntity.badRequest().body(Map.of("message", "Slot is disabled"));
                    if (slot.isMaintenance())
                        return ResponseEntity.badRequest().body(Map.of("message", "Slot is under maintenance"));

                    // Simple logic: if booking starts now, mark occupied
                    long now = System.currentTimeMillis();
                    if (booking.getStartTime() <= now && (booking.getEndTime() == null || booking.getEndTime() > now)) {
                        slot.setOccupied(true);
                        slotRepository.save(slot);
                    }

                    if (booking.getId() == null) {
                        booking.setId("B" + System.currentTimeMillis());
                    }
                    booking.setStatus("active");
                    return ResponseEntity.ok(bookingRepository.save(booking));
                })
                .orElse(ResponseEntity.badRequest().body(Map.of("message", "Slot not found")));
    }

    @PostMapping("/release/{id}")
    public ResponseEntity<?> releaseSlot(@PathVariable String id) {
        return bookingRepository.findById(id)
                .map(booking -> {
                    long endTime = System.currentTimeMillis();
                    long durationMs = endTime - booking.getStartTime();
                    long durationHours = (long) Math.ceil(durationMs / (1000.0 * 60 * 60));
                    double ratePerHour = 50.0;
                    double totalCost = durationHours * ratePerHour;

                    booking.setEndTime(endTime);
                    booking.setStatus("completed");
                    booking.setCost(totalCost);
                    bookingRepository.save(booking);

                    slotRepository.findById(booking.getSlotId()).ifPresent(slot -> {
                        slot.setOccupied(false);
                        slotRepository.save(slot);
                    });

                    return ResponseEntity.ok(booking);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/user/{userId}")
    public List<Booking> getByUserId(@PathVariable String userId) {
        return bookingRepository.findByUserId(userId);
    }
}
