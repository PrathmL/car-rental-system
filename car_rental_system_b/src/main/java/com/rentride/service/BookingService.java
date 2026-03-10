package com.rentride.service;

import com.rentride.entity.Booking;
import com.rentride.entity.BookingStatus;
import com.rentride.repository.BookingRepository;
import com.rentride.repository.CarRepository;
import com.rentride.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private CarRepository carRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private NotificationService notificationService;

    private Booking populateNames(Booking booking) {
        userRepository.findById(booking.getCustomerId()).ifPresent(u -> {
            booking.setCustomerName(u.getName());
            booking.setCustomerDocumentUrl(u.getDocumentUrl());
        });
        carRepository.findById(booking.getCarId()).ifPresent(c -> booking.setCarName(c.getBrand() + " " + c.getModel()));
        return booking;
    }

    public Booking createBooking(Booking booking) {
        booking.setBookingStatus(BookingStatus.PENDING);
        Booking saved = bookingRepository.save(booking);

        carRepository.findById(booking.getCarId()).ifPresent(car -> {
            notificationService.createNotification(
                car.getOwnerId(), 
                "New Booking Request for " + car.getBrand() + " " + car.getModel(),
                "BOOKING_REQUEST"
            );
        });

        return saved;
    }

    public Booking confirmBooking(Long bookingId) {
        Booking booking = bookingRepository.findById(bookingId).orElseThrow();
        booking.setBookingStatus(BookingStatus.CONFIRMED);
        notificationService.createNotification(booking.getCustomerId(), "Your booking for " + booking.getCarId() + " confirmed!", "BOOKING_CONFIRMED");
        return bookingRepository.save(booking);
    }

    public Booking rejectBooking(Long bookingId) {
        Booking booking = bookingRepository.findById(bookingId).orElseThrow();
        booking.setBookingStatus(BookingStatus.REJECTED);
        notificationService.createNotification(booking.getCustomerId(), "Your booking for " + booking.getCarId() + " was rejected.", "BOOKING_REJECTED");
        return bookingRepository.save(booking);
    }

    public Booking checkInBooking(Long bookingId) {
        Booking booking = bookingRepository.findById(bookingId).orElseThrow();
        booking.setBookingStatus(BookingStatus.ACTIVE);
        
        carRepository.findById(booking.getCarId()).ifPresent(car -> {
            car.setAvailability(com.rentride.entity.Availability.BOOKED);
            carRepository.save(car);
            notificationService.createNotification(car.getOwnerId(), "Customer has checked in for booking #" + bookingId, "BOOKING_ACTIVE");
        });
        
        return bookingRepository.save(booking);
    }

    public Booking checkoutBooking(Long bookingId) {
        Booking booking = bookingRepository.findById(bookingId).orElseThrow();
        booking.setBookingStatus(BookingStatus.COMPLETED);
        
        carRepository.findById(booking.getCarId()).ifPresent(car -> {
            car.setAvailability(com.rentride.entity.Availability.AVAILABLE);
            carRepository.save(car);
            notificationService.createNotification(booking.getCustomerId(), "Trip completed! Thank you for using RentRide.", "BOOKING_COMPLETED");
        });
        
        return bookingRepository.save(booking);
    }

    public List<Booking> getBookingsByOwner(Long ownerId) {
        return bookingRepository.findBookingsByOwnerId(ownerId).stream()
                .map(this::populateNames)
                .collect(Collectors.toList());
    }

    public List<Booking> getBookingsByCustomer(Long customerId) {
        return bookingRepository.findByCustomerId(customerId).stream()
                .map(this::populateNames)
                .collect(Collectors.toList());
    }

    public List<Booking> getBookingsByCar(Long carId) {
        return bookingRepository.findByCarId(carId).stream()
                .map(this::populateNames)
                .collect(Collectors.toList());
    }

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll().stream()
                .map(this::populateNames)
                .collect(Collectors.toList());
    }

    public void cancelBooking(Long id) {
        bookingRepository.deleteById(id);
    }
}
