package com.example.cozyhaven.Controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.cozyhaven.ApiResponse.ApiResponse;
import com.example.cozyhaven.DTO.LoginDTO;
import com.example.cozyhaven.DTO.UserDTO;
import com.example.cozyhaven.DTO.UserResponseDTO;
import com.example.cozyhaven.Enum.Role;
import com.example.cozyhaven.Service.UserService;
import com.example.cozyhaven.Util.JwtUtil;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor // similar to autowired it requires variables to be private final
@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public ResponseEntity<?> register(UserDTO user) {
        UserDTO user1 = userService.findUserByEmail(user.getEmail());
        if (user1 != null) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(new ApiResponse<>("Email already exists", HttpStatus.CONFLICT, null));
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userService.registerUser(user);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new ApiResponse<>("Account created successfully!!", HttpStatus.CREATED, null));
    }

    @PostMapping("/customer/register")
    public ResponseEntity<?> registerCustomer(@RequestBody UserDTO user) {
        user.setRole(Role.CUSTOMER);
        return register(user);
    }

    @PostMapping("/owner/register")
    public ResponseEntity<?> registerOwner(@RequestBody UserDTO user) {
        user.setRole(Role.OWNER);
        return register(user);
    }

    @PostMapping("/admin/register")
    public ResponseEntity<?> registerAdmin(@RequestBody UserDTO user) {
        user.setRole(Role.ADMIN);
        return register(user);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDTO l) {
        System.out.println("Hiiii entered");
        String email = l.getEmail();
        String password = l.getPassword();
        UserDTO user = userService.findUserByEmail(email);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ApiResponse<>("User not found!!", HttpStatus.UNAUTHORIZED, null));
        }
        System.out.println("User fetched");
        if (!passwordEncoder.matches(password, user.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ApiResponse<>("Invalid member", HttpStatus.UNAUTHORIZED, null));
        }
        String token = jwtUtil.generateToken(email, user.getRole());// token assigned to frontend4
        user.setPassword("****");
        UserResponseDTO u = new UserResponseDTO(token, user);

        System.out.println("Hiiii token generated");

        return ResponseEntity.status(HttpStatus.OK)
                .body(new ApiResponse<>("Login Success!!!", HttpStatus.OK, u));// token to postman
    }

}
