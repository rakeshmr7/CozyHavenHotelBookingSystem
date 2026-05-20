package com.example.cozyhaven.Controller;

import com.example.cozyhaven.ApiResponse.ApiResponse;
import com.example.cozyhaven.DTO.ReviewDTO;
import com.example.cozyhaven.Exception.ResourceNotFoundException;
import org.springframework.web.bind.annotation.RestController;
import com.example.cozyhaven.Entity.Review;
import com.example.cozyhaven.Service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000") //allowing cross-origin requests from the specified origin (e.g., a frontend application running on localhost:3000).
@RestController
@RequestMapping("/review")
public class ReviewController {

    @Autowired
    ReviewService service;

    @PostMapping("/customer/addReview")
    public ResponseEntity<?> addReview(@RequestBody ReviewDTO review) {
        return ResponseEntity.status(HttpStatus.CREATED).body(new ApiResponse("Review added", HttpStatus.CREATED, service.addReview(review)));
    }

    @GetMapping("/all/showAll")
    public ResponseEntity<?> showAllReviews() {
        List<ReviewDTO> reviews = service.showAllReviews();
        if (reviews.isEmpty()) {
            throw new ResourceNotFoundException("Reviews not found");
        }
        return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse<>("Reviews found", HttpStatus.OK, reviews));
    }

    @GetMapping("/all/searchById/{id}")
    public ResponseEntity<?> searchReviewById(@PathVariable int id) {
        ReviewDTO r = service.searchReviewById(id);
        if (r == null) {
            throw new ResourceNotFoundException("Review not found");
        }
        return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse<>("Review found", HttpStatus.OK, r));
    }

    @GetMapping("/all/searchByHotelId/{hotelid}")
    public ResponseEntity<?> searchReviewByHotelId(@PathVariable int hotelid) {
        List<ReviewDTO> reviews = service.searchReviewByHotelId(hotelid);
        if (reviews.isEmpty()) {
            throw new ResourceNotFoundException("Review not found");
        }
        return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse<>("Review found", HttpStatus.OK, reviews));
    }

    @GetMapping("/customer/searchByUserId/{userid}")
    public ResponseEntity<?> searchReviewByUserId(@PathVariable int userid) {
        List<ReviewDTO> reviews = service.searchReviewByUserId(userid);
        if (reviews.isEmpty()) {
            throw new ResourceNotFoundException("Review not found");
        }
        return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse<>("Review found", HttpStatus.OK, reviews));
    }

    @PutMapping("/customer/editById/{id}")
    public ResponseEntity<?> editReviewById(@PathVariable int id, @RequestBody ReviewDTO review) {
        ReviewDTO r = service.searchReviewById(id);
        if (r == null) {
            throw new ResourceNotFoundException("Review not found");
        } else {
            r = service.updateReviewById(id, review);
            return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse<>("Review updated", HttpStatus.OK, r));
        }
    }

    @DeleteMapping("/all/deleteById/{id}")
    public ResponseEntity<?> deleteReviewById(@PathVariable int id) {
        ReviewDTO r = service.searchReviewById(id);
        if (r == null) {
            throw new ResourceNotFoundException("Review not found");
        } else {
            String res = service.deleteReviewById(id);
            return ResponseEntity.status(HttpStatus.GONE).body(new ApiResponse<>("Review deleted", HttpStatus.GONE, res));
        }
    }
//all working methods
//    POST /review/addReview
//
//    GET /review/showAll
//
//    GET /review/searchById/{id}
//
//    GET /review/searchByHotelId/{hotelid}
//
//    GET /review/searchByUserId/{userid}
//
//    PUT /review/updateById/{id}
//
//    DELETE /review/deleteById/{id}

}
