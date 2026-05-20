package com.example.cozyhaven.Repository;

import com.example.cozyhaven.Entity.Hotel;
import com.example.cozyhaven.Entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface HotelRepo extends JpaRepository<Hotel, Integer> {

    @Query("select r from Room r where r.hotel.hotelId=?1")
    List<Room> getRooms(int hotelId);

   List<Hotel>findAllByLocation(String location);
    List<Hotel> findAllByOwner_UserId(int id);
}
