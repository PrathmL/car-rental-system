package com.rentride.service;

import com.rentride.entity.Car;
import com.rentride.repository.CarRepository;
import com.rentride.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CarService {

    @Autowired
    private CarRepository carRepository;

    @Autowired
    private UserRepository userRepository;

    private Car populateNames(Car car) {
        userRepository.findById(car.getOwnerId()).ifPresent(u -> car.setOwnerName(u.getName()));
        return car;
    }

    public List<Car> getAvailableCars(LocalDate start, LocalDate end) {
        return carRepository.findAvailableCars(start, end).stream()
                .map(this::populateNames)
                .collect(Collectors.toList());
    }

    public List<Car> getAllCars() {
        return carRepository.findAll().stream()
                .map(this::populateNames)
                .collect(Collectors.toList());
    }

    public Car getCarById(Long id) {
        return carRepository.findById(id)
                .map(this::populateNames)
                .orElseThrow(() -> new RuntimeException("Car not found"));
    }

    public List<Car> getCarsByOwner(Long ownerId) {
        return carRepository.findByOwnerId(ownerId).stream()
                .map(this::populateNames)
                .collect(Collectors.toList());
    }

    public Car addCar(Car car) {
        return carRepository.save(car);
    }

    public Car updateCar(Long id, Car carDetails) {
        Car car = getCarById(id);
        car.setPricePerDay(carDetails.getPricePerDay());
        car.setAvailability(carDetails.getAvailability());
        car.setDescription(carDetails.getDescription());
        return carRepository.save(car);
    }

    public void deleteCar(Long id) {
        carRepository.deleteById(id);
    }
}
