package com.example.cozyhaven.Service;

import com.example.cozyhaven.DTO.PaymentDTO;
import com.example.cozyhaven.Entity.Booking;
import com.example.cozyhaven.Entity.Payment;
import com.example.cozyhaven.Mapper.PaymentMapper;
import com.example.cozyhaven.Repository.BookingRepo;
import com.example.cozyhaven.Repository.PaymentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class PaymentService {

    @Autowired
    PaymentRepo repo;

    @Autowired
    BookingRepo bookingRepo;

    public PaymentDTO makePayment( PaymentDTO dto){
        Booking b = bookingRepo.findById(dto.getBookingId()).orElse(null);
        if(b==null){
            return null;
        }

        Payment p = PaymentMapper.toEntity(dto);
        p.setBooking(b);
        p.setAmount(b.getTotalAmount());
        p.setPaymentDate(LocalDateTime.now());
        p.setPaymentStatus("SUCCESS");
        p.setRefundStatus("NOT_REQUESTED");

        Payment p1 = repo.save(p);
        return PaymentMapper.toDto(p1);
    }

    public List<PaymentDTO> getAllPayments(){
        List<Payment> list = repo.findAll();
        return list.stream().map(PaymentMapper::toDto).toList();
    }

    public PaymentDTO searchPaymentById(int id){
        Payment p = repo.findById(id).orElse(null);
        if(p==null){
            return null;
        }
        return PaymentMapper.toDto(p);
    }

    public List<PaymentDTO> searchPaymentByBookingId(int bookingId){
        List<Payment> list = repo.findByBooking_BookingId(bookingId);
        return list.stream().map(PaymentMapper::toDto).toList();
    }

    public PaymentDTO updatePaymentStatus(int id, String status){
        Payment p = repo.findById(id).orElse(null);
        if(p==null){
            return null;
        }
        p.setPaymentStatus(status);
        return PaymentMapper.toDto(repo.save(p));
    }

    public PaymentDTO requestRefund(int id){
        Payment p = repo.findById(id).orElse(null);
        if(p==null){
            return null;
        }
        p.setRefundStatus("REQUESTED");
        return PaymentMapper.toDto(repo.save(p));
    }

    public PaymentDTO approveRefund(int id){
        Payment p = repo.findById(id).orElse(null);
        if(p==null){
            return null;
        }
        p.setRefundStatus("APPROVED");
        return PaymentMapper.toDto(repo.save(p));
    }

    public PaymentDTO rejectRefund(int id){
        Payment p = repo.findById(id).orElse(null);
        if(p==null){
            return null;
        }
        p.setRefundStatus("REJECTED");
        return PaymentMapper.toDto(repo.save(p));
    }

    public PaymentDTO refundPayment(int id){
        Payment p = repo.findById(id).orElse(null);
        if(p==null){
            return null;
        }
        p.setRefundAmount(p.getAmount());
        p.setRefundDate(LocalDateTime.now());
        p.setRefundStatus("COMPLETED");
        p.setPaymentStatus("REFUNDED");

        return PaymentMapper.toDto(repo.save(p));
    }
}