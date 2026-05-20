package com.example.cozyhaven.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int roomId;
    @NotBlank(message = "Room type cannot be empty")
    private String roomType;
    @Min(value = 1)
    private int maxOccupy;
    @Positive(message = "Base fare cannot be 0 or less")
    private double baseFare;
    private boolean ac;
    private int totalAvailable;
    private int totalRooms;

    @ManyToOne
    @JoinColumn(name = "hotel_id")
    @JsonBackReference("hotel_rooms")
    private Hotel hotel;

    public Room(String roomType, int maxOccupy, boolean ac, double baseFare,
            int totalAvailable, Hotel hotel, int totalRooms) {
        this.roomType = roomType;
        this.maxOccupy = maxOccupy;
        this.ac = ac;
        this.baseFare = baseFare;
        this.totalAvailable = totalAvailable;
        this.hotel = hotel;
        this.totalRooms = totalRooms;
    }
}
