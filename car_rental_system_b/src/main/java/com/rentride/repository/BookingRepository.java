package com.rentride.repository;

import com.rentride.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByCustomerId(Long customerId);
    List<Booking> findByCarId(Long carId);

    @Query("SELECT b FROM Booking b WHERE b.carId IN (SELECT c.carId FROM Car c WHERE c.ownerId = :ownerId)")
    List<Booking> findBookingsByOwnerId(@Param("ownerId") Long ownerId);
}
