package com.rentride.controller;

import com.rentride.entity.Booking;
import com.rentride.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "http://localhost:3000")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @PostMapping
    public ResponseEntity<Booking> createBooking(@RequestBody Booking booking) {
        return ResponseEntity.ok(bookingService.createBooking(booking));
    }

    @PutMapping("/{id}/confirm")
    public ResponseEntity<Booking> confirmBooking(@PathVariable Long id) {
        return ResponseEntity.ok(bookingService.confirmBooking(id));
    }

    @PutMapping("/{id}/reject")
    public ResponseEntity<Booking> rejectBooking(@PathVariable Long id) {
        return ResponseEntity.ok(bookingService.rejectBooking(id));
    }

    @PutMapping("/{id}/checkin")
    public ResponseEntity<Booking> checkInBooking(@PathVariable Long id) {
        return ResponseEntity.ok(bookingService.checkInBooking(id));
    }

    @PutMapping("/{id}/checkout")
    public ResponseEntity<Booking> checkoutBooking(@PathVariable Long id) {
        return ResponseEntity.ok(bookingService.checkoutBooking(id));
    }

    @GetMapping("/user/{id}")
    public List<Booking> getBookingsByUser(@PathVariable Long id) {
        return bookingService.getBookingsByCustomer(id);
    }

    @GetMapping("/car/{id}")
    public List<Booking> getBookingsByCar(@PathVariable Long id) {
        return bookingService.getBookingsByCar(id);
    }

    @GetMapping("/owner/{id}")
    public List<Booking> getBookingsByOwner(@PathVariable Long id) {
        return bookingService.getBookingsByOwner(id);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> cancelBooking(@PathVariable Long id) {
        bookingService.cancelBooking(id);
        return ResponseEntity.ok("Booking cancelled successfully");
    }
}
