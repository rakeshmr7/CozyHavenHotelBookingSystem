package com.example.cozyhaven.Controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.cozyhaven.ApiResponse.ApiResponse;
import com.example.cozyhaven.DTO.RoomDTO;
import com.example.cozyhaven.Exception.ResourceNotFoundException;
import com.example.cozyhaven.Service.RoomService;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Positive;

@RestController
@RequestMapping("/room")
@Validated
public class RoomController {

        @Autowired
        RoomService service;

        // GET ALL ROOMS
        @GetMapping("/all/getRooms/{hotelId}")
        public ResponseEntity<?> getRooms(
                        @PathVariable int hotelId) {

                List<RoomDTO> rooms = service.getRooms(hotelId);

                if (rooms.isEmpty()) {
                        throw new ResourceNotFoundException(
                                        "Rooms Not Found");
                }

                return ResponseEntity.ok(
                                new ApiResponse<>(
                                                "Rooms Found",
                                                HttpStatus.OK,
                                                rooms));
        }

        // ADD ROOM
        @PostMapping("/owner/addRoom")
        public ResponseEntity<?> addRoom(@Valid @RequestBody RoomDTO room) {

                RoomDTO r = service.addRoom(room);

                if (r == null) {
                        throw new ResourceNotFoundException(
                                        "Hotel Not Found");
                }

                return ResponseEntity.status(HttpStatus.CREATED)
                                .body(
                                                new ApiResponse<>(
                                                                "Room Added Successfully",
                                                                HttpStatus.CREATED,
                                                                r));
        }

        // SEARCH ROOM BY TYPE
        @GetMapping("/all/searchRoomByType/{type}")
        public ResponseEntity<?> searchRoomByType(
                        @PathVariable String type) {

                List<RoomDTO> rooms = service.searchRoomByType(type);

                if (rooms.isEmpty()) {
                        throw new ResourceNotFoundException(
                                        "Rooms Not Found");
                }

                return ResponseEntity.ok(
                                new ApiResponse<>(
                                                "Rooms Found",
                                                HttpStatus.OK,
                                                rooms));
        }

        // SEARCH ROOM BY ID
        @GetMapping("/all/searchRoomById/{id}")
        public ResponseEntity<?> searchRoomById(
                        @PathVariable int id) {

                RoomDTO room = service.searchRoomById(id);

                if (room == null) {
                        throw new ResourceNotFoundException(
                                        "Room Not Found");
                }

                return ResponseEntity.ok(
                                new ApiResponse<>(
                                                "Room Found",
                                                HttpStatus.OK,
                                                room));
        }

        // SEARCH AVAILABLE ROOMS
        @GetMapping("/all/searchAvailableRooms/{hotelId}")
        public ResponseEntity<?> searchAvailableRooms(
                        @PathVariable int hotelId) {

                List<RoomDTO> rooms = service.searchAvailableRooms(hotelId);

                if (rooms.isEmpty()) {
                        throw new ResourceNotFoundException(
                                        "No Available Rooms");
                }

                return ResponseEntity.ok(
                                new ApiResponse<>(
                                                "Available Rooms",
                                                HttpStatus.OK,
                                                rooms));
        }

        // SEARCH ROOM BY FARE
        @GetMapping("/all/searchRoomByFare/{fare}")
        public ResponseEntity<?> searchRoomByFare(
                        @Positive(message = "Fare must be greater than 0") @PathVariable double fare) {

                List<RoomDTO> rooms = service.searchRoomByFare(fare);

                if (rooms.isEmpty()) {
                        throw new ResourceNotFoundException(
                                        "Rooms Not Found");
                }

                return ResponseEntity.ok(
                                new ApiResponse<>(
                                                "Rooms Found",
                                                HttpStatus.OK,
                                                rooms));
        }

        // SEARCH ROOM BY AC
        @GetMapping("/all/searchRoomByAc/{ac}")
        public ResponseEntity<?> searchRoomByAc(
                        @PathVariable boolean ac) {

                List<RoomDTO> rooms = service.searchRoomByAc(ac);

                if (rooms.isEmpty()) {
                        throw new ResourceNotFoundException(
                                        "Rooms Not Found");
                }

                return ResponseEntity.ok(
                                new ApiResponse<>(
                                                "Rooms Found",
                                                HttpStatus.OK,
                                                rooms));
        }

        // UPDATE ROOM
        @PutMapping("/owner/updateRoomById/{id}")
        public ResponseEntity<?> updateRoomById(
                        @PathVariable int id,
                        @Valid @RequestBody RoomDTO room) {

                RoomDTO updatedRoom = service.updateRoomById(id, room);

                if (updatedRoom == null) {
                        throw new ResourceNotFoundException(
                                        "Room Not Found");
                }

                return ResponseEntity.ok(
                                new ApiResponse<>(
                                                "Room Updated Successfully",
                                                HttpStatus.OK,
                                                updatedRoom));
        }

        // DELETE ROOM
        @DeleteMapping("/owner/deleteRoomById/{id}")
        public ResponseEntity<?> deleteRoomById(
                        @PathVariable int id) {

                int result = service.deleteRoomById(id);

                if (result == 0) {
                        throw new ResourceNotFoundException(
                                        "Room Not Found");
                }

                return ResponseEntity.ok(
                                new ApiResponse<>(
                                                "Room Deleted Successfully",
                                                HttpStatus.OK,
                                                result));
        }

        @GetMapping("/all/availability/{hotelId}")
        public ResponseEntity<?> getAvailability(@PathVariable int hotelId, @RequestParam LocalDate checkIn, @RequestParam LocalDate checkOut) {
                return ResponseEntity.ok(new ApiResponse<>(
                        "Available Rooms fetched!!", HttpStatus.OK, service.getAvailableRooms(hotelId, checkIn, checkOut)));
        }
}
