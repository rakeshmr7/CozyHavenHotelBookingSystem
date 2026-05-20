package com.example.cozyhaven.DTO;

import com.example.cozyhaven.Enum.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {
    private Integer userId;
    private String firstName;
    private String lastName;
    private int age;
    private String gender;
    private String email;
    private String password;
    private String contact;
    private String address;
    private Role role;

    public UserDTO(String firstName, String lastName, int age, String gender,
                   String email, String password, String contact, String address, Role role) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.gender = gender;
        this.email = email;
        this.password = password;
        this.contact = contact;
        this.address = address;
        this.role = role;
    }
}
