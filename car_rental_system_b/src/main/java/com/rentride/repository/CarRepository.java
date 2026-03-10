package com.rentride.repository;

import com.rentride.entity.Car;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface CarRepository extends JpaRepository<Car, Long> {
    List<Car> findByOwnerId(Long ownerId);

    // Find cars that are AVAILABLE and DO NOT have overlapping bookings
    @Query("SELECT c FROM Car c WHERE c.availability = 'AVAILABLE' AND c.carId NOT IN (" +
           "SELECT b.carId FROM Booking b WHERE " +
           "(b.startDate <= :endDate AND b.endDate >= :startDate))")
    List<Car> findAvailableCars(@Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);
}
