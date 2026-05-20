package com.example.cozyhaven.Repository;

import com.example.cozyhaven.Entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewRepo  extends JpaRepository<Review,Integer> {
    List<Review> findByHotel_HotelId(int hotelid);

    List<Review> findByCustomer_UserId(int userid);
}
