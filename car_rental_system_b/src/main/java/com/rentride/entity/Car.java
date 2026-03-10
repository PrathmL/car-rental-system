package com.rentride.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "cars")
public class Car {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long carId;
    
    private Long ownerId;
    private String brand;
    private String model;
    private int year;
    private double pricePerDay;
    private String location;
    
    @Enumerated(EnumType.STRING)
    private Availability availability;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    @Column(length = 1000)
    private String imageUrl;
    
    private String rcBookUrl;
    private String pucUrl;

    @Transient
    private String ownerName;

    public Car() {}

    public Long getCarId() { return carId; }
    public void setCarId(Long carId) { this.carId = carId; }
    public Long getOwnerId() { return ownerId; }
    public void setOwnerId(Long ownerId) { this.ownerId = ownerId; }
    public String getBrand() { return brand; }
    public void setBrand(String brand) { this.brand = brand; }
    public String getModel() { return model; }
    public void setModel(String model) { this.model = model; }
    public int getYear() { return year; }
    public void setYear(int year) { this.year = year; }
    public double getPricePerDay() { return pricePerDay; }
    public void setPricePerDay(double pricePerDay) { this.pricePerDay = pricePerDay; }
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
    public Availability getAvailability() { return availability; }
    public void setAvailability(Availability availability) { this.availability = availability; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    public String getRcBookUrl() { return rcBookUrl; }
    public void setRcBookUrl(String rcBookUrl) { this.rcBookUrl = rcBookUrl; }
    public String getPucUrl() { return pucUrl; }
    public void setPucUrl(String pucUrl) { this.pucUrl = pucUrl; }
    public String getOwnerName() { return ownerName; }
    public void setOwnerName(String ownerName) { this.ownerName = ownerName; }
}
