package com.example.cozyhaven.DTO;

import lombok.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PaymentDTO {

    private Integer paymentId;
    private double amount;
    private LocalDateTime paymentDate;
    private String paymentMethod;
    private String transactionId;
    private String paymentStatus;

    private Double refundAmount; //wrapper cls since optional
    private LocalDateTime refundDate;
    private String refundStatus;
    private int bookingId;
}