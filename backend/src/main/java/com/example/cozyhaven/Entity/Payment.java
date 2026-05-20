package com.example.cozyhaven.Entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor

public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int paymentId;

    private double amount;
    private LocalDateTime paymentDate;
    private String paymentMethod;
    private String transactionId;
    private String paymentStatus;

    private Double refundAmount;
    private LocalDateTime refundDate;
    private String refundStatus;

    @OneToOne
    @JoinColumn(name = "bookingId")
    private Booking booking;//one booking id used for one payment
}