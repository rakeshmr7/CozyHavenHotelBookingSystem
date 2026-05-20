package com.example.cozyhaven.Mapper;

import com.example.cozyhaven.DTO.UserDTO;
import com.example.cozyhaven.Entity.User;

public class UserMapper {
    public static User toEntity(UserDTO userDTO){
        User user = new User();

        user.setFirstName(userDTO.getFirstName());
        user.setLastName(userDTO.getLastName());
        user.setAge(userDTO.getAge());
        user.setGender(userDTO.getGender());
        user.setEmail(userDTO.getEmail());
        user.setPassword(userDTO.getPassword());
        user.setContact(userDTO.getContact());
        user.setAddress(userDTO.getAddress());
        user.setRole(userDTO.getRole());
        return user;
    }

    public static UserDTO toDTO(User user){
        if(user == null) return null;
        UserDTO userDTO = new UserDTO();

        userDTO.setUserId(user.getUserId());
        userDTO.setFirstName(user.getFirstName());
        userDTO.setLastName(user.getLastName());
        userDTO.setAge(user.getAge());
        userDTO.setGender(user.getGender());
        userDTO.setEmail(user.getEmail());
        userDTO.setPassword(user.getPassword());
        userDTO.setContact(user.getContact());
        userDTO.setAddress(user.getAddress());
        userDTO.setRole(user.getRole());
        return userDTO;
    }
}
