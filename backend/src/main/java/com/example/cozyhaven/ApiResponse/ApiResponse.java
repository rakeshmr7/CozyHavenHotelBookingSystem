package com.example.cozyhaven.ApiResponse;
import lombok.Data;
import org.springframework.http.HttpStatus;
import java.time.LocalDateTime;

@Data
public class ApiResponse<T> {

    private String message;
    private HttpStatus status;
    private LocalDateTime timestamp;
    private T data;

    public ApiResponse() {
        this.timestamp = LocalDateTime.now();
    }

    public ApiResponse(String message, HttpStatus status, T data) {
        this.message = message;
        this.status = status;
        this.data = data;
        this.timestamp = LocalDateTime.now();
    }
}