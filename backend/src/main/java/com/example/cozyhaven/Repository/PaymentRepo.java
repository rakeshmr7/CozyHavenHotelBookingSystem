package com.example.cozyhaven.Repository;

import com.example.cozyhaven.Entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface PaymentRepo extends JpaRepository<Payment, Integer> {
    List<Payment> findByBooking_BookingId(int bookingId);
}
