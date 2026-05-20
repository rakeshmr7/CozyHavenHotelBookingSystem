package com.example.cozyhaven.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RoomDTO {

    private Integer roomId;
    private String roomType;
    private int maxOccupy;
    private double baseFare;
    private boolean ac;
    private int totalAvailable;
    private int hotelId;
    private int totalRooms;

    public RoomDTO(String roomType, int maxOccupy, double baseFare, boolean ac,
            int totalAvailable, int hotelId, int totalRooms) {
        this.roomType = roomType;
        this.maxOccupy = maxOccupy;
        this.baseFare = baseFare;
        this.ac = ac;
        this.totalAvailable = totalAvailable;
        this.hotelId = hotelId;
        this.totalRooms = totalRooms;
    }
}
