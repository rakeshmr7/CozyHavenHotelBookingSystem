package com.example.cozyhaven.Entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Hotel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int hotelId;
    @NotBlank(message = "Hotel name cannot be empty")
    private String hotelName;
    private String description;
    @NotBlank(message = "Location cannot be empty")
    private String location;
    @NotBlank(message = "Contact cannot be empty")
    private String contact;
    private String imageUrl;

    @ElementCollection
    private List<String> amenities; //wifi, parking, roomService, pool, dining, gym

    @ManyToOne
    @JoinColumn(name = "owner_id") //not ownerId becoz the column created will be owner_id
    @JsonBackReference("owner_hotels") //Avoids Dependency Loop - Child -> BackReference
    private User owner;

    @OneToMany(mappedBy = "hotel", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Review> reviews;

    @OneToMany(mappedBy = "hotel", cascade = CascadeType.ALL)
    @JsonManagedReference("hotel_rooms")
    List<Room> rooms;

    private double ratings;
    private double standard;
    private double deluxe;
    private double suite;

}
