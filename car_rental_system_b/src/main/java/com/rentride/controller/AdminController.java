package com.rentride.controller;

import com.rentride.entity.User;
import com.rentride.entity.Car;
import com.rentride.entity.UserStatus;
import com.rentride.entity.Role;
import com.rentride.repository.UserRepository;
import com.rentride.service.AdminService;
import com.rentride.service.BookingService;
import com.rentride.service.CarService;
import com.rentride.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:3000")
public class AdminController {

    @Autowired
    private AdminService adminService;
    
    @Autowired
    private CarService carService;
    
    @Autowired
    private BookingService bookingService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private NotificationService notificationService;

    @Autowired
    private com.rentride.repository.ContactMessageRepository contactMessageRepository;

    @GetMapping("/contact-messages")
    public List<com.rentride.entity.ContactMessage> getAllMessages() {
        return contactMessageRepository.findAll();
    }

    @DeleteMapping("/contact-messages/{id}")
    public ResponseEntity<?> deleteMessage(@PathVariable Long id) {
        contactMessageRepository.deleteById(id);
        return ResponseEntity.ok("Message deleted");
    }

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return adminService.getAllUsers();
    }

    @GetMapping("/pending/{role}")
    public List<User> getPendingByRole(@PathVariable String role) {
        return userRepository.findAll().stream()
                .filter(u -> u.getStatus() == UserStatus.PENDING && u.getRole().name().equalsIgnoreCase(role))
                .collect(Collectors.toList());
    }

    @PutMapping("/users/{id}/approve")
    public ResponseEntity<?> approveUser(@PathVariable Long id) {
        User user = userRepository.findById(id).orElseThrow();
        user.setStatus(UserStatus.ACTIVE);
        userRepository.save(user);
        notificationService.createNotification(id, "Your account has been APPROVED by the admin. You can now login!", "ACCOUNT_APPROVED");
        return ResponseEntity.ok("User approved");
    }

    @PutMapping("/users/{id}/reject")
    public ResponseEntity<?> rejectUser(@PathVariable Long id) {
        User user = userRepository.findById(id).orElseThrow();
        userRepository.delete(user); // Delete rejected application
        notificationService.createNotification(id, "Your registration was rejected. Please contact support.", "ACCOUNT_REJECTED");
        return ResponseEntity.ok("User rejected");
    }

    @GetMapping("/cars/pending")
    public List<Car> getPendingCars() {
        return carService.getAllCars().stream()
                .filter(c -> c.getAvailability() == com.rentride.entity.Availability.PENDING)
                .collect(Collectors.toList());
    }

    @PutMapping("/cars/{id}/approve")
    public ResponseEntity<?> approveCar(@PathVariable Long id) {
        Car car = carService.getCarById(id);
        car.setAvailability(com.rentride.entity.Availability.AVAILABLE);
        carService.addCar(car); // Use addCar as save
        notificationService.createNotification(car.getOwnerId(), "Your car " + car.getBrand() + " " + car.getModel() + " has been APPROVED!", "CAR_APPROVED");
        return ResponseEntity.ok("Car approved");
    }

    @PutMapping("/cars/{id}/reject")
    public ResponseEntity<?> rejectCar(@PathVariable Long id) {
        Car car = carService.getCarById(id);
        carService.deleteCar(id);
        notificationService.createNotification(car.getOwnerId(), "Your car listing for " + car.getBrand() + " was rejected by admin.", "CAR_REJECTED");
        return ResponseEntity.ok("Car rejected");
    }

    @GetMapping("/cars")
    public ResponseEntity<?> getAllCars() {
        return ResponseEntity.ok(carService.getAllCars());
    }

    @GetMapping("/bookings")
    public ResponseEntity<?> getAllBookings() {
        return ResponseEntity.ok(bookingService.getAllBookings());
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        adminService.deleteUser(id);
        return ResponseEntity.ok("User deleted successfully");
    }

    @DeleteMapping("/cars/{id}")
    public ResponseEntity<?> deleteCar(@PathVariable Long id) {
        carService.deleteCar(id);
        return ResponseEntity.ok("Car listing removed successfully");
    }
}
