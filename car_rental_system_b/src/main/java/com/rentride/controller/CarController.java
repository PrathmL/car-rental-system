package com.rentride.controller;

import com.rentride.entity.Car;
import com.rentride.entity.Availability;
import com.rentride.entity.Role;
import com.rentride.service.CarService;
import com.rentride.service.NotificationService;
import com.rentride.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/cars")
@CrossOrigin(origins = "http://localhost:3000")
public class CarController {

    @Autowired
    private CarService carService;

    @Autowired
    private NotificationService notificationService;

    @Autowired
    private UserRepository userRepository;

    private final String UPLOAD_DIR = "uploads/";

    private String saveFile(MultipartFile file) throws IOException {
        Path uploadPath = Paths.get(UPLOAD_DIR);
        if (!Files.exists(uploadPath)) Files.createDirectories(uploadPath);
        String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
        Path filePath = uploadPath.resolve(fileName);
        Files.copy(file.getInputStream(), filePath);
        return "/uploads/" + fileName;
    }

    @PostMapping
    public ResponseEntity<?> addCar(
            @RequestParam("brand") String brand,
            @RequestParam("model") String model,
            @RequestParam("year") int year,
            @RequestParam("pricePerDay") double pricePerDay,
            @RequestParam("location") String location,
            @RequestParam("description") String description,
            @RequestParam("ownerId") Long ownerId,
            @RequestParam("image") MultipartFile image,
            @RequestParam("rcBook") MultipartFile rcBook,
            @RequestParam("puc") MultipartFile puc) {

        try {
            Car car = new Car();
            car.setBrand(brand);
            car.setModel(model);
            car.setYear(year);
            car.setPricePerDay(pricePerDay);
            car.setLocation(location);
            car.setDescription(description);
            car.setOwnerId(ownerId);
            car.setAvailability(Availability.PENDING); // Mark as Pending verification
            
            car.setImageUrl(saveFile(image));
            car.setRcBookUrl(saveFile(rcBook));
            car.setPucUrl(saveFile(puc));

            Car savedCar = carService.addCar(car);

            // Notify Admin
            userRepository.findAll().stream()
                .filter(u -> u.getRole() == Role.ADMIN)
                .forEach(admin -> {
                    notificationService.createNotification(admin.getId(), "New Car registration request: " + brand + " " + model, "CAR_REGISTRATION_REQUEST");
                });

            return ResponseEntity.ok(savedCar);

        } catch (IOException e) {
            return ResponseEntity.internalServerError().body("Error saving car files");
        }
    }

    @GetMapping("/available")
    public List<Car> getAvailableCars(
            @RequestParam("start") String start,
            @RequestParam("end") String end) {
        // This query already filters out any car NOT in the bookings table overlapping.
        // We should also make sure only non-PENDING cars are returned.
        return carService.getAvailableCars(java.time.LocalDate.parse(start), java.time.LocalDate.parse(end));
    }

    @GetMapping
    public List<Car> getAllCars() {
        return carService.getAllCars();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Car> getCarById(@PathVariable Long id) {
        return ResponseEntity.ok(carService.getCarById(id));
    }

    @GetMapping("/owner/{id}")
    public List<Car> getCarsByOwner(@PathVariable Long id) {
        return carService.getCarsByOwner(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Car> updateCar(@PathVariable Long id, @RequestBody Car car) {
        return ResponseEntity.ok(carService.updateCar(id, car));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCar(@PathVariable Long id) {
        carService.deleteCar(id);
        return ResponseEntity.ok("Car deleted successfully");
    }
}
