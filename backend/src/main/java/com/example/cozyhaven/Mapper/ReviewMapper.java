package com.example.cozyhaven.Mapper;

import com.example.cozyhaven.DTO.ReviewDTO;
import com.example.cozyhaven.Entity.Hotel;
import com.example.cozyhaven.Entity.Review;
import com.example.cozyhaven.Entity.User;

import java.time.LocalDateTime;

public class ReviewMapper {

    public static Review toEntity(ReviewDTO dto) {
        Review review = new Review();

        review.setRating(dto.getRating());
        review.setComment(dto.getComment());
        review.setReviewDate(LocalDateTime.now());

        if(dto.getCustomerId() != 0){
            User user = new User();
            user.setUserId(dto.getCustomerId());
            review.setCustomer(user);
        }

        if(dto.getHotelId() != 0){
            Hotel hotel = new Hotel();
            hotel.setHotelId(dto.getHotelId());
            review.setHotel(hotel);
        }

        return review;
    }

    public static ReviewDTO toDto(Review review) {
        if(review == null) return null;
        ReviewDTO dto = new ReviewDTO();

        dto.setId(review.getId());
        dto.setRating(review.getRating());
        dto.setComment(review.getComment());
        dto.setReviewDate(review.getReviewDate());

        if(review.getCustomer() != null){
            dto.setCustomerId(review.getCustomer().getUserId());
        }

        if(review.getHotel() != null){
            dto.setHotelId(review.getHotel().getHotelId());
        }

        return dto;
    }
}