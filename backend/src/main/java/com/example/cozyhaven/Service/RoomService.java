package com.example.cozyhaven.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.cozyhaven.DTO.RoomAvailabilityDTO;
import com.example.cozyhaven.DTO.RoomDTO;
import com.example.cozyhaven.Entity.Room;
import com.example.cozyhaven.Mapper.RoomMapper;
import com.example.cozyhaven.Repository.BookingRepo;
import com.example.cozyhaven.Repository.RoomRepo;

@Service
public class RoomService {

        @Autowired
        RoomRepo repo;

        @Autowired
        BookingRepo bookingRepo;

        // GET ALL ROOMS OF HOTEL
        public List<RoomDTO> getRooms(int hotelId) {

                List<Room> rooms = repo.findByHotel_HotelId(hotelId);

                return rooms.stream()
                                .map(RoomMapper::toDto)
                                .toList();
        }

        // ADD ROOM
        public RoomDTO addRoom(RoomDTO roomDTO) {

                Room room = RoomMapper.toEntity(roomDTO);

                Room savedRoom = repo.save(room);

                return RoomMapper.toDto(savedRoom);
        }

        // SEARCH ROOM BY TYPE
        public List<RoomDTO> searchRoomByType(
                        String type) {

                List<Room> rooms = repo.findByRoomType(type);

                return rooms.stream()
                                .map(RoomMapper::toDto)
                                .toList();
        }

        // SEARCH ROOM BY ID
        public RoomDTO searchRoomById(int id) {

                Room room = repo.findById(id)
                                .orElse(null);

                if (room == null) {
                        return null;
                }

                return RoomMapper.toDto(room);
        }

        // SEARCH AVAILABLE ROOMS
        public List<RoomDTO> searchAvailableRooms(
                        int hotelId) {

                List<Room> rooms = repo
                                .findByHotel_HotelIdAndTotalAvailableGreaterThan(
                                                hotelId,
                                                0);

                return rooms.stream()
                                .map(RoomMapper::toDto)
                                .toList();
        }

        // SEARCH ROOM BY FARE
        public List<RoomDTO> searchRoomByFare(
                        double fare) {

                List<Room> rooms = repo.findByBaseFareLessThanEqual(fare);

                return rooms.stream()
                                .map(RoomMapper::toDto)
                                .toList();
        }

        // SEARCH ROOM BY AC
        public List<RoomDTO> searchRoomByAc(
                        boolean ac) {

                List<Room> rooms = repo.findByAc(ac);

                return rooms.stream()
                                .map(RoomMapper::toDto)
                                .toList();
        }

        // UPDATE ROOM
        public RoomDTO updateRoomById(
                        int id,
                        RoomDTO roomDTO) {

                Room existingRoom = repo.findById(id)
                                .orElse(null);

                if (existingRoom == null) {
                        return null;
                }

                existingRoom.setRoomType(
                                roomDTO.getRoomType());

                existingRoom.setMaxOccupy(
                                roomDTO.getMaxOccupy());

                existingRoom.setBaseFare(
                                roomDTO.getBaseFare());

                existingRoom.setAc(
                                roomDTO.isAc());

                existingRoom.setTotalAvailable(
                                roomDTO.getTotalAvailable());

                existingRoom.setTotalRooms(
                                roomDTO.getTotalRooms());

                Room updatedRoom = repo.save(existingRoom);

                return RoomMapper.toDto(updatedRoom);
        }

        // DELETE ROOM
        public int deleteRoomById(int id) {

                Room room = repo.findById(id)
                                .orElse(null);

                if (room == null) {
                        return 0;
                }

                repo.deleteById(id);

                return 1;
        }

        public List<RoomAvailabilityDTO> getAvailableRooms(int hotelId, LocalDate checkIn, LocalDate checkOut) {
                List<Room> rooms = repo.findByHotel_HotelId(hotelId);
                List<RoomAvailabilityDTO> response = new ArrayList<>();
                for (Room room : rooms) {
                        long bookedRooms = bookingRepo.getBookedRoomCount(room.getRoomId(), checkIn, checkOut);
                        long availableRooms = room.getTotalRooms() - bookedRooms;
                        RoomAvailabilityDTO dto = new RoomAvailabilityDTO();

                        dto.setRoomId(room.getRoomId());
                        dto.setRoomType(room.getRoomType());
                        dto.setTotalRooms(room.getTotalRooms());
                        dto.setBookedRooms(bookedRooms);
                        dto.setAvailableRooms(availableRooms);
                        dto.setAvailable(availableRooms > 0);
                        response.add(dto);
                }
                return response;
        }
}
