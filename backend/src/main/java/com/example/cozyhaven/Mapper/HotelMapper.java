package com.example.cozyhaven.Mapper;

import com.example.cozyhaven.DTO.HotelDTO;
import com.example.cozyhaven.Entity.Hotel;
import com.example.cozyhaven.Entity.User;

public class HotelMapper {

    public static Hotel toEntity(HotelDTO dto) {

        Hotel hotel = new Hotel();

        hotel.setHotelName(dto.getHotelName());

        hotel.setDescription(dto.getDescription());

        hotel.setLocation(dto.getLocation());

        hotel.setContact(dto.getContact());

        hotel.setImageUrl(dto.getImageUrl());

        hotel.setAmenities(dto.getAmenities());

        hotel.setRatings(dto.getRatings());

        hotel.setStandard(dto.getStandard());

        hotel.setDeluxe(dto.getDeluxe());

        hotel.setSuite(dto.getSuite());

        if (dto.getOwnerId() != 0) {

            User owner = new User();

            owner.setUserId(dto.getOwnerId());

            hotel.setOwner(owner);
        }

        return hotel;
    }

    public static HotelDTO toDto(Hotel hotel) {
        if (hotel == null) {
            return null;
        }
        HotelDTO dto = new HotelDTO();
        dto.setHotelId(hotel.getHotelId());
        dto.setHotelName(hotel.getHotelName());
        dto.setDescription(hotel.getDescription());
        dto.setLocation(hotel.getLocation());
        dto.setContact(hotel.getContact());
        dto.setReviews(hotel.getReviews());
        dto.setImageUrl(hotel.getImageUrl());
        dto.setAmenities(hotel.getAmenities());
        dto.setRatings(hotel.getRatings());
        dto.setStandard(hotel.getStandard());
        dto.setDeluxe(hotel.getDeluxe());
        dto.setSuite(hotel.getSuite());

        if (hotel.getOwner() != null) { //to avoid null pointer excep
            dto.setOwnerId(hotel.getOwner().getUserId());
        }
        return dto;
    }
}
