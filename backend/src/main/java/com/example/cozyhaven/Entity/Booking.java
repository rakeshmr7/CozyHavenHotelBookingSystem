package com.example.cozyhaven.Entity;

import java.time.LocalDate;

import com.example.cozyhaven.Enum.BookingStatus;
import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int bookingId;
    private int adultCount;
    private int childCount;
    private LocalDate checkInDate;
    private LocalDate checkOutDate;
    private LocalDate bookingDate;
    private double totalAmount;
    private String hotelName;
    private String roomType;
    private int roomsBooked;
    private int userId;
    private int hotelId;

    @Enumerated(EnumType.STRING)
    private BookingStatus status;

    private String cancellationReason;
    private Double refundAmount;
    private LocalDate refundRequestDate;
    private LocalDate refundProcessedDate;
    private String refundStatus;

    @ManyToOne
    @JoinColumn(name = "customerId")
    @JsonBackReference("user_bookings") //Avoids Dependency Loop - Child -> BackReference
    private User user;

    @ManyToOne
    @JoinColumn(name = "roomId")
    private Room room;
}
