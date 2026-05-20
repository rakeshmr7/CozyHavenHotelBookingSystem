package com.example.cozyhaven.Mapper;

import com.example.cozyhaven.DTO.RoomDTO;
import com.example.cozyhaven.Entity.Hotel;
import com.example.cozyhaven.Entity.Room;

public class RoomMapper {

    public static Room toEntity(RoomDTO roomDTO) {
        Room room = new Room();
        room.setRoomType(roomDTO.getRoomType());
        room.setMaxOccupy(roomDTO.getMaxOccupy());
        room.setBaseFare(roomDTO.getBaseFare());
        room.setAc(roomDTO.isAc());
        room.setTotalAvailable(roomDTO.getTotalAvailable());
        room.setTotalRooms(roomDTO.getTotalRooms());

        if (roomDTO.getHotelId() != 0) {
            Hotel hotel = new Hotel();
            hotel.setHotelId(roomDTO.getHotelId());
            room.setHotel(hotel);
        }

        return room;
    }

    public static RoomDTO toDto(Room room) {
        if (room == null) {
            return null;
        }
        RoomDTO dto = new RoomDTO();
        dto.setRoomId(room.getRoomId());
        dto.setRoomType(room.getRoomType());
        dto.setMaxOccupy(room.getMaxOccupy());
        dto.setBaseFare(room.getBaseFare());
        dto.setAc(room.isAc());
        dto.setTotalAvailable(room.getTotalAvailable());
        dto.setTotalRooms(room.getTotalRooms());

        if (room.getHotel() != null) {
            dto.setHotelId(room.getHotel().getHotelId());
        }

        return dto;
    }
}
