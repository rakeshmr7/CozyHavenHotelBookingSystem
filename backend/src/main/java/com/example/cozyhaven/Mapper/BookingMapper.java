package com.example.cozyhaven.Mapper;

import com.example.cozyhaven.DTO.BookingDTO;
import com.example.cozyhaven.Entity.Booking;
import com.example.cozyhaven.Entity.Room;
import com.example.cozyhaven.Entity.User;

public class BookingMapper {

    public static BookingDTO toDTO(Booking booking) {

        if (booking == null) {
            return null;
        }

        BookingDTO dto = new BookingDTO();

        dto.setBookingId(booking.getBookingId());

        dto.setHotelName(booking.getHotelName());

        dto.setRoomType(booking.getRoomType());

        dto.setRoomsBooked(booking.getRoomsBooked());

        dto.setAdultCount(booking.getAdultCount());

        dto.setChildCount(booking.getChildCount());

        dto.setCheckInDate(booking.getCheckInDate());

        dto.setCheckOutDate(booking.getCheckOutDate());

        dto.setTotalAmount(booking.getTotalAmount());

        dto.setStatus(booking.getStatus());

        dto.setCancellationReason(booking.getCancellationReason());

        dto.setRefundAmount(
                booking.getRefundAmount());

        dto.setRefundRequestDate(
                booking.getRefundRequestDate());

        dto.setRefundProcessedDate(
                booking.getRefundProcessedDate());

        dto.setRefundStatus(
                booking.getRefundStatus());

        dto.setHotelId(booking.getHotelId());

        dto.setRoomId(
                booking.getRoom() != null
                        ? booking.getRoom().getRoomId()
                        : 0);

        dto.setUserId(booking.getUserId());

        return dto;
    }

    public static Booking toEntity(BookingDTO dto) {

        if (dto == null) {
            return null;
        }

        Booking booking = new Booking();

        booking.setHotelName(dto.getHotelName());

        booking.setRoomType(dto.getRoomType());

        booking.setRoomsBooked(dto.getRoomsBooked());
        
        booking.setAdultCount(dto.getAdultCount());

        booking.setChildCount(dto.getChildCount());

        booking.setCheckInDate(dto.getCheckInDate());

        booking.setCheckOutDate(dto.getCheckOutDate());

        booking.setTotalAmount(dto.getTotalAmount());

        booking.setStatus(dto.getStatus());

        booking.setCancellationReason(dto.getCancellationReason());

        booking.setRefundAmount(
                dto.getRefundAmount());

        booking.setRefundRequestDate(
                dto.getRefundRequestDate());

        booking.setRefundProcessedDate(
                dto.getRefundProcessedDate());

        booking.setRefundStatus(
                dto.getRefundStatus());

        booking.setUserId(dto.getUserId());

        booking.setHotelId(dto.getHotelId());

        if (dto.getRoomId() != 0) {

            Room room = new Room();

            room.setRoomId(dto.getRoomId());

            booking.setRoom(room);
        }

        if (dto.getUserId() != 0) {

            User user = new User();

            user.setUserId(dto.getUserId());

            booking.setUser(user);
        }

        return booking;
    }
}
