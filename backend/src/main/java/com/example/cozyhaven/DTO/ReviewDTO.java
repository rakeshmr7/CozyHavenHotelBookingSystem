package com.example.cozyhaven.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReviewDTO {

    private Integer id;
    private Double rating;
    private String comment;
    private LocalDateTime reviewDate;
    private int customerId;
    private int hotelId;
}