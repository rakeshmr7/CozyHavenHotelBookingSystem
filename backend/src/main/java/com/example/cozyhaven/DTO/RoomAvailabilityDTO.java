package com.example.cozyhaven.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RoomAvailabilityDTO {
    private int roomId;
    private String roomType;
    private int totalRooms;
    private long bookedRooms;
    private long availableRooms;
    private boolean available;
}
