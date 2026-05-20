package com.example.cozyhaven.DTO;

import java.util.List;

import com.example.cozyhaven.Entity.Review;

import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class HotelDTO {

    private Integer hotelId;//becoz when entity is autoincrement user wont sent id then this is null in dto int cant be null prbm
    private String hotelName;
    @NotEmpty
    private String description;
    private String location;
    private String contact;
    private String imageUrl;

    private List<String> amenities;

    private int ownerId;
    private List<Review> reviews;

    private double ratings;
    private double standard;
    private double deluxe;
    private double suite;
}
