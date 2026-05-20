package com.example.cozyhaven.Mapper;

import com.example.cozyhaven.DTO.PaymentDTO;
import com.example.cozyhaven.Entity.Booking;
import com.example.cozyhaven.Entity.Payment;

import java.time.LocalDateTime;

public class PaymentMapper {

    public static Payment toEntity(PaymentDTO dto){
        Payment p = new Payment();

        p.setAmount(dto.getAmount());
        p.setPaymentDate(LocalDateTime.now());
        p.setPaymentMethod(dto.getPaymentMethod());
        p.setTransactionId(dto.getTransactionId());
        p.setPaymentStatus(dto.getPaymentStatus());
        p.setRefundAmount(dto.getRefundAmount());
        p.setRefundDate(dto.getRefundDate());
        p.setRefundStatus(dto.getRefundStatus());

        if(dto.getBookingId()!=0){
            Booking b = new Booking();
            b.setBookingId(dto.getBookingId());
            p.setBooking(b);
        }

        return p;
    }

    public static PaymentDTO toDto(Payment p){
        PaymentDTO dto = new PaymentDTO();

        dto.setPaymentId(p.getPaymentId());
        dto.setAmount(p.getAmount());
        dto.setPaymentDate(p.getPaymentDate());
        dto.setPaymentMethod(p.getPaymentMethod());
        dto.setTransactionId(p.getTransactionId());
        dto.setPaymentStatus(p.getPaymentStatus());
        dto.setRefundAmount(p.getRefundAmount());
        dto.setRefundDate(p.getRefundDate());
        dto.setRefundStatus(p.getRefundStatus());

        if(p.getBooking()!=null){
            dto.setBookingId(p.getBooking().getBookingId());
        }

        return dto;
    }
}