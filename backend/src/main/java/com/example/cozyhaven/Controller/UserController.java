package com.example.cozyhaven.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.cozyhaven.ApiResponse.ApiResponse;
import com.example.cozyhaven.DTO.UserDTO;
import com.example.cozyhaven.Exception.ResourceNotFoundException;
import com.example.cozyhaven.Service.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/user")
@Validated //validate parameters in methods.
public class UserController {

    @Autowired
    UserService userService;

    //there is no separate register method for diff roles
    @PostMapping("/all/registerUser")
    public ResponseEntity<ApiResponse<?>> registerUser(@Valid @RequestBody UserDTO user) {
        return ResponseEntity.status(HttpStatus.OK).body(
                new ApiResponse<>("User Registered Successfully!!!", HttpStatus.OK, userService.registerUser(user))
        );
    }

    @GetMapping("/admin/showAllCustomers")
    public ResponseEntity<ApiResponse<List<UserDTO>>> showAllCustomers() {
        List<UserDTO> userList = userService.showAllCustomers();
        if (userList.isEmpty()) {
            throw new ResourceNotFoundException("No customer available!!!");
        }
        return ResponseEntity.status(HttpStatus.FOUND).body(
                new ApiResponse<>("All customers fetched successfully", HttpStatus.FOUND, userList)
        );
    }

    @GetMapping("/admin/showAllOwners")
    public ResponseEntity<ApiResponse<List<UserDTO>>> showAllOwners() {
        List<UserDTO> userList = userService.showAllOwners();
        if (userList.isEmpty()) {
            throw new ResourceNotFoundException("No owner available!!!");
        }
        return ResponseEntity.status(HttpStatus.FOUND).body(
                new ApiResponse<>("All owner fetched successfully", HttpStatus.FOUND, userList)
        );
    }

    @GetMapping("/all/searchCustomer/{id}")
    public ResponseEntity<ApiResponse<?>> searchCustomer(@PathVariable int id) {
        UserDTO customer = userService.searchCustomer(id);
        if (customer == null) {
            throw new ResourceNotFoundException("Customer not found");
        }
        return ResponseEntity.status(HttpStatus.FOUND).body(
                new ApiResponse<>("Customer found", HttpStatus.FOUND, customer)
        );

    }

    @GetMapping("/admin/searchOwner/{id}")
    public ResponseEntity<ApiResponse<?>> searchOwner(@PathVariable int id) {
        UserDTO owner = userService.searchOwner(id);
        if (owner == null) {
            throw new ResourceNotFoundException("Owner not found");
        }
        return ResponseEntity.status(HttpStatus.FOUND).body(
                new ApiResponse<>("Owner found", HttpStatus.FOUND, owner)
        );//instead of owner there was Http.sTATUS.noTfOUND
    }

    @DeleteMapping("/admin/deleteCustomer/{id}")
    public ResponseEntity<ApiResponse<?>> deleteCustomer(@PathVariable int id) {
        UserDTO customer = userService.searchCustomer(id);
        if (customer == null) {
            throw new ResourceNotFoundException("Customer not found");
        }
        userService.deleteCustomer(id);
        return ResponseEntity.status(HttpStatus.GONE).body(
                new ApiResponse<>("Customer deleted", HttpStatus.GONE, customer)
        );
    }

    @DeleteMapping("/admin/deleteOwner/{id}")
    public ResponseEntity<ApiResponse<?>> deleteOwner(@PathVariable int id) {
        UserDTO owner = userService.searchOwner(id);
        if (owner == null) {
            throw new ResourceNotFoundException("Owner not found");
        }
        userService.deleteOwner(id);
        return ResponseEntity.status(HttpStatus.GONE).body(
                new ApiResponse<>("Owner deleted", HttpStatus.GONE, owner)
        );
    }

    @PutMapping("/customer/updateCustomer/{id}")
    public ResponseEntity<ApiResponse<?>> updateCustomer(@PathVariable int id, @Valid @RequestBody UserDTO user) {
        UserDTO existingCustomer = userService.searchCustomer(id);
        if (existingCustomer == null) {
            throw new ResourceNotFoundException("Customer not found");
        }
        UserDTO updatedCustomer = userService.updateCustomer(id, user);
        return ResponseEntity.status(HttpStatus.OK).body(
                new ApiResponse<>("Customer updated successfully", HttpStatus.OK, updatedCustomer)
        );
    }

    @PutMapping("/owner/updateOwner/{id}")
    public ResponseEntity<ApiResponse<?>> updateOwner(@PathVariable int id, @Valid @RequestBody UserDTO user) {
        UserDTO existingOwner = userService.searchOwner(id);
        if (existingOwner == null) {
            throw new ResourceNotFoundException("Owner not found");
        }
        UserDTO updatedOwner = userService.updateCustomer(id, user);
        return ResponseEntity.status(HttpStatus.OK).body(
                new ApiResponse<>("Owner updated successfully", HttpStatus.OK, updatedOwner)
        );
    }
}

// POST /user/registerUser
//
// GET /user/showAllCustomers
//
// GET /user/showAllOwners
//
// GET /user/searchCustomer/{id}
//
// GET /user/searchOwner/{id}
//
// DELETE /user/deleteCustomer/{id}
//
// DELETE /user/deleteOwner/{id}
