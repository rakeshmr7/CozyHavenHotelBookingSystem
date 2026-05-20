package com.example.cozyhaven.Exception;


import com.example.cozyhaven.ApiResponse.ApiResponse;
import jakarta.validation.ConstraintViolationException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;


import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ApiResponse<Object>> handleNotFound(ResourceNotFoundException ex) {


        return ResponseEntity.status(HttpStatus.NOT_FOUND.value())
                .body(new ApiResponse<>(ex.getMessage(), HttpStatus.NOT_FOUND, null));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class) //For adding methods
    public ResponseEntity<ApiResponse<Map<String, String>>>
    handleValidationExceptions(MethodArgumentNotValidException e){
        Map<String, String> errors = new HashMap<>();
        e.getBindingResult().getFieldErrors().forEach(error -> errors.put(error.getField(),
                error.getDefaultMessage()));

        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(new ApiResponse<>("Invalid Input", HttpStatus.BAD_REQUEST, errors));
    }

    @ExceptionHandler(ConstraintViolationException.class) //For update methods
    public ResponseEntity<ApiResponse<Map<String, String>>>
    handleValidationException(ConstraintViolationException e){
        Map<String, String> errors = new HashMap<>();
        e.getConstraintViolations().forEach(error -> {
            String field = error.getPropertyPath().toString();
            String message = error.getMessage();
            errors.put(field, message);
        });

        return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(new ApiResponse<>("Invalid input",HttpStatus.NOT_ACCEPTABLE,errors));
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<ApiResponse<Object>> handleDuplicate(DataIntegrityViolationException ex) {

        String msg = ex.getRootCause().getMessage();

        if (msg.contains("Duplicate") || msg.contains("email")) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(new ApiResponse<>("Email already exists", HttpStatus.CONFLICT, null));
        }

        if (msg.contains("foreign key") || msg.contains("hotel_id")) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse<>("Foreign key Id doesn't exists", HttpStatus.BAD_REQUEST, null));
        }

        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(new ApiResponse<>("Database constraint violation", HttpStatus.BAD_REQUEST, null));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<Object>> handleGeneral(Exception ex)
    {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ApiResponse<>(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR, null));
    }

}