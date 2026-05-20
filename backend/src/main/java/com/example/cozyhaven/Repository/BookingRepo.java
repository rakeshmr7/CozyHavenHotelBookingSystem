package com.example.cozyhaven.Repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.cozyhaven.Entity.Booking;

public interface BookingRepo extends JpaRepository<Booking, Integer> {

    List<Booking> findByHotelId(int hotelId);

    @Query("""
            SELECT COALESCE(SUM(b.roomsBooked),0)
            FROM Booking b
            WHERE b.room.roomId = :roomId
            AND b.status IN ('PENDING', 'CONFIRMED')
            AND b.checkInDate < :checkOut
            AND b.checkOutDate > :checkIn
            """)
    long getBookedRoomCount(@Param("roomId") int roomId, @Param("checkIn") LocalDate checkIn,
            @Param("checkOut") LocalDate checkOut);
}
