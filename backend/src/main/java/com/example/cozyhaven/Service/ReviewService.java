package com.example.cozyhaven.Service;


import com.example.cozyhaven.DTO.ReviewDTO;
import com.example.cozyhaven.Entity.Review;
import com.example.cozyhaven.Mapper.ReviewMapper;
import com.example.cozyhaven.Repository.ReviewRepo;
import org.jspecify.annotations.Nullable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepo repo;


    public ReviewDTO addReview(ReviewDTO review) {
        Review rev = ReviewMapper.toEntity(review);
        rev = repo.save(rev);
        return ReviewMapper.toDto(rev);
    }

    public List<ReviewDTO> showAllReviews() {
        List<Review> reviews = repo.findAll();
        return reviews.stream().map(ReviewMapper::toDto).toList();
    }

    public ReviewDTO searchReviewById(int id) {
        Review r=repo.findById(id).orElse(null);
        if(r==null) return null;
        return ReviewMapper.toDto(r);
    }


    public List<ReviewDTO> searchReviewByHotelId(int hotelid) {
        List<Review>list =repo.findByHotel_HotelId(hotelid);
        return list.stream().map(ReviewMapper::toDto).toList();
    }


    public List<ReviewDTO> searchReviewByUserId(int userid) {
        List<Review>list = repo.findByCustomer_UserId(userid);
        return list.stream().map(ReviewMapper::toDto).toList();
    }


    public ReviewDTO updateReviewById(int id, ReviewDTO review) {

            Review r=repo.findById(id).orElse(null);

            if(r!=null) {
                Review review1=ReviewMapper.toEntity(review);
                r= repo.save(review1);
                return ReviewMapper.toDto(r);
            }

            return null;

    }


    public String deleteReviewById(int id) {
        Review r=repo.findById(id).orElse(null);
        if(r!=null) {
            repo.deleteById(id);
            return "Review has been deleted";
        }
        return "No such review found";
    }
}
