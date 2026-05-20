package com.example.cozyhaven.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.cozyhaven.Entity.Room;

public interface RoomRepo extends JpaRepository<Room, Integer> {

    List<Room> findByHotel_HotelId(int hotelId);

    List<Room> findByRoomType(String roomType);

    List<Room> findByHotel_HotelIdAndTotalAvailableGreaterThan(
            int hotelId,
            int value
    );

    List<Room> findByBaseFareLessThanEqual(double fare);

    List<Room> findByAc(boolean ac);
}
