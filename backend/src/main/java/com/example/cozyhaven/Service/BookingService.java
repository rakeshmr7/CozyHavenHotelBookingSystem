package com.example.cozyhaven.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.cozyhaven.DTO.BookingDTO;
import com.example.cozyhaven.Entity.Booking;
import com.example.cozyhaven.Entity.Hotel;
import com.example.cozyhaven.Entity.Room;
import com.example.cozyhaven.Entity.User;
import com.example.cozyhaven.Enum.BookingStatus;
import com.example.cozyhaven.Enum.Role;
import com.example.cozyhaven.Exception.ResourceNotFoundException;
import com.example.cozyhaven.Mapper.BookingMapper;
import com.example.cozyhaven.Repository.BookingRepo;
import com.example.cozyhaven.Repository.HotelRepo;
import com.example.cozyhaven.Repository.RoomRepo;
import com.example.cozyhaven.Repository.UserRepo;

@Service
public class BookingService {

    @Autowired
    BookingRepo bookingRepo;

    @Autowired
    UserRepo userRepo;

    @Autowired
    HotelRepo hotelRepo;

    @Autowired
    RoomRepo roomRepo;

    public BookingDTO addBooking(BookingDTO booking1) {
        Booking booking = BookingMapper.toEntity(booking1);
        Room room = roomRepo.findById(
                booking.getRoom().getRoomId()).orElse(null);

        if (room == null) {

            throw new ResourceNotFoundException(
                    "Room not found");
        }

        long bookedRooms = bookingRepo.getBookedRoomCount(
                room.getRoomId(),
                booking.getCheckInDate(),
                booking.getCheckOutDate());
        long availableRooms = room.getTotalRooms() - bookedRooms;  
        System.out.println(booking.getRoom().getRoomId());                      
        System.out.println(room.getTotalRooms() + " " + bookedRooms + " " + availableRooms);
        if (

        booking1.getRoomsBooked() > availableRooms) {
            System.out.println("Booking not addded");
            throw new ResourceNotFoundException("Rooms not available");
        }
        booking.setRoom(room);
        booking.setBookingDate(LocalDate.now());
        booking.setStatus(BookingStatus.PENDING);
        booking = bookingRepo.save(booking);
        System.out.println("Booking Added");
        return BookingMapper.toDTO(booking);

    }

    public List<BookingDTO> showAll() {
        List<Booking> bookingList = bookingRepo.findAll();
        return bookingList.stream().map(BookingMapper::toDTO).toList();
    }

    public BookingDTO searchBookingById(int id) {
        Booking booking = bookingRepo.findById(id).orElse(null);
        return BookingMapper.toDTO(booking);
    }

    public List<BookingDTO> getUserBookings(int userId) {
        User customer = userRepo.findByUserIdAndRole(userId, Role.CUSTOMER);
        if (customer == null) {
            return new ArrayList<>();
        }
        return customer.getBookings()
                .stream().map(BookingMapper::toDTO)
                .toList();

    }

    public List<BookingDTO> upcomingStay(int userId) {
        User customer = userRepo.findByUserIdAndRole(userId, Role.CUSTOMER);
        if (customer == null) {
            return new ArrayList<>();
        }
        return customer.getBookings()
                .stream()
                .filter(b -> b.getCheckInDate().isAfter(LocalDate.now()))
                .map(BookingMapper::toDTO)
                .toList();
    }

    public List<BookingDTO> completedStay(int userId) {
        User customer = userRepo.findByUserIdAndRole(userId, Role.CUSTOMER);
        if (customer == null) {
            return new ArrayList<>();
        }
        return customer.getBookings()
                .stream()
                .filter(b -> b.getCheckOutDate().isBefore(LocalDate.now()))
                .map(BookingMapper::toDTO)
                .toList();
    }

    public BookingDTO updateBookingStatus(int bookingId, BookingStatus status) {
        Booking booking = bookingRepo.findById(bookingId).orElse(null);
        if (booking == null) {
            return null;
        }
        booking.setStatus(status);
        return BookingMapper.toDTO(bookingRepo.save(booking));
    }

    public BookingDTO approveRefund(int bookingId) {
        Booking booking = bookingRepo.findById(bookingId).orElse(null);
        if (booking == null) {
            return null;
        }
        booking.setStatus(BookingStatus.CANCELLED);
        booking.setRefundStatus("REFUNDED");
        booking.setRefundProcessedDate(LocalDate.now());
        return BookingMapper.toDTO(bookingRepo.save(booking));
    }

    public BookingDTO cancelBooking(int bookingId, String reason) {
        Booking b = bookingRepo.findById(bookingId).orElse(null);
        if (b == null) {
            return null;
        }

        b.setStatus(BookingStatus.CANCELLED);
        b.setRefundStatus("REFUND_REQUESTED");

        b.setRefundRequestDate(LocalDate.now());

        b.setRefundAmount(b.getTotalAmount());
        b.setCancellationReason(reason);

        return BookingMapper.toDTO(bookingRepo.save(b));
    }

    public List<BookingDTO> searchBookingByHotelId(int hotelId) {
        Hotel hotel = hotelRepo.findById(hotelId).orElse(null);
        if (hotel == null) {
            return new ArrayList<>();
        }
        List<Booking> bookingList = bookingRepo.findByHotelId(hotelId);
        return bookingList.stream().map(BookingMapper::toDTO).toList();
    }

    public void deleteBooking(int bookingId) {
        System.out.println("Service" + bookingId);

        bookingRepo.deleteById(bookingId);
    }
}
