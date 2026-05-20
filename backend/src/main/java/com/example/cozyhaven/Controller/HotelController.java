package com.example.cozyhaven.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.cozyhaven.ApiResponse.ApiResponse;
import com.example.cozyhaven.DTO.HotelDTO;
import com.example.cozyhaven.Exception.ResourceNotFoundException;
import com.example.cozyhaven.Service.HotelService;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;

@CrossOrigin(origins = "http://localhost:3000") //allowing cross-origin requests from the specified origin (e.g., a frontend application running on localhost:3000).
@RestController
@RequestMapping("/hotel")
@Validated //validate parameters in methods.
public class HotelController {

    @Autowired
    HotelService service;

    @PostMapping("/owner/addHotel")
    public ResponseEntity<?> addHotel(@Valid @RequestBody HotelDTO dto) {
        HotelDTO hotelDTO = service.addHotel(dto);
        if (hotelDTO == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        return ResponseEntity.status(HttpStatus.CREATED).body(new ApiResponse<>("Hotel added!! ", HttpStatus.CREATED, hotelDTO));
    }

    @GetMapping("/all/showAll")
    public ResponseEntity<?> showAllHotels() {
        List<HotelDTO> hotels = service.showAllHotels();
        if (hotels.isEmpty()) {
            throw new ResourceNotFoundException("No Hotels found");
        }
        return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse<>("Hotels found ", HttpStatus.OK, hotels));
    }

    @GetMapping("/all/searchById/{id}")
    public ResponseEntity<?> searchHotelById(@PathVariable int id) {
        System.out.println("Fetching hotel obj for payment");
        HotelDTO h = service.searchHotelById(id);
        if (h == null) {
            throw new ResourceNotFoundException("Hotel not found");
        }
        return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse<>("Hotel found ", HttpStatus.OK, h));
    }

    @GetMapping("/all/searchByLocation/{location}")
    public ResponseEntity<?> searchHotelByLocation(@NotNull(message = "Location cannot be empty") @PathVariable String location) {
        List<HotelDTO> h = service.searchHotelByLocation(location);
        if (h.isEmpty()) {
            throw new ResourceNotFoundException("Hotel not found");
        }
        return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse<>("Hotel found ", HttpStatus.OK, h));
    }

    @GetMapping("/owner/searchByOwnerId/{id}")
    public ResponseEntity<?> searchHotelByOwnerId(@PathVariable int id) {
        List<HotelDTO> h = service.searchHotelByOwnerId(id);
        if (h.isEmpty()) {
            throw new ResourceNotFoundException("Hotel not found");
        }
        return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse<>("Hotel found: ", HttpStatus.OK, h));
    }

    @PutMapping("/owner/updateById/{id}")
    public ResponseEntity<?> updateHotelById(@PathVariable int id, @RequestBody HotelDTO hotel) {
        HotelDTO h = service.searchHotelById(id);
        if (h == null) {
            throw new ResourceNotFoundException("Hotel not found");
        } else {
            h = service.updateHotelById(id, hotel);
            return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse<>("Hotel updated ", HttpStatus.OK, h));
        }

    }

    //can't delete without deleting in amenties tables usually but using this method possible
    //if all hotel delete amenties table also deleted automatically
    @DeleteMapping("/admin/deleteById/{id}")
    public ResponseEntity<?> deleteHotelById(@PathVariable int id) {
        HotelDTO h = service.searchHotelById(id);
        if (h == null) {
            throw new ResourceNotFoundException("Hotel not found");
        } else {
            String r = service.deleteHotelById(id);
            return ResponseEntity.status(HttpStatus.GONE).body(new ApiResponse<>("Hotel deleted", HttpStatus.GONE, r));
        }
    }

//    POST /hotel/addHotel
//    GET /hotel/showAll
//    GET /hotel/searchById/{id}
//    GET /hotel/searchByLocation/{location}
//    GET /hotel/searchByOwnerId/{id}
//    PUT /hotel/updateById/{id}
//    DELETE /hotel/deleteById/{id}
//    GET /hotel/getRooms/{hotelid}
//    POST /hotel/addRooms/{id}
}
