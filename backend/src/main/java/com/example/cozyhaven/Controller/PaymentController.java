
package com.example.cozyhaven.Controller;

import com.example.cozyhaven.ApiResponse.ApiResponse;
import com.example.cozyhaven.DTO.PaymentDTO;
import com.example.cozyhaven.Exception.ResourceNotFoundException;
import com.example.cozyhaven.Service.PaymentService;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.List;
//done
@RestController
@RequestMapping("/payment")
public class PaymentController {

    @Autowired
    PaymentService service;

    @PostMapping("/customer/makePayment")
    public ResponseEntity<ApiResponse<?>> makePayment( @RequestBody PaymentDTO dto){
        PaymentDTO p = service.makePayment(dto);
        if(p==null){
            throw new ResourceNotFoundException("Booking not found");
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(
                new ApiResponse<>("Payment Success", HttpStatus.CREATED, p)
        );
    }

    @GetMapping("/admin/showAll")
    public ResponseEntity<ApiResponse<?>> showAll(){
        List<PaymentDTO> list = service.getAllPayments();
        if(list.isEmpty())
            throw new ResourceNotFoundException("No payment made");
        return ResponseEntity.status(HttpStatus.OK).body(
                new ApiResponse<>("All payment fetched", HttpStatus.OK, list)
        );
    }
//both admin and customer
    @GetMapping("/customer/searchById/{id}")
    public ResponseEntity<ApiResponse<?>> searchPaymentById(@PathVariable int id){
        PaymentDTO p = service.searchPaymentById(id);
        if(p==null){
            throw new ResourceNotFoundException("Payment not found!!");
        }
        return ResponseEntity.status(HttpStatus.OK).body(
                new ApiResponse<>("Payment found", HttpStatus.OK, p)
        );
    }
//all
    @GetMapping("/all/searchByBookingId/{bookingId}")
    public ResponseEntity<ApiResponse<?>> searchPaymentByBookingId(@PathVariable int bookingId){
        List<PaymentDTO> list = service.searchPaymentByBookingId(bookingId);
        if(list.isEmpty()){
            throw new ResourceNotFoundException("Payment not found");
        }
        return ResponseEntity.status(HttpStatus.OK).body(
                new ApiResponse<>("Payment found", HttpStatus.OK, list)
        );
    }
//
    @PutMapping("/admin/updatePaymentStatus/{id}/{status}")
    public ResponseEntity<ApiResponse<?>> updatePaymentStatus(@PathVariable int id,@PathVariable String status){
        PaymentDTO p = service.updatePaymentStatus(id,status);
        if(p==null){
            throw new ResourceNotFoundException("Payment not found");
        }
        return ResponseEntity.status(HttpStatus.OK).body(
                new ApiResponse<>("Payment updated", HttpStatus.OK, p)
        );
    }


    @PutMapping("/customer/requestRefund/{id}")
    public ResponseEntity<ApiResponse<?>> requestRefund(@PathVariable int id){
        PaymentDTO p = service.requestRefund(id);
        if(p==null){
            throw new ResourceNotFoundException("Payment not found");
        }
        return ResponseEntity.status(HttpStatus.OK).body(
                new ApiResponse<>("Request submitted", HttpStatus.OK, p)
        );
    }

    @PutMapping("/owner/approveRefund/{id}")
    public ResponseEntity<?> approveRefund(@PathVariable int id){
        PaymentDTO p = service.approveRefund(id);
        if(p==null){
            throw new ResourceNotFoundException("Payment not found");
        }
        return ResponseEntity.status(HttpStatus.OK).body(
                new ApiResponse<>("Refund approved", HttpStatus.OK, p)
        );
    }

    @PutMapping("/owner/rejectRefund/{id}")
    public ResponseEntity<?> rejectRefund(@PathVariable int id){
        PaymentDTO p = service.rejectRefund(id);
        if(p==null){
            throw new ResourceNotFoundException("Payment not found");
        }
        return ResponseEntity.status(HttpStatus.OK).body(
                new ApiResponse<>("Refund rejected", HttpStatus.OK, p)
        );
    }

    @PutMapping("/owner/refundPayment/{id}")
    public ResponseEntity<?> refundPayment(@PathVariable int id){
        PaymentDTO p = service.refundPayment(id);
        if(p==null){
            throw new ResourceNotFoundException("Payment not found");
        }
        return ResponseEntity.status(HttpStatus.OK).body(
                new ApiResponse<>("Refund success", HttpStatus.OK, p)
        );
    }


      @Value("${razorpay.key.id}")
    private String razorpayKey;

    @Value("${razorpay.key.secret}")
    private String razorpaySecret;

    @PostMapping("/customer/createOrder")
    public ResponseEntity<?> createOrder(@RequestBody Map<String, Object> data)
            throws Exception {

        int amount = Integer.parseInt(data.get("amount").toString());

        RazorpayClient client =
                new RazorpayClient(razorpayKey, razorpaySecret);

        JSONObject orderRequest = new JSONObject();

        orderRequest.put("amount", amount * 100);

        orderRequest.put("currency", "INR");

        orderRequest.put("receipt", "txn_" + System.currentTimeMillis());

        Order order = client.orders.create(orderRequest);

        return ResponseEntity.status(HttpStatus.ACCEPTED)
        .body(new ApiResponse<>("Payment Success!!!", HttpStatus.ACCEPTED, order.toString()));
    }
}
