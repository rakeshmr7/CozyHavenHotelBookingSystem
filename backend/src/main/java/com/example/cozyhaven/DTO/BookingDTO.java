package com.example.cozyhaven.DTO;

import java.time.LocalDate;

import com.example.cozyhaven.Enum.BookingStatus;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookingDTO {

    private Integer bookingId;
    private String hotelName;
    private String roomType;
    private int roomsBooked;
    private LocalDate checkInDate;
    private LocalDate checkOutDate;
    private int childCount;
    private int adultCount;
    private double totalAmount;
    private BookingStatus status;
    private int roomId;
    private int userId;
    private String cancellationReason;
    private int hotelId;
    private Double refundAmount;
    private LocalDate refundRequestDate;
    private LocalDate refundProcessedDate;
    private String refundStatus;

    public BookingDTO(String hotelName, String roomType, int roomsBooked, LocalDate checkInDate,
            LocalDate checkOutDate, int childCount, int adultCount, double totalAmount, BookingStatus status,
            int roomId, int hotelId, Double refundAmount, LocalDate refundRequestDate, LocalDate refundProcessedDate,
        String refundStatus) {
        this.hotelName = hotelName;
        this.roomType = roomType;
        this.roomsBooked = roomsBooked;
        this.checkInDate = checkInDate;
        this.checkOutDate = checkOutDate;
        this.childCount = childCount;
        this.adultCount = adultCount;
        this.totalAmount = totalAmount;
        this.status = status;
        this.roomId = roomId;
        this.hotelId = hotelId;
        this.refundAmount = refundAmount;
        this.refundRequestDate = refundRequestDate;
        this.refundProcessedDate = refundProcessedDate;
        this.refundStatus = refundStatus;
    }
}
